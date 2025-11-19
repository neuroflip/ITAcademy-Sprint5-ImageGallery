import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/useImageItem';
import { Button } from "@/components/ui/button"
import CustomAlertDialog from '../AlertDialog/CustomAlertDialog';

const ImageItem = ({ imageData, isFeatured, onDelete, onDrop, onStartDrag, onEndDrag }: ImageItemProps) => {
  const trigglerButton = () => <Button className='imageItem__Button--delete' size="icon-sm" variant="outline">🗑</Button>
  const confirmButton = () => <Button variant="outline" onClick={ deleteEventHandler }>Continue</Button>
  const [ deleteEventHandler, imageOnClickHandler, containerClassName,
        dragStartEventHandler, dragEndEventHandler, dropEventHandler,
        dragOverEventHandler, dragLeaveEventHandler
      ] = useImageItem(imageData.id, isFeatured, onDelete, onDrop, onStartDrag, onEndDrag);

  return <div id={ `container${ imageData.id }` }
    className={ containerClassName } 
    draggable={ false }
    onClick={ imageOnClickHandler } 
    onDrop={ dropEventHandler }
    onDragOver={ dragOverEventHandler }
    onDragLeave={ dragLeaveEventHandler }
    onDragStart={ dragStartEventHandler }
    onDragEnd={ dragEndEventHandler }>
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