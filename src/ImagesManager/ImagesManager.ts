import type { ImagesDataProvider, ImagesManagerInterface, ImagesData } from './ImagesManager.d';

class ImagesManager implements ImagesManagerInterface {
  private dataProvider: ImagesDataProvider;
  
  constructor(dataProvider: ImagesDataProvider) {
    this.dataProvider = dataProvider;
  }

  getImageDataArray(): Array<ImagesData> {
    return this.dataProvider.getImages();
  }
}

export default ImagesManager;