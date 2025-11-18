import * as React from 'react';
import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/ImageItem';
import { Button } from "@/components/ui/button"
import CustomAlertDialog from '../AlertDialog/CustomAlertDialog';

const ImageItem = ({ imageData, order, isFeatured, onDelete, onDrop, onStartDrag, onEndDrag, onDragOver, onDragLeave }: ImageItemProps) => {
  const [ isSelected, setIsSelected ] = React.useState(false);
  const imageContainerRef = React.useRef<HTMLImageElement>(null);
  const [ deleteEventHandler, imageOnClickHandler, containerClassName ] = useImageItem(imageData.order, isSelected, isFeatured, order, setIsSelected, onDelete);
  const trigglerButton = () => <Button className='imageItem__Button--delete' size="icon-sm" variant="outline">🗑</Button>
  const confirmButton = () => <Button variant="outline" onClick={ deleteEventHandler }>Continue</Button>

  const dragStartEventHandler = () => {
    imageContainerRef.current && onStartDrag(imageContainerRef.current);
  }

  const dragEndEventHandler = () => {
    imageContainerRef.current && onEndDrag(imageContainerRef.current);
  }

  const dropEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const destinationElement = event.target as HTMLElement;

    event.stopPropagation();
    event.preventDefault();

    imageContainerRef.current && onDrop(imageContainerRef.current, destinationElement);
  }

  const dragOverEventHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    imageContainerRef.current && onDragOver(imageContainerRef.current);
  }

  const dragLeaveEventHandler = () => {
    imageContainerRef.current && onDragLeave(imageContainerRef.current);
  }

  return <div id={ `container${ order }` } className={ containerClassName } onClick={ imageOnClickHandler } onDrop={ dropEventHandler }
    onDragOver={ dragOverEventHandler } onDragLeave={ dragLeaveEventHandler }
    onDragStart={ dragStartEventHandler } onDragEnd={ dragEndEventHandler } ref={ imageContainerRef }>
    <img id={ `image${ order }` } src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
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