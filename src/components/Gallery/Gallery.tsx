import * as React from 'react';

import type { GalleryProps } from './Gallery.d';
import type { ImagesData } from '@/data/images.d';

import ImageItem from '../ImageItem/ImageItem';

const Gallery = ({ images }: GalleryProps) => {
    const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(images);
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

    return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            { imagesData.map((imageData, index) => (
                <ImageItem key={ imageData.imageSizes.small } imageData={ imageData } 
                    order={ index } isFeatured={ index === 0 } onDelete={ onDelete }/>
            )) }
        </div>
}

export default Gallery;
