import * as React from 'react';
import type { ImagesData } from "@/data/images.d";

const useGallery = (images: ImagesData[]): 
    [ Array<ImagesData>, (id: number) => void, (imageElement: HTMLElement) => void, 
      () => void, (imageElement: HTMLElement) => void ] => {
        const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(images);
        const [ currentDropElement, setCurrentDropElement ] = React.useState<HTMLElement | null>()

        const onDrop = (imagesData: ImagesData[], setImagesData: React.Dispatch<React.SetStateAction<ImagesData[]>>, 
            currentDropElement: HTMLElement, destinationElement: HTMLElement) => {
                const destinationPositionId = Number(destinationElement.getAttribute('id')?.replace('container', ''));
                const originalPositionId = Number(currentDropElement?.id.replace('container', ''));

                const newImagesData = [...imagesData];
                const currentDropImageData = newImagesData.find((element) => element.id === originalPositionId);
                const destinationImageData = newImagesData.find((element) => element.id === destinationPositionId);

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

        const onDelete = (id: number) => {
            const newImagesData = [...imagesData];
            const image = newImagesData.find((image) => image.id === id);
            if (image) {
                const index = newImagesData.indexOf(image);
                
                if (index !== -1) {
                    newImagesData.splice(index, 1);
                }
                setImagesData(newImagesData);
            }
        }
        
        return [ imagesData, onDelete, onStartDrag, onEndDrag, dropEventHandler ];
}

export default useGallery;