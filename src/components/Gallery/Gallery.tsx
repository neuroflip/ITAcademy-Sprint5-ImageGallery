import * as React from 'react';
import type { GalleryProps } from './Gallery.d';

import ImageItem from '../ImageItem/ImageItem';
import CustomContextualMenu from '../CustomContextualMenu/CustomContextualMenu';
import DragAndDropContext from '../DragAndDropImagesManager/DragAndDropContext';

const Gallery = ({ images }: GalleryProps) => {
    const { selectedImagesIds, onSelectAllImages, onDeselectAllImages, 
        onDeleteSelectedImages } = React.useContext(DragAndDropContext);
    return <>
        <CustomContextualMenu triggerElement={ 
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                { images && images.length > 0 ? [...images].map((imageData, index) => (
                    <ImageItem key={ imageData.imageSizes.small }
                        imageData={ imageData }
                        isFeatured={ index === 0 }
                        isSelected={ selectedImagesIds.has(imageData.id) } />
                )) :
                    <div className="col-span-full text-center text-muted-foreground mt-10">
                        <p>No images available in the gallery. </p>
                        * <a href="/">click to reload</a> *
                    </div>
                }
            </div>
        } 
        onSelectAll={ onSelectAllImages }
        onDeselectAll={ onDeselectAllImages } 
        onDeleteSelected={ onDeleteSelectedImages } />
    </>
}

export default Gallery;
