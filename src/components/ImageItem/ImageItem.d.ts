import type { ImagesData } from "@/data/images.d";

type ImageItemProps = {
  imageData: ImagesData,
  isFeatured: boolean,
  isSelected: boolean
}

enum ImageSize {
  Small = 0,
  Mid,
  Large
}

export { ImageItemProps, ImageSize };