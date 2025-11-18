import type { MouseEventHandler } from 'react'

const useImageItem = (isSelected: boolean, isFeatured: boolean, order: number,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>): [ MouseEventHandler<HTMLDivElement>, string] => {
    
    const imageOnClickHandler = () => {
        setIsSelected(!isSelected);
    };

    const containerClassName = `imageItem__container`+ 
        `${ isSelected ? ' imageItem__container--selected' : '' } `+
        `${ isFeatured ? ' imageItem__container--featured' : ''}` +
        ` order-${order+1}`

    return [ imageOnClickHandler, containerClassName ]
}

export default useImageItem;