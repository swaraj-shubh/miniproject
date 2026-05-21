import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="px-2">
          <Navbar />
        </header>

        <main className="flex-grow bg-gradient-to-b from-[#1a1f12] to-[#0c0f08]">
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ngoDashboard" element={<NGODashboard />} />
              <Route path="/restaurantDashboard" element={<RestaurantDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/map" element={<Map />} />
              <Route path="*" element={<div className="text-center text-gray-600">404</div>} />
            </Routes>
          </div>
        </main>
        <footer className="bg-gray-800 text-white">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;