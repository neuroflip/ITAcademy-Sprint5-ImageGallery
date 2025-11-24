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

const IMAGECONTAINER_CLASS = 'imageItem__container';
const SELECTED_CLASS = `${IMAGECONTAINER_CLASS}--selected`;
const FEATURED_CLASS = `${IMAGECONTAINER_CLASS}--featured`;
const DRAGGING_CLASS = `${IMAGECONTAINER_CLASS}--dragging`;
const DRAGOVER_CLASS = `${IMAGECONTAINER_CLASS}--dragOver`;
const DELETEBUTTON_CLASS = `imageItem__Button--delete`;

export { ImageItemProps, ImageSize, IMAGECONTAINER_CLASS, SELECTED_CLASS, FEATURED_CLASS, DRAGGING_CLASS, DRAGOVER_CLASS, DELETEBUTTON_CLASS };