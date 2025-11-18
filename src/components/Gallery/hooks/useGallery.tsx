import type { ImagesData } from "@/data/images.d";

const useGallery = (imagesData: Array<ImagesData>, setImagesData: React.Dispatch<React.SetStateAction<ImagesData[]>>): 
    [ (id: string) => void, (originalPositionId: number, destinationPositionId: number) => void] => {
    const onDelete = (id: string) => {
        const newImagesData = [...imagesData];
        const image = newImagesData.find((image) => image.order === id);
        if (image) {
            const index = newImagesData.indexOf(image);
            
            if (index !== -1) {
                newImagesData.splice(index, 1);
            }
            setImagesData(newImagesData);
        }
    }

    const onDrop = (originalPositionId: number, destinationPositionId: number) => {
        console.log(originalPositionId + ' ' + destinationPositionId);
    }
    
    return [ onDelete, onDrop ];
}

export default useGallery;