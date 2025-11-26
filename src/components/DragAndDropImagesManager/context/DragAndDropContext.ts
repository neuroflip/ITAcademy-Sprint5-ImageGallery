import { createContext, type Context } from "react";
import { dummyDragElement, dummyDragHandler, dummyIdOperation, dummyIdsOperation } from "./utils";

import type { DragAndDropContextProps } from "./DragAndDropContext.d";

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