import sharp from '@img/sharp-wasm32';

function fetchImage(url: string) {
    return fetch(url).then(res => res.arrayBuffer());
}

export async function blur(image: string, sigma = 10) {
    const imageBuffer = await fetchImage(image);
    return await sharp(imageBuffer).blur(sigma).webp().toBuffer();
}