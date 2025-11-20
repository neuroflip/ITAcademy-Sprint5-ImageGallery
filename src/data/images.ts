import type { ImagesData } from './images.d';

const generateImageData = (totalImages: number): Array<ImagesData> => {
    const data: Array<ImagesData> = [];
    const initialImage = Math.floor(Math.random() * 50);

    for(let i = initialImage; i < initialImage + totalImages; i++) {
        data.push(buildImageData(`https://picsum.photos/id/${i}/`, i - initialImage + 1))
    };

    return data;
}

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

const data = generateImageData(32);

export { data };
