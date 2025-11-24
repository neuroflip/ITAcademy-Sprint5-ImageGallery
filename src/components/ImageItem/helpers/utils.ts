  const SELECTED_CLASS = 'imageItem__container--selected';
  const FEATURED_CLASS = 'imageItem__container--featured';
  const DRAGGING_CLASS = 'imageItem__container--dragging';
  const DRAGOVER_CLASS = 'imageItem__container--dragOver';
  const DELETEBUTTON_CLASS = 'imageItem__Button--delete';

  const addClassAfterEvent = (event: React.DragEvent<HTMLDivElement>,
    preventDef: boolean,
    className: string,
    callback: (element: HTMLElement) => void) => {
      const element = event.target as HTMLElement;

      //event.stopPropagation();
      if(preventDef) {
        event.preventDefault();
      }
      callback(element);
      element?.classList.add(className);
  }

  const removeClassAfterEvent = (event: React.DragEvent<HTMLDivElement>, 
    preventDef: boolean,
    className: string,
    callback: (element: HTMLElement) => void) => {
      const element = event.target as HTMLElement;

      event.stopPropagation();
      if(preventDef){
        event.preventDefault();
      } 
      callback(element);
      element?.classList.remove(className);
  }

  const getContainerClassName = (isSelected: boolean, isFeatured: boolean) => `imageItem__container `+ 
      `${ isSelected ? SELECTED_CLASS : '' } `+
      `${ isFeatured ? FEATURED_CLASS : '' }`

  export { addClassAfterEvent, removeClassAfterEvent, getContainerClassName, DRAGGING_CLASS, DRAGOVER_CLASS, DELETEBUTTON_CLASS };