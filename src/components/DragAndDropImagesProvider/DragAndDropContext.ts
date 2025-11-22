import { createContext, type Context } from "react";

type DragAndDropContextProps = {
    selectedImagesIds: Set<number>,
    onStartDrag: (imageElement: HTMLElement) => void,
    onEndDrag: () => void,
    onDrop: (destinationElement: HTMLElement) => void,
    onSelection: (id: number) => void,
    onDelete: (id: number) => void,
    onSelectAll: () => void,
    onDeselectAll: () => void,
    onDeleteSelected: () => void
}

const dummyDragHandler = (element: HTMLElement) => {
    element = element;
}

const dummyIdOperation = (id: number) => {
    id = id;
}

const DragAndDropContext: Context<DragAndDropContextProps> = createContext({
    selectedImagesIds: new Set(),
    onStartDrag: dummyDragHandler,
    onEndDrag: () => {},
    onDrop: dummyDragHandler,
    onSelection: dummyIdOperation,
    onDelete: dummyIdOperation,
    onSelectAll: () => {},
    onDeselectAll: () => {},
    onDeleteSelected: () => {}
});

export default DragAndDropContext;