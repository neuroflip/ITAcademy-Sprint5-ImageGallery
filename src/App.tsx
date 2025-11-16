import './App.css';

import Gallery from './components/Gallery/Gallery';
import { data } from './data/images';

function App() {
  return (<>
    <div className="w-full px-4 flex justify-center items-center mt-5 mb-5 gap-2">
      <img className="w-10 app__logoTitle" alt="Image Gallery icon" />
      <h1 className="bold">Image Gallery</h1>
    </div>
    <Gallery images={ data }></Gallery>
  </>);
}

export default App;
