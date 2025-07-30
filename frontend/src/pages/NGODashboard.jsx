import React, { useEffect, useState } from "react";
import { getAvailableFoods, reserveFood } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Map } from "../components/Map";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDonateFood = () => {
    navigate("/restaurantDashboard");
  };

  const fetchFoods = async () => {
    try {
      const res = await getAvailableFoods();
      setFoods(res.data);
    } catch (error) {
      toast.error("❌ Failed to fetch donated food items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (id) => {
    try {
      await reserveFood(id);
      toast.success("✅ Food reserved successfully");
      fetchFoods(); // Refresh the list
      alert("✅ Food reserved successfully");
    } catch (error) {
      toast.error("❌ Failed to reserve food");
      alert("❌ Failed to reserve food");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (

    // <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-6">
    <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-orange-600 mb-2">Share A Meal</h1>
            <p className="text-lg text-amber-800">Reducing food waste, one donation at a time</p>
            <div className="mt-4">
              <img 
                src="./../../foods2.jpg" 
                alt="People sharing food" 
                className="w-full h-35 object-cover rounded-lg shadow-lg"
              />
            </div>
          </header>

          {/* Main Content */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-orange-700">Available Donated Foods</h2>
              <div className="bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium">
                {foods.length} items available
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : foods.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <img 
                  src="./../../plate.jpg" 
                  alt="No food available" 
                  className="mx-auto h-48 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No food items available currently</h3>
                <p className="text-gray-500">Check back later or consider donating food yourself!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...foods].reverse().map((food) => (
                  <Card
                    key={food._id}
                    className="overflow-hidden border border-orange-500 dark:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl"
                  >
                    {food.images?.length > 0 ? (
                      <div className="relative w-full h-48">
                        <KeenFoodCarousel images={food.images} foodName={food.name} />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-orange-100 flex items-center justify-center">
                        <img 
                          src="./../../bag.jpg" 
                          alt="Food placeholder" 
                          className="h-32 opacity-50"
                        />
                      </div>
                    )}


                    
                    <CardContent className="p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          food.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {food.isFree ? "FREE" : `₹${food.price}`}
                        </span>
                      </div>
                      
                      <p className="text-gray-600">{food.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(food.expiryDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {food.address.split(',')[0]}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          {food.quantity} servings
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {food.donor?.name || "Anonymous"}
                        </div>
                      </div>
                      
                      {food.location?.coordinates && (
                        <div className="mt-3">
                          <Map 
                            lat={food.location.coordinates[1]} 
                            lng={food.location.coordinates[0]} 
                            name={food.name} 
                            className="h-32 rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleReserve(food._id)} 
                        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                      >
                        Reserve Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
          
          {/* Footer CTA */}
          <div className="bg-orange-600 rounded-xl p-8 text-center text-white mb-8">
            <h3 className="text-2xl font-bold mb-3">Have extra food to share?</h3>
            <p className="mb-5 max-w-2xl mx-auto">Join our community of food heroes and help reduce waste while feeding those in need.</p>
            <button onClick={handleDonateFood} className="bg-white text-orange-600 font-bold py-3 px-6 rounded-full hover:bg-orange-50 transition-colors duration-300">
              Donate Food Now
            </button>
          </div>
        </div>
    </div>
  );
};

export default NGODashboard;

const KeenFoodCarousel = ({ images, foodName }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: images.length > 1,
    slides: { perView: 1 },
    mode: "snap",
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slider = instanceRef.current;
    if (slider) setLoaded(true);

    const interval = setInterval(() => {
      slider?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  const slidePrev = () => instanceRef.current?.prev();
  const slideNext = () => instanceRef.current?.next();

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider h-48 rounded overflow-hidden">
        {images.map((url, i) => (
          <div
            key={i}
            className="keen-slider__slide flex items-center justify-center"
          >
            <img
              src={url}
              alt={`${foodName}-${i}`}
              className="w-full h-48 object-cover rounded shadow"
            />
          </div>
        ))}
      </div>

      {(loaded&&images.length > 1) && (
        <>
          <button
            onClick={slidePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-orange-500 hover:bg-orange-100 rounded-full p-1 shadow z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={slideNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-orange-500 hover:bg-orange-100 rounded-full p-1 shadow z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};