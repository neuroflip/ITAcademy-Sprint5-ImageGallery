import * as React from 'react';
import type { GalleryProps } from './Gallery.d';

import ImageItem from '../ImageItem/ImageItem';
import CustomContextMenu from '../ContextualMenu/ContextualMenu';
import DragAndDropContext from '../DragAndDropImagesProvider/DragAndDropContext';

const Gallery = ({ images }: GalleryProps) => {
    const { selectedImagesIds, onStartDrag, onEndDrag, onDrop, onSelection, onDelete,
            onSelectAll, onDeselectAll, onDeleteSelected } = React.useContext(DragAndDropContext);
    return <>   
        <CustomContextMenu triggerElement={ 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                { images && images.length > 0 ? [...images].map((imageData, index) => (
                    <ImageItem key={ imageData.imageSizes.small }
                        imageData={ imageData }
                        isFeatured={ index === 0 }
                        isSelected={ selectedImagesIds.has(imageData.id) }
                        onStartDrag={ onStartDrag }
                        onEndDrag={ onEndDrag }
                        onDrop={ onDrop }
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
