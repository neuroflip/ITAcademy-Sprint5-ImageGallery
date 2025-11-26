type DragAndDropContextProps = {
    selectedImagesIds: Set<number>,
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void,
    onReorderImage: (originalPositionId: number, destinationPositionId: number) => void,
    onSelectImage: (id: number) => void,
    onDeleteImage: (id: number) => void,
    onSelectAllImages: () => void,
    onDeselectAllImages: () => void,
    onDeleteSelectedImages: () => void
}


export { DragAndDropContextProps };