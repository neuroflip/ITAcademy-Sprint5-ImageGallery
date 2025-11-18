import type { ImagesData } from "@/data/images.d";

type ImageItemProps = {
  imageData: ImagesData,
  order: number,
  isFeatured: boolean,
  onDelete: (id: string) => void
}

enum ImageSize {
  Small = 0,
  Mid,
  Large
}

export { ImageItemProps, ImageSize };