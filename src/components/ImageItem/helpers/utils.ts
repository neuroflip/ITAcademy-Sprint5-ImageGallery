import { IMAGECONTAINER_CLASS } from "@/components/DragAndDropImagesManager/DragAndDropImagesManager.d";

const SELECTED_CLASS = `${IMAGECONTAINER_CLASS}--selected`;
const FEATURED_CLASS = `${IMAGECONTAINER_CLASS}--featured`;

  const getContainerClassName = (isSelected: boolean, isFeatured: boolean) => `${IMAGECONTAINER_CLASS} `+ 
      `${ isSelected ? SELECTED_CLASS : '' } `+
      `${ isFeatured ? FEATURED_CLASS : '' }`

  export { getContainerClassName };