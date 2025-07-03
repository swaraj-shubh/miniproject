import { BrowserRouter as Routerz_Hehe, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import React from 'react';
import NGODashboard from './pages/NGODashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import Admin from './pages/Admin';
import Map from './pages/Map';

function App() {
  return (
    <Routerz_Hehe className="min-h-screen bg-gray-100">
      <div className='flex-grow container mx-auto'>{/* px..*/}
        <header className="px-2 ">
          <Navbar />
        </header>
        <main className='flex-grow container mx-auto px-4 py-8'>
          <Routes className='mt-16'>
            <Route path='/' element={<Home />} />
            <Route path='/ngoDashboard' element={<NGODashboard />} />
            <Route path='/restaurantDashboard' element={<RestaurantDashboard />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/map' element={<Map />} />
            <Route path='*' element={<div className='text-center text-gray-600'>404</div>} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-6">
          <Footer />
        </footer>
      </div>
    </Routerz_Hehe>
  );
}

export default App;
