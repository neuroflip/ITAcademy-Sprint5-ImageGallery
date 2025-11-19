import type { GalleryProps } from './Gallery.d';

import ImageItem from '../ImageItem/ImageItem';
import useGallery from './hooks/useGallery';

const Gallery = ({ images }: GalleryProps) => {
    const [ imagesData, onDelete, onStartDrag, onEndDrag, dropEventHandler ] = useGallery(images);

    return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        { imagesData.map((imageData, index) => (
            <ImageItem key={ imageData.imageSizes.small }
                imageData={ imageData }
                isFeatured={ index === 0 }
                onStartDrag={ onStartDrag }
                onEndDrag={ onEndDrag }
                onDrop={ dropEventHandler }
                onDelete={ onDelete }
            />
        )) }
    </div>
}

export default Gallery;
