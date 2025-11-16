import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';
import { ImageSize } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/ImageItem';

const SMALL_IMAGE_MEDIA = "(width < 40rem)";
const MID_IMAGE_MEDIA = "(width >= 40rem) and (width <= 64rem)";
const LARGE_IMAGE_MEDIA = "(width > 64rem)";

const ImageItem = ({ imageSrcSet, order, isFeatured }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const [ imageOnClickHandler, getSrcSet, containerClassName ] = useImageItem(isSelected, isFeatured, order, setIsSelected, imageSrcSet);

  return <div className={ containerClassName } onClick={ imageOnClickHandler }>
    <picture>
      <source media={ SMALL_IMAGE_MEDIA } srcSet={ getSrcSet(isFeatured, ImageSize.Small) } />
      <source media={ MID_IMAGE_MEDIA } srcSet={ getSrcSet(isFeatured, ImageSize.Mid) } />
      <source media={ LARGE_IMAGE_MEDIA } srcSet={ getSrcSet(isFeatured, ImageSize.Large) } />
      <img src={ imageSrcSet.large } loading="lazy" decoding="async" 
        className="imageItem__image" />
    </picture>        
  </div>
}

export default ImageItem;