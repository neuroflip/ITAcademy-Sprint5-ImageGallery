import type { ImagesDataProviderInterface, ImagesData, DataProvider } from './ImagesDataProvider.d';

class ImagesDataProvider implements ImagesDataProviderInterface {
  private dataProvider: DataProvider;
  
  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  getImageDataArray(): Array<ImagesData> {
    return this.dataProvider.getImages();
  }
}

export default ImagesDataProvider;