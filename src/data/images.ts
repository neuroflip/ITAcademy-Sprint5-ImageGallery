import type { ImagesSrcSets } from './images.d';

const generateImageData = (totalImages: number): Array<ImagesSrcSets> => {
    const data: Array<ImagesSrcSets> = [];
    const initialImage = Math.floor(Math.random() * 50);

    for(let i = initialImage; i < initialImage + totalImages; i++) {
        data.push(buildSrcSetForImage(`https://picsum.photos/id/${i}/`))
    };

    return data;
}

const buildSrcSetForImage = (url: string) => {
    return {
        'small': `${url}300/200.webp`,
        'mid': `${url}600/400.webp`,
        'large': `${url}1200/800.webp`,
    }
}

const data = generateImageData(32);

export { data };
