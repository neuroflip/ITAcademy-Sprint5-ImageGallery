import * as React from 'react';

import { DRAGGING_CLASS, DRAGOVER_CLASS } from '../DragAndDropImagesManager.d';

const useDragAndDropUI = (): [(event: React.DragEvent<HTMLDivElement>) => void, 
    (event: React.DragEvent<HTMLDivElement>) => void, (event: React.DragEvent<HTMLDivElement>) => void,
    (event: React.DragEvent<HTMLDivElement>) => void, (destinationElement: HTMLElement) => void] => {
    const onDragStart = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        event.dataTransfer.setData("text", element.dataset.image || '');
        element.classList.add(DRAGGING_CLASS);
    },[]);

    const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        
        element.classList.add(DRAGOVER_CLASS);
    }, []);

    const onDragEnd = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        
        element.classList.remove(DRAGGING_CLASS);
        element.classList.remove(DRAGOVER_CLASS);
    }, []);

    const onDragLeave = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        element.classList.remove(DRAGOVER_CLASS);
    }, []);

    const onDrop = React.useCallback((destinationElement: HTMLElement) => {
        destinationElement.children[0].classList.remove(DRAGOVER_CLASS);
    }, []);

    return [onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop];
}

export default useDragAndDropUI;