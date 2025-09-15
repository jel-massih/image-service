import { handleImage } from './imagick.ts';

export async function blur(
    url: string,
    blurRadius = 60,
    blurSigma = 5,
): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.blur(blurRadius, blurSigma);
    });
}