type ImageSizes = {
    small: string,
    large: string
}

type ImagesData = {
    id: number,
    imageSizes: ImageSizes 
    alt: string
}

type ImagesDataProvider = {
  getImages: () => Array<ImagesData>;
}

interface ImagesManagerInterface {
  getImageDataArray: () => Array<ImagesData>;
}


export { ImagesDataProvider, ImagesManagerInterface, ImagesData };