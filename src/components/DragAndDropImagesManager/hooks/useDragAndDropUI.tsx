import * as React from 'react';
const DRAGGING_CLASS = 'imageItem__container--dragging';
const DRAGOVER_CLASS = 'imageItem__container--dragOver';


const useDragAndDropUI = (): [(event: React.DragEvent<HTMLDivElement>) => void, 
    (event: React.DragEvent<HTMLDivElement>) => void, (event: React.DragEvent<HTMLDivElement>) => void,
    (event: React.DragEvent<HTMLDivElement>) => void, (destinationElement: HTMLElement) => void] => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        event.dataTransfer.setData("text", element.dataset.image || '');
        element.classList.add(DRAGGING_CLASS);
    }

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        
        element.classList.add(DRAGOVER_CLASS);
    }

    const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        
        element.classList.remove(DRAGGING_CLASS);
        element.classList.remove(DRAGOVER_CLASS);
    }

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        

        element.classList.remove(DRAGOVER_CLASS);
    }

    const onDrop = (destinationElement: HTMLElement) => {
        destinationElement.children[0].classList.remove(DRAGOVER_CLASS);
    }

    return [onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop];
}

export default useDragAndDropUI;