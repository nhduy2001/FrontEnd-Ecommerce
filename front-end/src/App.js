import './App.css';
import { Navbar } from './components/navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import CheckOut from './pages/checkOut/CheckOut';
import Phones from './pages/phones/Phones';
import Accessories from './pages/accessories/Accessories'


function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/phones' element={<Phones/>} />
        <Route path='/accessories' element={<Accessories/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkOut' element={<CheckOut/>} />
      </Routes>
    </div>
  );
}

export default App;
