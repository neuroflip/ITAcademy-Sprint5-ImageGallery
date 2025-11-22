import * as React from 'react';

import type { ImageItemProps } from './ImageItem.d';
import ImageButton from '../ImageButton/ImageButton';
import CustomAlertDialog from '../CustomAlertDialog/CustomAlertDialog';
import DragAndDropContext from '../DragAndDropImagesProvider/DragAndDropContext';
import { addClassAfterEvent, removeClassAfterEvent, getContainerClassName, DRAGGING_CLASS, DRAGOVER_CLASS, DELETEBUTTON_CLASS } from './helpers/utils';

import './styles/ImageItem.css';

const ImageItem = ({ imageData, isFeatured, isSelected }: ImageItemProps) => {
  const { onStartDrag, onEndDrag, onDrop, onSelection, onDelete } = React.useContext(DragAndDropContext);

  const trigglerButton = () => <ImageButton size="icon-sm" className={ DELETEBUTTON_CLASS } text="🗑"/>
  const confirmButton = () => <ImageButton onClick={ () => { onDelete(imageData.id) } } text="Continue"/>

  return <div data-image={ imageData.id.toString() }
    className={ getContainerClassName(isSelected, isFeatured) } 
    draggable={ false }
    onClick={ () => { onSelection(imageData.id) } } 
    onDrop={ (event: React.DragEvent<HTMLDivElement>) => { addClassAfterEvent(event, true, '', onDrop) } }
    onDragOver={ (event: React.DragEvent<HTMLDivElement>) => { addClassAfterEvent(event, true, DRAGOVER_CLASS, () => { }) } }
    onDragLeave={ (event: React.DragEvent<HTMLDivElement>) => { removeClassAfterEvent(event, true, DRAGOVER_CLASS, () => { }) } }
    onDragStart={ (event: React.DragEvent<HTMLDivElement>) => { addClassAfterEvent(event, false, DRAGGING_CLASS, onStartDrag) } }
    onDragEnd={ (event: React.DragEvent<HTMLDivElement>) => { removeClassAfterEvent(event, true, DRAGGING_CLASS, onEndDrag) } }>
      <img data-image={ imageData.id.toString() }
        src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
        onDrop={ (event: React.DragEvent<HTMLDivElement>) => { addClassAfterEvent(event, true, '', onDrop) } }
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