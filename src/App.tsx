import './App.scss';

import Gallery from './components/Gallery/Gallery';
import { data } from './data/images';

function App() {
  return (<>
    <Gallery images={data}></Gallery>
  </>);
}

export default App;
