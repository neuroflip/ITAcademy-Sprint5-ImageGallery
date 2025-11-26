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

Live demo at: [Image Gallery in production](https://neuroflip.github.io/ITAcademy-Sprint5-ImageGallery)

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
6. Run the tests report in browser:
```bash
$ npm run test:ui
```
7. Run the tests coverage
```bash
$ npm run test:coverage
```
8. Run the linter analisis:
```bash
$ npm run lint
```

<br>

## Project structure

 - <ins>/src/</ins> all general the code, including main and App and the images providers.
 - <ins>/src/styles/</ins> all the general css code not related to a component
 - <ins>/src/test/</ins> App tests and tests file configuration
 - <ins>/src/components/</ins> all the components code. The components are self included (custom hooks, styles, helper utils, context and tests)
 
 And not related to the code: 
 - /etc directory including the README images

## Components diagram: 

![Project components diagram](/etc/ComponentsDiagram.png)

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
