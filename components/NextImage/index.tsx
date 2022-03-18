import React, { useEffect, useMemo, useState } from "react";
import NextDefaultImage, { ImageProps } from "next/image";

interface NextImageProps extends ImageProps  {
    width: number; 
    height?: number; 
    src: string; 
    layout?: "fill",
    maxHeight?: number;
}

const NextImage : React.FC<NextImageProps> = ({ src, width, height, layout, maxHeight, ...props }) => {
    const [ ratio, setRatio ] = useState<number | undefined>(undefined);

    useEffect(() => {
        const img = new Image();
        img.src = `/_next/image?url=${src}&w=128&q=1`;
        img.onload = (e) => {
            const [ img ] = e.composedPath(); 
            const ratio = (img as any).width / (img as any).height; 
            setRatio(ratio);
        }
    }, []);

    const { width:widthProduct, height:heightProduct } = useMemo(() => {
        if (ratio === undefined) return { width, height };
        else if (!!width) return { width, height: width * ratio };
        else if (!!height) return { width: height / ratio, height };
        else return { width, height };
    }, [ ratio, width, height ]);  

    return (
        <div style={{ 
                width: widthProduct || 0, 
                height: (heightProduct || 0)  < (maxHeight || 0) || !maxHeight ? heightProduct : maxHeight 
            }}>
            <NextDefaultImage 
                src={src}
                layout={ layout || "fill" }
                { ...props }
            />
        </div>
    )
}

export default NextImage;