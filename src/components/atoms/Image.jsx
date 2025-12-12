import { useEffect, useState } from 'react';
import { resolveImageUrl, PLACEHOLDER } from '../../utils/imageUtils';

function Image({ src, alt, className, ...props }) {
    const [imageSrc, setImageSrc] = useState(() => resolveImageUrl(src));
    useEffect(() => {
        const resolved = resolveImageUrl(src);

        if (resolved && resolved !== imageSrc) {
            setImageSrc(resolved);
        }
    }, [src]);
    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={() => {
                console.warn('Fallo al cargar la imagen', imageSrc);
                setImageSrc(PLACEHOLDER);
            }}
            {...props}
        />
    );
}


export default Image;