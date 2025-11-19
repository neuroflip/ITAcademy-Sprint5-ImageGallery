import type { ImagesData } from "@/data/images.d";

type ImageItemProps = {
  imageData: ImagesData,
  isFeatured: boolean,
  onDelete: (id: number) => void,
  onDrop: (destinationElement: HTMLElement) => void,
  onStartDrag: (imageElement: HTMLElement) => void,
  onEndDrag: (imageElement: HTMLElement) => void,
  onDragOver: (imageElement: HTMLElement) => void,
  onDragLeave: (imageElement: HTMLElement) => void
}

enum ImageSize {
  Small = 0,
  Mid,
  Large
}

export { ImageItemProps, ImageSize };