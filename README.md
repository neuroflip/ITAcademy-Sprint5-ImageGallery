# Sprint 5 Imnage Gallery

## Introduction

This is the implementation of the ITAcademy Sprint5 - Image Gallery.

![Image Gallery screenshot](/etc/screenshot.png)

### Features
- Image selection
- Image delete
- Right mouse button contextual menu with:
    - select all images functionality
    - deselect images functionality
    - delete selected images functionality
- Drag and drop images to reorder

Live demo at: [live demo link](https://neuroflip.github.io/ITAcademy-Sprint5-ImageGallery)

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

The project is using the self contained components phylosophy: implementation, custom hooks, styles, tests, helpers code, etc are all together inside the component directory.

| Directory | Content |
| -------- | -------- |
| /src/ | All the source code |
| -- /components/ | All the components source code |
| ---- /CustomAlertDialog/ | AlertDialog to confirm user actions |
| ------ /test/ | tests for the CustomAlertDialog |
| ---- /CustomButton/ | Custom button imaplementation used broadly in the app |
| ------ /test/ | tests for the CustomButton |
| ---- /CustomContextualMenu/ | Contextual menu for batch images operations |
| ------ /test/ | tests for the CustomContextualMenu
| ---- /DragAndDropImagesManager/ | Manager of the images data array, selected images and drag and drop operations (reorder images) |
| ------ /test/ | tests for the DragAndDropImagesManager |
| ------ /hooks/ | implementation of custom hooks to manage the images data array and the drag and drop ui operations |
| ---- <b>/Gallery/</b> | Component to show a collection of images |
| ------ /test/ | tests for the Gallery |
| ---- <b>/ImageItem/</b> | Image card implementation |
| ------ /test/ | tests for the ImageItem |
| -- /styles/ | css common code |
| -- /test/ | tests for the App component |
| -- <b>/ImagesDataProvider/</b> | provider of the images data array using a concrete provider |
| ---- /tests/ | tests for the ImageDataProvider |
| ---- /providers/ | directory for concrete data providers implementations. Includes the PicSumImagesDataProvider implementation |
| ------ /tests/ | tests for the PicSumImagesDataProvider |
| -- /styles/ | scss common code

### Components diagram: 

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

## CI pipeline

The project is managing a CI process using test execution and eslint execution using github actions. Check file .github/workflows/main.yml for more information. This pipeline is executed when some developer wants creates a PR to integrate into main (as example).

![alt ci pipeline execution result in a correct PR](/etc/ci.png)

<br />
