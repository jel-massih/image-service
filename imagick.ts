// deno.json: { "compilerOptions": { "lib": ["deno.window", "dom"] } }
// index.ts
import {
    ImageMagick,
    IMagickImage,
    initializeImageMagick,
    MagickFormat,
} from "@imagemagick/magick-wasm";

// 1) Load the WASM bytes from the npm package and initialize.
const wasmBytes = await Deno.readFile(
    new URL(
        "magick.wasm",
        import.meta.resolve("@imagemagick/magick-wasm"),
    ),
);
// IMPORTANT: You must await this before calling ImageMagick.
await initializeImageMagick(wasmBytes);


async function fetchBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}


export const handleImage = async (url: string, imageManipulation?: (img: IMagickImage) => void) => {
    const input = await fetchBytes(url);
    return ImageMagick.read(input, (img): Uint8Array => {
        imageManipulation?.(img);
        return img.write(MagickFormat.Png, (data) => data);
    });
}