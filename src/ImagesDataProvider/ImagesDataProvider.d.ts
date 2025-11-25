type ImageSizes = {
    small: string,
    large: string
}

type ImagesData = {
    id: number,
    imageSizes: ImageSizes 
    alt: string
}

type DataProvider = {
  getImages: () => Array<ImagesData>;
}

interface ImagesDataProviderInterface {
  getImageDataArray: () => Array<ImagesData>;
}


export { DataProvider, ImagesDataProviderInterface, ImagesData };