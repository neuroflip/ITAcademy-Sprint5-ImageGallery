import * as React from 'react';

import { DRAGGING_CLASS, DRAGOVER_CLASS } from '../DragAndDropImagesManager.d';

const addClass = (element: HTMLElement, className: string) => {
    element.classList.add(className);
}

const removeClass = (element: HTMLElement, className: string) => {
    element.classList.remove(className);
}

const useDragAndDropUI = (): [(event: React.DragEvent<HTMLDivElement>) => void, 
    (event: React.DragEvent<HTMLDivElement>) => void, (event: React.DragEvent<HTMLDivElement>) => void,
    (event: React.DragEvent<HTMLDivElement>) => void, (event: React.DragEvent<HTMLDivElement>) => void] => {
    const onDragStart = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        addClass(element, DRAGGING_CLASS);
    },[]);

    const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        addClass(element, DRAGOVER_CLASS);
    }, []);

    const onDragEnd = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        
        removeClass(element, DRAGGING_CLASS);
        removeClass(element, DRAGOVER_CLASS);
    }, []);

    const onDragLeave = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        removeClass(element, DRAGOVER_CLASS);
    }, []);

    const onDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;

        removeClass(element, DRAGOVER_CLASS);
    }, []);

    return [onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop];
}

export default useDragAndDropUI;