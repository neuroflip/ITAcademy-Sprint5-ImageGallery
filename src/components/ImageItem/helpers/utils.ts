import { SELECTED_CLASS, FEATURED_CLASS } from '../ImageItem.d';

  const getContainerClassName = (isSelected: boolean, isFeatured: boolean) => `imageItem__container `+ 
      `${ isSelected ? SELECTED_CLASS : '' } `+
      `${ isFeatured ? FEATURED_CLASS : '' }`

  export { getContainerClassName };