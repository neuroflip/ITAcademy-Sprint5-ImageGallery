import type { ImagesData } from '../ImagesDataProvider.d';

const TOTAL_IMAGES = 32;
const API_URL = 'https://picsum.photos/id/';


interface PicSumImagesDataProviderInterface {
  getImages: () => Array<ImagesData>;
}

export { PicSumImagesDataProviderInterface, API_URL, TOTAL_IMAGES };