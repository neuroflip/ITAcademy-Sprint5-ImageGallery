import type { ImagesData } from "@/data/images.d";

const useGallery = (imagesData: Array<ImagesData>, setImagesData: React.Dispatch<React.SetStateAction<ImagesData[]>>) => {
    const onDelete = (id: string) => {
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
    
    return onDelete;
}

export default useGallery;