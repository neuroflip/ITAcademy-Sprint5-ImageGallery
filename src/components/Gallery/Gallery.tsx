import type { GalleryProps } from './Gallery.d';

import ImageItem from '../ImageItem/ImageItem';
import useGallery from './hooks/useGallery';
import CustomContextMenu from '../ContextualMenu/ContextualMenu';



const Gallery = ({ images }: GalleryProps) => {
    const [ imagesData, selectedImagesIds, onDelete, onStartDrag, onEndDrag, dropEventHandler, onSelection,
        onSelectAll, onDeselectAll, onDeleteSelected ] = useGallery(images);

    return <>   
        <CustomContextMenu triggerElement={ 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                { imagesData.length > 0 ? [...imagesData].map((imageData, index) => (
                    <ImageItem key={ imageData.imageSizes.small }
                        imageData={ imageData }
                        isFeatured={ index === 0 }
                        isSelected={ selectedImagesIds.has(imageData.id) }
                        onStartDrag={ onStartDrag }
                        onEndDrag={ onEndDrag }
                        onDrop={ dropEventHandler }
                        onDelete={ onDelete }
                        onSelection={ onSelection } />
                )) :
                    <div className="col-span-full text-center text-muted-foreground mt-10">
                        No images available in the gallery.
                    </div>
                }
            </div>
        } 
        onSelectAll={ onSelectAll }
        onDeleteSelected={ onDeleteSelected}
        onDeselectAll={ onDeselectAll } />

    </>
}

export default Gallery;
