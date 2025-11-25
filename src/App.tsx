import './styles/App.css';

import Gallery from './components/Gallery/Gallery';
import DragAndDropImagesManager from './components/DragAndDropImagesManager/DragAndDropImagesManager';

function App() {
  return (<>
    <header className="w-full px-4 flex justify-center items-center mt-10 gap-2">
      <img className="w-10 app__logoTitle" tabIndex={0} alt="Image Gallery icon" aria-label="Image icon for the gallery" />
      <h1 className="bold" tabIndex={0}>Image Gallery</h1>
    </header>
    
    <main>
      <div className="my-4 p-4 border-dotted border-2 border-amber-700 rounded-xl italic text-xs">
        <u>Tip</u>: press right mouse button to select all images, deselect images or delete selected images.
      </div>
      <DragAndDropImagesManager>
        <Gallery />
      </DragAndDropImagesManager>
    </main>

    <footer className="flex justify-center items-center m-10">
      ITAcademy - Sprint 5
    </footer>
  </>);
}

export default App;
