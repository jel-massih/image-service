import * as sup_lib_target from "./main.ts";

async function runFunction(functionName: string, args: any[]) {
    if(!functionName) {
        return {
            error: 'Function name is required'
        };
    }
    if (!(functionName in sup_lib_target)) {
        return {
            error: 'Function "' + functionName + '" not found in service'
        };
    }

    try {
        const func = sup_lib_target[functionName as keyof typeof sup_lib_target];
        if (typeof func !== 'function') {
            return {
                error: '"' + functionName + '" is not a function'
            };
        }

        const result = await (func as (...args: any[]) => Promise<any>)(...args);
        
        // Check if result is binary data
        if (result instanceof Uint8Array || result instanceof ArrayBuffer) {
            return {
                result: result,
                isBinary: true
            };
        }
        
        return {
            result: result
        };
    } catch (error) {
        return {
            error: 'Error running function: ' + error
        };
    }
}

async function handler(req: Request): Promise<Response> {
    if (req.method === 'POST') {
        const contentType = req.headers.get('content-type') || '';
        let functionName: string;
        let args: any[];

        if (contentType.includes('application/json')) {
            // Handle JSON request
            const body = await req.json();
            functionName = body.function;
            args = body.args || [];
        } else {
            // Handle binary request - function name in header, binary data as argument
            functionName = req.headers.get('x-function-name') || '';
            if (!functionName) {
                return new Response(JSON.stringify({ error: 'Missing x-function-name header for binary request' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            const binaryData = new Uint8Array(await req.arrayBuffer());
            args = [binaryData];
        }
        
        const result = await runFunction(functionName, args);
        
        // Handle binary data response
        if (result.isBinary && !result.error) {
            return new Response(result.result, {
                headers: { 
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename="output"'
                }
            });
        }
        
        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ functions: Object.keys(sup_lib_target), version: sup_lib_target.VERSION || 'unknown' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}

Deno.serve({port: 8001}, handler);