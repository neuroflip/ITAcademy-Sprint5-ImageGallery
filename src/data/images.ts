import type { ImagesSrcSets } from './images.d';

const generateImageData = (totalImages: number): Array<ImagesSrcSets> => {
    const data: Array<ImagesSrcSets> = [];
    const initialImage = Math.floor(Math.random() * 50);

    for(let i = initialImage; i < initialImage + totalImages; i++) {
        data.push(buildSrcSetForImage(`https://picsum.photos/id/${i}/`, i))
    };

    return data;
}

const buildSrcSetForImage = (url: string, i: number) => {
    return {
        "imageSizes": {
            "small": `${url}495/330.webp`,
            "large": `${url}705/470.webp`,
        },
        "alt": `Image number ${i} from Lorem Picsum repository of stock images`
    }
}

const data = generateImageData(32);

export { data };
