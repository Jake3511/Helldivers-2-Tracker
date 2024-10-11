import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Planets from './components/Planets';
import MajorOrders from './components/MajorOrders';
import Superstore from './components/Superstore'
import MapComponent from './components/MapComponent'; // Import the MapComponent
import Footer from './components/Footer'
import './styles/styles.css'

function App() {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  }
  return (
    <div className="App background-image">
      <div className="header-container">
        <img
          src="/images/Helldivers2-command-logo.png"
          alt="Home"
          className="home-button"
          onClick={() => navigateTo('/')}
          style={{ cursor: 'pointer', width: '150px', height: 'auto' }}
        />
        <div className="button-container">
          <button className="Planets" onClick={() => navigateTo('/planets')}>Planets</button>
          <button className="Major-Orders" onClick={() => navigateTo('/majororders')}>Major Orders</button>
          <button className="Superstore" onClick={() => navigateTo('/superstore')}>Superstore</button>
        </div>
      </div>
    
    <Routes>
      <Route path="/" element={<MapComponent />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/majororders" element={<MajorOrders />} />
      <Route path="/superstore" element={<Superstore />} />
    </Routes>
    <Footer />
  </div>
  );
}


export default App;
