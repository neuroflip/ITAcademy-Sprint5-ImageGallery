import type { ImagesData } from "@/ImagesDataProvider/ImagesDataProvider.d";

const alertDialogTitle = "Are you absolutely sure?";
const alertDialogDescription = "This action cannot be undone. This will permanently delete the image from the Image Gallery.";

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

export { ImageItemProps, ImageSize, alertDialogTitle, alertDialogDescription };