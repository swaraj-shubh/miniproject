import React, { useEffect, useState } from "react";
import { getAvailableFoods, reserveFood } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Map } from "../components/Map";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen px-6 sm:px-12 lg:px-20 xl:px-32 py-8">
      <div className="max-w-7xl mt-20 mx-auto">
        {/* Header Section – Glassmorphism style */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-4">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400/50" />
            <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Share A Meal
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-3 tracking-tight">
            Reducing food waste,<br />
            <span className="text-amber-400">one donation at a time</span>
          </h1>
          <p className="text-amber-200/70 text-lg font-serif italic max-w-2xl mx-auto">
            Fresh meals waiting for a second chance — reserve and distribute to those in need.
          </p>
          <div className="mt-6 relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
            <img
              src="./../../foods2.jpg"
              alt="People sharing food"
              className="w-full h-48 object-cover rounded-2xl border border-amber-500/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.header>

        {/* Main Content */}
        <section className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-3xl sm:text-4xl font-light text-white/90"
            >
              Available Donated Foods
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-300 font-medium text-sm"
            >
              {foods.length} items available
            </motion.div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
          ) : foods.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-black/30 backdrop-blur-md rounded-2xl border border-amber-500/20"
            >
              <img
                src="./../../plate.jpg"
                alt="No food available"
                className="mx-auto h-40 mb-4 opacity-70"
              />
              <h3 className="font-serif text-2xl text-white/80 mb-2">No food items available currently</h3>
              <p className="text-amber-200/50">Check back later or consider donating food yourself!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...foods].reverse().map((food, idx) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10">
                    {food.images?.length > 0 ? (
                      <div className="relative w-full h-48">
                        <KeenFoodCarousel images={food.images} foodName={food.name} />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-amber-500/10 flex items-center justify-center">
                        <img
                          src="./../../bag.jpg"
                          alt="Food placeholder"
                          className="h-32 opacity-50"
                        />
                      </div>
                    )}

                    <CardContent className="p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-xl font-medium text-white group-hover:text-amber-300 transition-colors">
                          {food.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            food.isFree
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {food.isFree ? "FREE" : `₹${food.price}`}
                        </span>
                      </div>

                      <p className="text-amber-100/70 text-sm leading-relaxed">{food.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1.5 text-amber-200/60">
                          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(food.expiryDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-200/60">
                          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {food.address.split(",")[0]}
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-200/60">
                          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          {food.quantity} servings
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-200/60">
                          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className="h-32 rounded-lg border border-amber-500/20 overflow-hidden"
                          />
                        </div>
                      )}

                      <button
                        onClick={() => handleReserve(food._id)}
                        className="w-full mt-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300"
                      >
                        Reserve Now
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Footer CTA – Glass card matching the theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/30 p-8 text-center mb-8"
        >
          <h3 className="font-serif text-3xl font-light text-white mb-3">
            Have extra food to share?
          </h3>
          <p className="text-amber-200/70 max-w-2xl mx-auto mb-6">
            Join our community of food heroes and help reduce waste while feeding those in need.
          </p>
          <button
            onClick={handleDonateFood}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            Donate Food Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NGODashboard;

// KeenFoodCarousel with restyled buttons
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
    <div className="relative h-full">
      <div ref={sliderRef} className="keen-slider h-48 rounded-t-2xl overflow-hidden">
        {images.map((url, i) => (
          <div key={i} className="keen-slider__slide flex items-center justify-center">
            <img src={url} alt={`${foodName}-${i}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
      {loaded && images.length > 1 && (
        <>
          <button
            onClick={slidePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-amber-300 hover:text-amber-400 rounded-full p-1.5 shadow-lg transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={slideNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-amber-300 hover:text-amber-400 rounded-full p-1.5 shadow-lg transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};