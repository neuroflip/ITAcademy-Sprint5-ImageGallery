import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/ImageItem';
import { Button } from "@/components/ui/button"
import CustomAlertDialog from '../AlertDialog/CustomAlertDialog';

const ImageItem = ({ imageData, isFeatured, onDelete, onDrop, onStartDrag, onEndDrag, onDragOver, onDragLeave }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const imageContainerRef = React.useRef<HTMLImageElement>(null);
  
  const [ deleteEventHandler, imageOnClickHandler, containerClassName ] = useImageItem(imageData.id, isSelected, isFeatured, setIsSelected, onDelete);
  
  const trigglerButton = () => <Button className='imageItem__Button--delete' size="icon-sm" variant="outline">🗑</Button>
  const confirmButton = () => <Button variant="outline" onClick={ deleteEventHandler }>Continue</Button>

  const dragStartEventHandler = () => {
    if (imageContainerRef.current) {
      onStartDrag(imageContainerRef.current);
    }
  }

  const dragEndEventHandler = () => {
    if (imageContainerRef.current) {
      onEndDrag(imageContainerRef.current);
    }
  }

  const dropEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const destinationElement = event.target as HTMLElement;

    event.stopPropagation();
    event.preventDefault();
    onDrop(destinationElement);
  }

  const dragOverEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (imageContainerRef.current) {
      onDragOver(imageContainerRef.current);
    }
  }

  const dragLeaveEventHandler = () => {
    if (imageContainerRef.current) {
      onDragLeave(imageContainerRef.current);
    }
  }

  return <div id={ `container${ imageData.id }` } className={ containerClassName } onClick={ imageOnClickHandler } onDrop={ dropEventHandler }
    onDragOver={ dragOverEventHandler } onDragLeave={ dragLeaveEventHandler } draggable={ false }
    onDragStart={ dragStartEventHandler } onDragEnd={ dragEndEventHandler } ref={ imageContainerRef }>
    <img id={ imageData.id.toString() } src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
      onDrop={ dropEventHandler }
      tabIndex={ 0 } loading="lazy" decoding="async" alt={ imageData.alt } className="imageItem__image" />
    <CustomAlertDialog
      title = "Are you absolutely sure?"
      description = "This action cannot be undone. This will permanently delete the image from the Image Gallery."
      alertTriggerElement={ trigglerButton } 
      confirmElement={ confirmButton }/>
  </div>
}

export default ImageItem;