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

const DragAndDropContext: Context<DragAndDropContextProps> = createContext({
    selectedImagesIds: new Set(),
    onStartDrag: (imageElement: HTMLElement) => {},
    onEndDrag: () => {},
    onDrop: (destinationElement: HTMLElement) => {},
    onSelection: (id: number) => {},
    onDelete: (id: number) => {},
    onSelectAll: () => {},
    onDeselectAll: () => {},
    onDeleteSelected: () => {}
});

export default DragAndDropContext;