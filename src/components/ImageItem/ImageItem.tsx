import * as React from 'react';

import type { ImageItemProps } from './ImageItem.d';
import { alertDialogTitle, alertDialogDescription } from './ImageItem.d';

import CustomButton from '../CustomButton/CustomButton';
import CustomAlertDialog from '../CustomAlertDialog/CustomAlertDialog';
import DragAndDropContext from '../DragAndDropImagesManager/context/DragAndDropContext';
import { getContainerClassName } from './helpers/utils';

import './styles/ImageItem.css';

const DELETEBUTTON_CLASS = `imageItem__Button--delete`;

const ImageItem = ({ imageData, isFeatured, isSelected }: ImageItemProps) => {
  const { onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop, onReorderImage, onSelectImage, onDeleteImage } = React.useContext(DragAndDropContext);
  const trigglerButton = () => <CustomButton size="icon-sm" className={ DELETEBUTTON_CLASS } text="🗑"/>

  return <div data-image={ imageData.id.toString() } data-testid="imageContainer"
    className={ getContainerClassName(isSelected, isFeatured) } 
    onClick={ () => { onSelectImage(imageData.id) } } 
    onDrop={ (event: React.DragEvent<HTMLDivElement>) => {
        onDrop(event); 
        onReorderImage(Number(event.dataTransfer.getData('draggedElementId')), imageData.id);
      }
    }
    onDragOver={ (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDragOver(event);
      }
    }
    onDragStart={ (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("draggedElementId", (event.target as HTMLDivElement).dataset.image || '');
        onDragStart(event);
      }
    }
    onDragEnd={ (event: React.DragEvent<HTMLDivElement>) => {
        onDragEnd(event);
      }
    }
    onDragLeave={ (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDragLeave(event);
      }
    }>
      <img data-image={ imageData.id.toString() }
        src={ isFeatured ? imageData.imageSizes.large : imageData.imageSizes.small }
        tabIndex={ 0 } loading="lazy" decoding="async" alt={ imageData.alt }
        className="imageItem__image" />
      <CustomAlertDialog
        title = { alertDialogTitle}
        description = { alertDialogDescription } 
        alertTriggerElement={ trigglerButton }
        confirmCallback={ () => { onDeleteImage(imageData.id) } }
        cancelCallback={ () => { } }/>
    </div>
}

export default ImageItem;