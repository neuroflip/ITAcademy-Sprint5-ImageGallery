import './App.scss';

import ImageItem from './components/ImageItem/ImageItem';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';

function App() {
  return (<>
    <ImageItem imagePath={image1}></ImageItem>
    <ImageItem imagePath={image2}></ImageItem>
    <ImageItem imagePath={image3}></ImageItem>
  </>);
}

export default App;
