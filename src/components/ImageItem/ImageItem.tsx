import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.scss';

const ImageItem = ({ imagePath, isFeaturedImage }: ImageItemProps) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [ isFeatured ] = React.useState(isFeaturedImage);

  const imageOnClickHandler = () => {
    setIsSelected(!isSelected);
  };

  const className = `imageItem__container ${isSelected ? 'selected' : ''} ${isFeatured ? 'featured' : ''}`;

  return <div className={className} 
      onClick={imageOnClickHandler}>
    <img src={ imagePath } />
  </div>
}

export default ImageItem;