import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/Shipment/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/review" element={<Review/>}></Route>
          <Route path="/Inventory" element={<Inventory/>}></Route>
          <Route path="/LogIn" element={<LogIn/>}></Route>
          <Route path="/Shipment" element={<Shipment/>}></Route>
          <Route path="/product/:productKey" element={<ProductDetail/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </Router>
      
     

    </div>
  );
}

export default App;
