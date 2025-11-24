type DragAndDropImagesManagerProps = {
    children: React.ReactElement
}

const IMAGECONTAINER_CLASS = 'imageItem__container';
const DRAGGING_CLASS = `${IMAGECONTAINER_CLASS}--dragging`;
const DRAGOVER_CLASS = `${IMAGECONTAINER_CLASS}--dragOver`;

export { DragAndDropImagesManagerProps, DRAGGING_CLASS, DRAGOVER_CLASS, 
    IMAGECONTAINER_CLASS };