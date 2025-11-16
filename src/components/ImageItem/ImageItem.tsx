import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/ImageItem';

const ImageItem = ({ imageSrcSet, order, isFeatured }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const [ imageOnClickHandler, containerClassName ] = useImageItem(isSelected, isFeatured, order, setIsSelected);

  return <div className={ containerClassName } onClick={ imageOnClickHandler }>
    <img src={ isFeatured ? imageSrcSet.imageSizes.large : imageSrcSet.imageSizes.small }
      tabIndex={ 0 } loading="lazy" decoding="async" alt={ imageSrcSet.alt } className="imageItem__image" />
  </div>
}

export default ImageItem;