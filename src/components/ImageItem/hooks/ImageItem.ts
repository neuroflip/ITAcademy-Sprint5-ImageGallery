import type { MouseEventHandler } from 'react'
import type { ImagesSrcSets } from "@/data/images.d";
import { ImageSize } from "../ImageItem.d";

const useImageItem = (isSelected: boolean, isFeatured: boolean, order: number,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>, 
        imageSrcSet: ImagesSrcSets): [ MouseEventHandler<HTMLDivElement>, ((isFeatured: boolean, size: ImageSize) => string), string] => {
    
    const imageOnClickHandler = () => {
        setIsSelected(!isSelected);
    };

    const getSrcSet = (isFeatured: boolean, size: ImageSize): string => {
        let result: string = "";

        if (size === ImageSize.Small) {
            result = isFeatured ? imageSrcSet.mid : imageSrcSet.small;
        } else if (size === ImageSize.Mid) {
            result = isFeatured ? imageSrcSet.mid : imageSrcSet.mid;
        } else if (size === ImageSize.Large) {
            result = isFeatured ? imageSrcSet.large : imageSrcSet.mid;
        }

        return result;
    }

    const containerClassName = `imageItem__container`+ 
        `${ isSelected ? ' imageItem__container--selected' : '' } `+
        `${ isFeatured ? ' imageItem__container--featured' : ''}` +
        ` order-${order+1}`

    return [ imageOnClickHandler, getSrcSet, containerClassName ]
}

export default useImageItem;