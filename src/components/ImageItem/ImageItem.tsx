import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.scss';

const ImageItem = ({ imagePath }: ImageItemProps) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const imageOnClickHandler = () => {
    setIsSelected(!isSelected);
  };

  return <div className={`imageItem__container ${isSelected ? 'selected' : ''}`} 
      onClick={imageOnClickHandler}>
    <img src={ imagePath } />
  </div>
}

export default ImageItem;