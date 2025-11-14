import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';

const ImageItem = ({ imagePath, order }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const [ isFeatured ] = React.useState(order === 0);

  const imageOnClickHandler = () => {
    setIsSelected(!isSelected);
  };

  const className = `imageItem__container ${ isSelected ? 'selected' : '' } ${ isFeatured ? 'featured' : '' }`;
  const imageStyle = {
    backgroundImage: `url(${imagePath})`
  };

  const containerStyle = {
    order: order
  };

  return <div className={ className } style={ containerStyle }
      onClick={ imageOnClickHandler }>
    <div className='imageItem__container--image' style={ imageStyle }></div>
  </div>
}

export default ImageItem;