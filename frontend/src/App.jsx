import { BrowserRouter as Routerz_Hehe, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import React from 'react';
import NGODashboard from './pages/NGODashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

function App() {
  return (
    <Routerz_Hehe className="min-h-screen bg-gray-100">
      <div className='flex-grow container mx-auto px-2'>{/* px..*/}

        <Navbar />

        <main className='flex-grow container mx-auto px-4 py-8'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ngoDashboard' element={<NGODashboard />} />
            <Route path='/restaurantDashboard' element={<RestaurantDashboard />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<div className='text-center text-gray-600'>404 - ja bsdk 0I0</div>} />
          </Routes>
        </main>

        <footer className='bg-white shadow-inner py-4 mt-8'>
          <div className='container mx-auto px-4 text-center text-gray-600'>
            <p>© {new Date().getFullYear()} Food Sharing App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Routerz_Hehe>
  );
}

export default App;
