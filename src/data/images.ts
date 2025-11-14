const generateImageData = (totalImages: number, width: number, height: number): Array<string> => {
    const data: Array<string> = [];

    for(let i=0; i<totalImages; i++) {
        data.push(`https://picsum.photos/id/${i}/${width}/${height}`)
    };

    return data;
}

const data = generateImageData(10, 200, 300);

export { data };

