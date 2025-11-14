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
  const style = {
    backgroundImage: `url(${imagePath})`
  };

  return <div className={className} 
      onClick={imageOnClickHandler}>
    <div className='imageItem__container--image' style={style}></div>
  </div>
}

export default ImageItem;