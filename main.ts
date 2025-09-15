import { MagickFormat } from '@imagemagick/magick-wasm';
import { ImageMagick } from './imagick.ts';

async function fetchBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

// 3) Example: blur from URL and return PNG bytes.
export async function blur(
    url: string,
    blurRadius = 60,
    blurSigma = 5,
): Promise<Uint8Array> {
    const input = await fetchBytes(url);
    const output = ImageMagick.read(input, (img): Uint8Array => {
        // Blur. You can also use img.gaussianBlur(radius, sigma)
        img.blur(blurRadius, blurSigma);

        // If you want JPEG quality, set it as a PROPERTY (not a function):
        // img.quality = 80;

        // Encode to PNG and return the bytes.
        return img.write(MagickFormat.WebP, (data) => data);
    });

    return output;
}