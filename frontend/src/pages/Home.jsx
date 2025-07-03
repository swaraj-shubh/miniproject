import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Map from './Map';
export default function Home() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/dashboard');
  //   }
  // }, []);
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);
  const handleLogin = () => {
    navigate('/auth');
  }
  // const [loading, setLoading] = useState(true);
  const handlDonateFood = () => {
    navigate('/restaurantDashboard');
  }
  const handleFindFood = () => {
    navigate('/NGODashboard');
  }
    return (
      <>
            
            <section className="text-center py-20 bg-[url('/../../public/food-donation-services-988981.webp')] rounded-lg bg-cover bg-center">

              <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-orange-500 to-orange-400 animate-fade-in-up">
                  Welcome to Second Serve
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                  Bridging surplus to sustenance — one donation at a time.
                </p>
              </div>

              <h1 className="text-5xl font-bold text-white">Fight Hunger, One Meal at a Time 🍛</h1>
              <p className="text-xl mt-4 text-white">Connecting leftover food from restaurants to NGOs and those in need.</p>
              <div className="mt-8 space-x-4">
                <Button onClick={handlDonateFood} className="bg-red-500 text-white hover:bg-red-600">Donate Food</Button>
                <Button onClick={handleFindFood} variant="outline">Find Food</Button>
              </div>
            </section>
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 1: Donate</h3>
                    <p>Restaurants and individuals can easily donate surplus food through our platform.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 2: Connect</h3>
                    <p>We connect donors with local NGOs and volunteers ready to pick up the food.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Step 3: Distribute</h3>
                    <p>NGOs distribute the food to those in need, ensuring no meal goes to waste.</p>
                  </div>
                </div>
              </div>
            </section>
                          <Map />

            <section className="bg-gray-100 py-16">
              <div className="text-center">
                <h2 className="text-3xl font-bold">Our Impact</h2>
                <div className="flex justify-center gap-8 mt-8">
                  <div>
                    <h3 className="text-4xl font-bold text-red-500">1230+</h3>
                    <p className="text-gray-700">Meals Donated</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-red-500">84+</h3>
                    <p className="text-gray-700">NGOs Served</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-red-500">50+</h3>
                    <p className="text-gray-700">Volunteers</p>
                  </div>
                </div>
              </div>
            </section>


            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Join the Movement</h2>
                <p className="text-center text-gray-600 mb-6">Together, we can make a difference in our community by reducing food waste and feeding those in need.</p>
                <div className="flex justify-center space-x-4">
                  {!isLoggedIn && <Button onClick={handleLogin} className="bg-green-500 text-white">Get Started</Button>}
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </section>
              
      </>
    );
  }
