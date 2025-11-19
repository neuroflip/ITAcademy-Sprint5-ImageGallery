import type { ImagesData } from "@/data/images.d";

const useGallery = (imagesData: Array<ImagesData>, 
    setImagesData: React.Dispatch<React.SetStateAction<ImagesData[]>>): [ (id: number) => void, 
    (originalPositionId: number, destinationPositionId: number) => void] => {
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

        const onDrop = (originalPositionId: number, destinationPositionId: number) => {
            const newImagesData = [...imagesData];
            const currentDropElement = newImagesData.find((element) => element.id === originalPositionId);
            const destinationElement = newImagesData.find((element) => element.id === destinationPositionId);

            if (currentDropElement && destinationElement) {
                const originPosition = newImagesData.indexOf(currentDropElement);
                const destPosition = newImagesData.indexOf(destinationElement);

                const element = newImagesData.splice(originPosition, 1);
                newImagesData.splice(destPosition, 0, element[0]);

                setImagesData(newImagesData);
            }
        }
        
        return [ onDelete, onDrop ];
}

export default useGallery;