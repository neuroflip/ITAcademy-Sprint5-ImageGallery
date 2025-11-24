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

## Considerations
 - components self contained: code, custom hooks, styles, tests, helpers code
 - image gallery build using functional components
 - images with lazy loading and async decode 
 - render props for CustomAlertDialog (from shadcn)
 - DragAndDropImagesProvider is managing all the images data and drag and drop functionallity. It uses ContextAPI to share the drag and drop event handlers with his descendants avoiding prop drilling.

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
