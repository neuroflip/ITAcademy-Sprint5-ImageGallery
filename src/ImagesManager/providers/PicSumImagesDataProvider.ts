
import type { ImagesData } from '../ImagesManager.d';

const API_URL = 'https://picsum.photos/id/';
const TOTAL_IMAGES = 32;

const buildImageData = (url: string, i: number) => {
    return {
        "id": i,
        "imageSizes": {
            "small": `${url}495/330.webp`,
            "large": `${url}705/470.webp`,
        },
        "alt": `Image number ${i} from Lorem Picsum repository of stock images`
    }
}

class PicSumImagesDataProvider {
  getImages(): Array<ImagesData> {
    const data: Array<ImagesData> = [];
    const initialImage = Math.floor(Math.random() * 50);

    for(let i = initialImage; i < initialImage + TOTAL_IMAGES; i++) {
        data.push(buildImageData(`${API_URL}${i}/`, i - initialImage + 1))
    };

    return data;
  }
}

export default PicSumImagesDataProvider;