import { createContext, type Context } from "react";

type DragAndDropContextProps = {
    selectedImagesIds: Set<number>,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    onDrop: (destinationElement: HTMLElement) => void,
    onReorderImage: (originalPositionId: number, destinationPositionId: number) => void,
    onSelectImage: (id: number) => void,
    onDeleteImage: (id: number) => void,
    onSelectAllImages: () => void,
    onDeselectAllImages: () => void,
    onDeleteSelectedImages: () => void
}

const dummyDragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
}

const dummyDragElement = (destinationElement: HTMLElement) => {
    destinationElement?.classList.add('');
}

const dummyIdOperation = (id: number) => {
    const element = document.getElementById(String(id));

    element?.classList.add('');
}

const dummyIdsOperation = (id1: number, id2: number) => {
    const element1 = document.getElementById(String(id1));
    const element2 = document.getElementById(String(id2));

    element1?.classList.add('');
    element2?.classList.add('');
}

const DragAndDropContext: Context<DragAndDropContextProps> = createContext({
    selectedImagesIds: new Set(),
    onDragStart: dummyDragHandler,
    onDragEnd: dummyDragHandler,
    onDragLeave: dummyDragHandler,
    onDragOver: dummyDragHandler,
    onDrop: dummyDragElement,
    onReorderImage: dummyIdsOperation,
    onSelectImage: dummyIdOperation,
    onDeleteImage: dummyIdOperation,
    onSelectAllImages: () => {},
    onDeselectAllImages: () => {},
    onDeleteSelectedImages: () => {}
});

export default DragAndDropContext;