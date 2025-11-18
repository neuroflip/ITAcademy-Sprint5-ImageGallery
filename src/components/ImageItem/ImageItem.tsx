import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/ImageItem';
import { Button } from "@/components/ui/button"
import CustomAlertDialog from '../AlertDialog/CustomAlertDialog';

const ImageItem = ({ imageData, order, isFeatured, onDelete }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const [ deleteEventHandler, imageOnClickHandler, containerClassName ] = useImageItem(imageData.id, isSelected, isFeatured, order, setIsSelected, onDelete);
  const trigglerButton = () => <Button className='imageItem__Button--delete' size="icon-sm" variant="outline">🗑</Button>
  const confirmButton = () => <Button variant="outline" onClick={ deleteEventHandler }>Continue</Button>

  return <div className={ containerClassName } onClick={ imageOnClickHandler }>
    <img src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
      tabIndex={ 0 } loading="lazy" decoding="async" alt={ imageData.alt } className="imageItem__image" />
    <CustomAlertDialog
      title = "Are you absolutely sure?"
      description = "This action cannot be undone. This will permanently delete the image from the Image Gallery."
      alertTriggerElement={ trigglerButton } 
      confirmElement={ confirmButton }/>
  </div>
}

export default ImageItem;