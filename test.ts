import { blur } from './main.ts';

async function test() {
    const imageUrl = 'https://httpbin.org/image/jpeg';
    console.log('Testing blur with URL:', imageUrl);

    try {
        const result = await blur(imageUrl);
        console.log('✅ Blur successful, output size:', result.byteLength, 'bytes');
        // Save to file using Deno
        await Deno.writeFile('blurred-output.webp', result);
        console.log('✅ Saved blurred image to blurred-output.webp');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

test();