import { blur, grayscale } from './main.ts';

async function test() {
    const imageUrl = 'https://httpbin.org/image/jpeg';
    console.log('Testing blur with URL:', imageUrl);

    try {
        const result = await blur(imageUrl);
        console.log('✅ Grayscale successful, output size:', result.byteLength, 'bytes');
        // Save to file using Deno
        await Deno.writeFile('blur-output.png', result);
        console.log('✅ Saved grayscale image to grayscale-output.png');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

test();