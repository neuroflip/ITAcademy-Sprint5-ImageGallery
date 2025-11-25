import * as React from 'react';

import ImagesDataProvider from '@/ImagesDataProvider/ImagesDataProvider';
import PicSumImagesDataProvider from '@/ImagesDataProvider/providers/PicSumImagesDataProvider';

import type { ImagesData } from '@/ImagesDataProvider/ImagesDataProvider.d';

const deleteImageFromArray = (array: Array<ImagesData>, id: number) => {
    const image = array.find((image) => image.id === id);
    if (image) {
        const index = array.indexOf(image);
        
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}

const useImagesData = (): [Array<ImagesData>, Set<number>, 
        (originalPositionId: number, destinationPositionId: number) => void,
        (id: number) => void, () => void, (id: number) => void, () => void,
        () => void] => {

    const imagesManager = new ImagesDataProvider(new PicSumImagesDataProvider());
    const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(imagesManager.getImageDataArray());
    const [ selectedImagesIds, setSelectedImagesIds ] = React.useState<Set<number>>(new Set());

    const onReorderImage = (originalPositionId: number, destinationPositionId: number) => {
            const newImagesData = [...imagesData];
            const findImageById = (id1: number, id2: number) => id1 === id2;
            const currentDropImageData = newImagesData.find((element) => findImageById(element.id, originalPositionId));
            const destinationImageData = newImagesData.find((element) => findImageById(element.id, destinationPositionId));

            if (currentDropImageData && destinationImageData) {
                const originPosition = newImagesData.indexOf(currentDropImageData);
                const destPosition = newImagesData.indexOf(destinationImageData);
                const element = newImagesData.splice(originPosition, 1);

                newImagesData.splice(destPosition, 0, element[0]);
                setImagesData(newImagesData);
            }
    }

    const onDeleteImage = (id: number) => {
        const newImagesData = [...imagesData];

        deleteImageFromArray(newImagesData, id);
        setImagesData(newImagesData);
    }

    const onDeleteSelectedImages = () => {
        const newImamgesData = [...imagesData]

        selectedImagesIds.forEach((imageId) => {
            deleteImageFromArray(newImamgesData, imageId);
        });

        setImagesData(newImamgesData);
        setSelectedImagesIds(new Set<number>());
    };

    const onSelectImage = (id: number) => {
        const newSelectedImagesIds = new Set(selectedImagesIds);

        if (newSelectedImagesIds.has(id)) {
            newSelectedImagesIds.delete(id);
        } else {
            newSelectedImagesIds.add(id);
        }
        
        setSelectedImagesIds(newSelectedImagesIds);
    };

    const onSelectAllImages = () => {
        const newSelectedImagesIds = new Set<number>();

        imagesData.forEach((image) => {
            newSelectedImagesIds.add(image.id);
        });
        setSelectedImagesIds(newSelectedImagesIds);
    };

    const onDeselectAllImages = () => {
        const newSelectedImagesIds = new Set<number>();
        
        setSelectedImagesIds(newSelectedImagesIds);
    };
    
    return [imagesData, selectedImagesIds, onReorderImage, onDeleteImage, onDeleteSelectedImages, onSelectImage, onSelectAllImages, onDeselectAllImages];
}

export default useImagesData;