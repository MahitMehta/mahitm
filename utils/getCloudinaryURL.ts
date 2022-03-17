import { buildUrl } from 'cloudinary-build-url';

/**
 * 
 * @param path to image on cloudinary mahitm/
 * @returns Default Cloudinary URL
 */
export const getCloudinaryURL = (path:string) => {
    return buildUrl(`mahitm/${path}`,{ cloud: {cloudName: "mahitm-cdn"}})
}