import type { ImagesSrcSets } from "@/data/images.d";

type ImageItemProps = {
  imageSrcSet: ImagesSrcSets,
  order: number,
  isFeatured: boolean
}

enum ImageSize {
  Small = 0,
  Mid,
  Large
}

export { ImageItemProps, ImageSize };