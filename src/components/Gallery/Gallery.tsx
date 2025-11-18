import * as React from 'react';

import type { GalleryProps } from './Gallery.d';
import type { ImagesData } from '@/data/images.d';

import ImageItem from '../ImageItem/ImageItem';
import useGallery from './hooks/useGallery';

const Gallery = ({ images }: GalleryProps) => {
    const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(images);
    const onDelete = useGallery(imagesData, setImagesData);

    return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            { imagesData.map((imageData, index) => (
                <ImageItem key={ imageData.imageSizes.small } imageData={ imageData } 
                    order={ index } isFeatured={ index === 0 } onDelete={ onDelete }/>
            )) }
        </div>
}

export default Gallery;
