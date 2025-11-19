import * as React from 'react';

const useImageItem = (id: number, isFeatured: boolean, onDelete: (id: number) => void, onDrop: (destinationElement: HTMLElement) => void,
  onStartDrag: (imageElement: HTMLElement) => void,
  onEndDrag: () => void
): 
    [ () => void, React.MouseEventHandler<HTMLDivElement>, string,
        (event: React.DragEvent<HTMLDivElement>) => void,
        (event: React.DragEvent<HTMLDivElement>) => void,
        (event: React.DragEvent<HTMLDivElement>) => void,
        (event: React.DragEvent<HTMLDivElement>) => void,
        (event: React.DragEvent<HTMLDivElement>) => void
    ] => {
    
    const [ isSelected, setIsSelected ] = React.useState(false);
    const imageOnClickHandler = () => {
        setIsSelected(!isSelected);
    };

    const deleteEventHandler = () => {
        onDelete(id);
    }

    const containerClassName = `imageItem__container`+ 
        `${ isSelected ? ' imageItem__container--selected' : '' } `+
        `${ isFeatured ? ' imageItem__container--featured' : ''}`

    const dragStartEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
        const imageElement = event.currentTarget as HTMLElement;

        onStartDrag(imageElement);
        imageElement?.classList.add("imageItem__container--dragging");
    }

    const dragEndEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
        const imageElement = event.currentTarget as HTMLElement;

        onEndDrag();
        imageElement?.classList.remove("imageItem__container--dragging");
    }

    const dropEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
        const destinationElement = event.target as HTMLElement;

        event.stopPropagation();
        event.preventDefault();
        onDrop(destinationElement);
    }

    const dragOverEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
        const imageElement = event.currentTarget as HTMLElement;

        event.stopPropagation();
        event.preventDefault();
        imageElement?.classList.add("imageItem__container--dragOver");
    }

    const dragLeaveEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
        const imageElement = event.currentTarget as HTMLElement;

        imageElement?.classList.remove("imageItem__container--dragOver");
    }
    
    return [ deleteEventHandler, imageOnClickHandler, containerClassName,
        dragStartEventHandler, dragEndEventHandler, dropEventHandler,
        dragOverEventHandler, dragLeaveEventHandler ];
}

export default useImageItem;