import './App.css';

import Gallery from './components/Gallery/Gallery';
import { data } from './data/images';

function App() {
  return (<>
    <header className="w-full px-4 flex justify-center items-center mt-10 mb-10 gap-2">
      <img className="w-10 app__logoTitle" tabIndex={0} alt="Image Gallery icon" aria-label="Image icon for the gallery" />
      <h1 className="bold" tabIndex={0}>Image Gallery</h1>
    </header>
    
    <main>
      <Gallery images={ data }></Gallery>
    </main>

    <footer className="flex justify-center items-center m-10">
      ITAcademy - Sprint 5
    </footer>
  </>);
}

export default App;
