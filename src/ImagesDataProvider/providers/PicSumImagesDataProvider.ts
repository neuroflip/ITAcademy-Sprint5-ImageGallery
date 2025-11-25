
import type { ImagesData } from '../ImagesDataProvider.d';
import type { PicSumImagesDataProviderInterface } from './PicSumImagesDataProvider.d';
import { TOTAL_IMAGES, API_URL } from './PicSumImagesDataProvider.d';

const getInitialIndexImage = () => Math.floor(Math.random() * 50);
const getAltText = (i: number) => `Image number ${i} from Lorem Picsum repository of stock images`;
const buildImageData = (url: string, i: number) => {
    return {
        "id": i,
        "imageSizes": {
            "small": `${url}495/330.webp`,
            "large": `${url}705/470.webp`,
        },
        "alt": getAltText(i)
    }
}

class PicSumImagesDataProvider implements PicSumImagesDataProviderInterface {
  getImages(): Array<ImagesData> {
    const data: Array<ImagesData> = [];
    const initialImage = getInitialIndexImage();

    for(let i = initialImage; i < initialImage + TOTAL_IMAGES; i++) {
        data.push(buildImageData(`${API_URL}${i}/`, i - initialImage + 1))
    };

    return data;
  }
}

export default PicSumImagesDataProvider;