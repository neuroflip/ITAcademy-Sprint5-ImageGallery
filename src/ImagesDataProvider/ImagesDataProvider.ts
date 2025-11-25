import type { ImagesDataProviderInterface, ImagesData, DataProvider } from './ImagesDataProvider.d';

class ImagesDataProvider implements ImagesDataProviderInterface {
  private dataProvider: DataProvider;
  
  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  getImageDataArray(): Array<ImagesData> {
    if (this.dataProvider) {
      return this.dataProvider.getImages();
    } else {
      throw new Error('There is no registered Data Provider to get images data from');
    }
    
  }
}

export default ImagesDataProvider;