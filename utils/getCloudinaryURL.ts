import { buildUrl } from 'cloudinary-build-url';

/**
 * 
 * @param path to image on cloudinary mahitm/
 * @param transformations for image
 * @returns Default Cloudinary URL
 */
export const getCloudinaryURL = (path:string, transformations?: object) => {
    return buildUrl(`mahitm/${path}`,{
        cloud: {
            cloudName: "mahitm-cdn"
        },
        transformations: {
            ...(transformations || {})
        }
    })
}