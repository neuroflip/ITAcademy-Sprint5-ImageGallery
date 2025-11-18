import type { MouseEventHandler } from 'react'

const useImageItem = (id: string, isSelected: boolean, isFeatured: boolean, order: number,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>, onDelete: (id: string) => void): 
    [ () => void, MouseEventHandler<HTMLDivElement>, string] => {
    
    const imageOnClickHandler = () => {
        setIsSelected(!isSelected);
    };

    const deleteEventHandler = () => {
        onDelete(id);
    }

    const containerClassName = `imageItem__container`+ 
        `${ isSelected ? ' imageItem__container--selected' : '' } `+
        `${ isFeatured ? ' imageItem__container--featured' : ''}` +
        ` order-${order+1}`

    return [ deleteEventHandler, imageOnClickHandler, containerClassName ]
}

export default useImageItem;