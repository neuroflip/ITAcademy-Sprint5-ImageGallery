import * as React from 'react';

import type { GalleryProps } from './Gallery.d';
import type { ImagesData } from '@/data/images.d';

import ImageItem from '../ImageItem/ImageItem';

const Gallery = ({ images }: GalleryProps) => {
  const [ imagesData ] = React.useState<Array<ImagesData>>(images);

  return <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        { imagesData.map((srcSet, index) => (
            <ImageItem key={ srcSet.imageSizes.small } imageSrcSet={ srcSet } 
                order={ index } isFeatured={ index === 0 }/>
        )) }
    </div>
}

export default Gallery;
