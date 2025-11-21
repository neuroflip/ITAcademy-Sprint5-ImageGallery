import type { ImagesData } from "@/data/images.d";

type ImageItemProps = {
  imageData: ImagesData,
  isFeatured: boolean,
  isSelected: boolean,
  onDelete: (id: number) => void,
  onDrop: (destinationElement: HTMLElement) => void,
  onStartDrag: (imageElement: HTMLElement) => void,
  onEndDrag: () => void,
  onSelection: (id: number) => void
}

enum ImageSize {
  Small = 0,
  Mid,
  Large
}

export { ImageItemProps, ImageSize };