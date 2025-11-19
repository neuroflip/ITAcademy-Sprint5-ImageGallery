import * as React from 'react';

import type { GalleryProps } from './Gallery.d';
import type { ImagesData } from '@/data/images.d';

import ImageItem from '../ImageItem/ImageItem';
import useGallery from './hooks/useGallery';

const Gallery = ({ images }: GalleryProps) => {
    const [ imagesData, setImagesData ] = React.useState<Array<ImagesData>>(images);
    const [ currentDropElement, setCurrentDropElement ] = React.useState<HTMLElement | null>()
    
    const [ onDelete, onDrop ] = useGallery(imagesData, setImagesData);

    const dragStartEventHandler = (imageElement: HTMLElement) => {
        imageElement?.classList.add("imageItem__container--dragging");
        setCurrentDropElement(imageElement);
    }

    const dragEndEventHandler = (imageElement: HTMLElement) => {
        imageElement?.classList.remove("imageItem__container--dragging");
        setCurrentDropElement(null);
    }

    const dropEventHandler = (destinationElement: HTMLElement) => {
        const targetId = Number(destinationElement.getAttribute('id')?.replace('container', ''));
        const originId = Number(currentDropElement?.id.replace('container', ''));

        destinationElement?.classList.remove("imageItem__container--dragOver");
        destinationElement?.parentElement?.classList.remove("imageItem__container--dragOver");
        
        onDrop(originId, targetId);
    }

    const dragOverEventHandler = (imageElement: HTMLElement) => {
        imageElement?.classList.add("imageItem__container--dragOver");
    }

    const dragLeaveEventHandler = (imageElement: HTMLElement) => {
        imageElement?.classList.remove("imageItem__container--dragOver");
    }

    return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        { imagesData.map((imageData, index) => (
            <ImageItem key={ imageData.imageSizes.small } imageData={ imageData } 
                isFeatured={ index === 0 } onDrop={ dropEventHandler }
                onDelete={ onDelete } onStartDrag={ dragStartEventHandler }
                onEndDrag={ dragEndEventHandler } onDragOver={ dragOverEventHandler }
                onDragLeave={ dragLeaveEventHandler }
            />
        )) }
    </div>
}

export default Gallery;
