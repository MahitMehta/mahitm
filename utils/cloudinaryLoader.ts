import { ImageLoader, ImageLoaderProps } from "next/image";

export const cloudinaryLoader : ImageLoader = ({ src, width, quality } : ImageLoaderProps) : string => {
    return `https://res.cloudinary.com/staywiserent-cloud/image/fetch/w_${width},q_${
        quality || 75
    },fl_sanitize/${src}`;
};