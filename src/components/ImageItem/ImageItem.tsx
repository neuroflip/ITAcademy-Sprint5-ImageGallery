import type { ImageItemProps } from './ImageItem.d';

import './styles/ImageItem.css';
import useImageItem from './hooks/useImageItem';
import ImageButton from '../ImageButton/ImageButton';
import CustomAlertDialog from '../CustomAlertDialog/CustomAlertDialog';

const ImageItem = ({ imageData, isFeatured, isSelected, onDelete, onDrop, onStartDrag, onEndDrag, onSelection }: ImageItemProps) => {
  const trigglerButton = () => <ImageButton size="icon-sm" className='imageItem__Button--delete' text="🗑"/>
  const confirmButton = () => <ImageButton onClick={ deleteEventHandler } text="Continue"/>
  const [ deleteEventHandler, imageOnSelectionHandler, containerClassName,
        dragStartEventHandler, dragEndEventHandler, dropEventHandler,
        dragOverEventHandler, dragLeaveEventHandler
      ] = useImageItem(imageData.id, isFeatured, isSelected, onDelete, onDrop, onStartDrag, onEndDrag, onSelection);

  return <div data-image={ imageData.id.toString() }
    className={ containerClassName } 
    draggable={ false }
    onClick={ imageOnSelectionHandler } 
    onDrop={ dropEventHandler }
    onDragOver={ dragOverEventHandler }
    onDragLeave={ dragLeaveEventHandler }
    onDragStart={ dragStartEventHandler }
    onDragEnd={ dragEndEventHandler }>
      <img data-image={ imageData.id.toString() }
        src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
        onDrop={ dropEventHandler }
        tabIndex={ 0 } loading="lazy" decoding="async" alt={ imageData.alt }
        className="imageItem__image" />
      <CustomAlertDialog
        title = "Are you absolutely sure?"
        description = "This action cannot be undone. This will permanently delete the image from the Image Gallery."
        alertTriggerElement={ trigglerButton } 
        confirmElement={ confirmButton } />
    </div>
}

export default ImageItem;