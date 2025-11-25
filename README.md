# Sprint 5 Imnage Gallery

## Introduction

This is the implementation of the ITAcademy Sprint5 - Image Gallery. Live demo at: [live demo link](https://neuroflip.github.io/ITAcademy-Sprint5-ImageGallery)

## Install and run

1. Clone this repo:
```bash
$ git clone https://github.com/neuroflip/ITAcademy-Sprint5-ImageGallery.git
```
2. Install the dependencies:
```bash
$ npm install
```
3. Run in dev mode:
```bash
$ npm run dev
```

4. Or run it on production mode:
```bash
$ npm run build
$ npm run preview
```

5. Run the tests:
```bash
$ npm run test
```

6. Run the linter analisis:
```bash
$ npm run lint
```

<br>

## Project structure

![Project components diagram](/etc/ComponentsDiagram.png))

## Considerations
 - <ins>self contained components</ins>: code, custom hooks, styles, tests, helpers code, etc.
 - built using <ins>functional components</ins>.
 - images with <ins>lazy loading</ins> and <ins>async decode</ins>. 
 - <ins>Spinner images</ins> in ImageItem using background-image. When loads using src, the background image is not visible.
 - <ins>render props</ins> for CustomAlertDialog (alertTriggerElement() to render the element that triggers the AlertDialog)
 - DragAndDropImagesManager <ins>custom hooks</ins> to manage UI (useDragAndDropUI) and images data array functionallity (useImagesData).
 - DragAndDropImagesManager uses <ins>ContextAPI</ins> to share the drag and drop ui and image data array functionallity (avoiding prop drilling).
 - DragAndDropImagesManager UI custom hook using <ins>useCallback</ins> function to memoize the function definitions between re-renders.
 - ImagesManager exposes a getImageDataArray function to get the images data array from an <ins>dependency injected provider</ins> (PicSumImagesDataProvider).
 - DragAndDropImagesManager uses Gallery with <ins>component composition</ins>.
 - CustomContextualMenu uses ImageItem as the triggerElement.
 - <ins>shadcn</ins> components in use: AlertDialog, ContextMenu and Button.
 - useDragAndDropUI onDragStart sets <ins>event.dataTransfer</ins> data into drag and drop event to manage the dragged element id.


MANU:
- tailwind installation: https://tailwindcss.com/docs/installation/using-vite
    - npm tailwind init is not needed https://stackoverflow.com/questions/79383758/how-to-setting-tailwind-css-v4-global-class/79383770#79383770
    - no need for autoprefixed or postcss install (as it cames by default with tailwind core)
    - NOW:  https://tailwindcss.com/docs/installation/using-vite
        - npm install tailwindcss @tailwindcss/vite
        - edit vite config to add the tailwindcss plugin
        - import @import "tailwindcss"; en el index.css

## CI pipeline

## Testing

<br />
