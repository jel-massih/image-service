import { MagickFormat, MagickGeometry } from '@imagemagick/magick-wasm';
import { handleImage } from './imagick.ts';

export async function blur(
    url: string,
    blurRadius = 0,
    blurSigma = 5,
): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.blur(blurRadius, blurSigma);
    }, MagickFormat.Png);
}

export async function resize(
    url: string,
    width: number,
    height: number,
): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.resize(width, height);
    });
}

export async function crop(
    url: string,
    x: number,
    y: number,
    width: number,
    height: number,
): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.crop(new MagickGeometry(width, height, x, y));
    });
}

export async function rotate(
    url: string,
    angle: number,
) {
    return handleImage(url, (img) => {
        img.rotate(angle);
    });
}

export async function flip(url: string): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.flip();
    });
}

export async function flop(url: string): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.flop();
    });
}

export async function grayscale(url: string): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.grayscale();
    });
}

export async function invert(url: string): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.negate();
    });
}

export async function sharpen(
    url: string,
    radius = 0,
    sigma = 1,
): Promise<Uint8Array> {
    return handleImage(url, (img) => {
        img.sharpen(radius, sigma);
    });
}