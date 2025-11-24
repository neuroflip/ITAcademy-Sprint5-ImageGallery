import * as React from 'react';

import type { DragAndDropImagesManagerProps } from './DragAndDropImagesManager.d';
import type { GalleryProps } from '../Gallery/Gallery.d';
import DragAndDropContext from './DragAndDropContext';
import useDragAndDropUI from './hooks/useDragAndDropUI';
import useImagesData from './hooks/useImagesData';

const DragAndDropImagesManager = ({ children }: DragAndDropImagesManagerProps) => {
    const [onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop] = useDragAndDropUI();
    const [imagesData, selectedImagesIds, onReorderImage, onDeleteImage, onDeleteSelectedImages, onSelectImage, onSelectAllImages, onDeselectAllImages] = useImagesData();
    const contextValue = {
        selectedImagesIds,
        onDragStart, 
        onDragEnd,
        onDragLeave,
        onDragOver,
        onDrop,
        onReorderImage,
        onSelectImage,
        onDeleteImage,
        onSelectAllImages,
        onDeselectAllImages,
        onDeleteSelectedImages
    }
    return <>
        <DragAndDropContext.Provider value={ contextValue }>
            { React.cloneElement(children, { images: imagesData } as GalleryProps) }
        </DragAndDropContext.Provider>
    </>
    
}

export default DragAndDropImagesManager;

