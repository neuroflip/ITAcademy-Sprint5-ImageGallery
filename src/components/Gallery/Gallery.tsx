import './styles/Gallery.scss';

import * as React from 'react';
import type { GalleryProps } from './Gallery.d';
import ImageItem from '../ImageItem/ImageItem';

const Gallery = ({ images }: GalleryProps) => {
  const [ imagesData ] = React.useState<Array<string>>(images);

  return <div className="gallery">
        { imagesData.map((path, index) => (
            <ImageItem key={path} imagePath={path} isFeaturedImage={index === 0} />
        )) }
    </div>
}

export default Gallery;