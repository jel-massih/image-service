// deno.json: { "compilerOptions": { "lib": ["deno.window", "dom"] } }
// index.ts
import {
    ImageMagick as _ImageMagick,
    initializeImageMagick,
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

export const ImageMagick = _ImageMagick;