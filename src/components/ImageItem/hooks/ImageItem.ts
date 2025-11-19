import type { MouseEventHandler } from 'react'

const useImageItem = (id: number, isSelected: boolean, isFeatured: boolean,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>, onDelete: (id: number) => void): 
    [ () => void, MouseEventHandler<HTMLDivElement>, string] => {
    
    const imageOnClickHandler = () => {
        setIsSelected(!isSelected);
    };

    const deleteEventHandler = () => {
        onDelete(id);
    }

    const containerClassName = `imageItem__container`+ 
        `${ isSelected ? ' imageItem__container--selected' : '' } `+
        `${ isFeatured ? ' imageItem__container--featured' : ''}`

    return [ deleteEventHandler, imageOnClickHandler, containerClassName ]
}

export default useImageItem;