import * as React from 'react';
import type { ImagesData } from "@/data/images.d";

const useGallery = (images: Array<ImagesData>): 
    [ Array<ImagesData>, Set<number>, (id: number) => void, 
        (imageElement: HTMLElement) => void, () => void, (imageElement: HTMLElement) => void,
        (id: number) => void, () => void, () => void, () => void ] => {
        const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(images);
        const [ currentDropElement, setCurrentDropElement ] = React.useState<HTMLElement | null>()
        const [ selectedImagesIds, setSelectedImagesIds ] = React.useState<Set<number>>(new Set());

        const onStartDrag = (imageElement: HTMLElement) => {
            setCurrentDropElement(imageElement);
        }

        const onEndDrag = () => {
            setCurrentDropElement(null);
        }

        const dropEventHandler = (destinationElement: HTMLElement) => {        
            if (currentDropElement) {
                onDrop(imagesData, setImagesData, currentDropElement, destinationElement);
            }
        }

        const onDrop = (imagesData: Array<ImagesData>, setImagesData: React.Dispatch<React.SetStateAction<Array<ImagesData>>>, 
            currentDropElement: HTMLElement, destinationElement: HTMLElement) => {
                const newImagesData = [...imagesData];
                const destinationPositionId = Number(destinationElement.dataset.image);
                const originalPositionId = Number(currentDropElement.dataset.image);
                const findImageById = (id1: number, id2: number) => id1 === id2;
                const currentDropImageData = newImagesData.find((element) => findImageById(element.id, originalPositionId));
                const destinationImageData = newImagesData.find((element) => findImageById(element.id, destinationPositionId));

                destinationElement?.classList.remove("imageItem__container--dragOver");
                destinationElement?.parentElement?.classList.remove("imageItem__container--dragOver");

                if (currentDropImageData && destinationImageData) {
                    const originPosition = newImagesData.indexOf(currentDropImageData);
                    const destPosition = newImagesData.indexOf(destinationImageData);
                    const element = newImagesData.splice(originPosition, 1);

                    newImagesData.splice(destPosition, 0, element[0]);
                    setImagesData(newImagesData);
                }
        }

        const onSelection = (id: number) => {
            const newSelectedImagesIds = new Set(selectedImagesIds);

            if (newSelectedImagesIds.has(id)) {
                newSelectedImagesIds.delete(id);
            } else {
                newSelectedImagesIds.add(id);
            }
            
            setSelectedImagesIds(newSelectedImagesIds);
        };

        const deleteImageFromArray = (array: Array<ImagesData>, id: number) => {
            const image = array.find((image) => image.id === id);
            if (image) {
                const index = array.indexOf(image);
                
                if (index !== -1) {
                    array.splice(index, 1);
                }
            }
        }

        const onDelete = (id: number) => {
            const newImagesData = [...imagesData];

            deleteImageFromArray(newImagesData, id);
            setImagesData(newImagesData);
        }

        const onSelectAll = () => {
            const newSelectedImagesIds = new Set<number>();

            imagesData.forEach((image) => {
                newSelectedImagesIds.add(image.id);
            });
            setSelectedImagesIds(newSelectedImagesIds);
        };

        const onDeselectAll = () => {
            const newSelectedImagesIds = new Set<number>();
            
            setSelectedImagesIds(newSelectedImagesIds);
        };

        const onDeleteSelected = () => {
            const newImamgesData = [...imagesData]

            selectedImagesIds.forEach((imageId) => {
                deleteImageFromArray(newImamgesData, imageId);
            });

            setImagesData(newImamgesData);
            setSelectedImagesIds(new Set<number>());
        };

        return [ imagesData, selectedImagesIds, onDelete, onStartDrag, onEndDrag, dropEventHandler, onSelection, onSelectAll, onDeselectAll, onDeleteSelected ];
}

export default useGallery;