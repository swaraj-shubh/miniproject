// src/pages/MAP.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MapFood from '../components/MapFood';
import { getAvailableFoods } from '@/api/axios';
import { toast } from 'react-toastify';
import { getUserProfile } from '@/api/axios';
import { MapPin, Navigation, Compass } from 'lucide-react';

const MAP = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfileData(res.data);
      localStorage.setItem("role", res.data.role);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const lat = profileData?.address?.latitude || 12.907416208459988;
  const lng = profileData?.address?.longitude || 77.56728144479759;
  console.log("Latitude:", lat, "Longitude:", lng);

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

  // haversine distance calculation
  const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const userCoords = [lat, lng];
  console.log("User Coordinates:", userCoords);

  const closestFood = foods.reduce((nearest, food) => {
    const foodCoords = [food.location.coordinates[1], food.location.coordinates[0]];
    const distance = haversineDistance(userCoords, foodCoords);
    if (!nearest || distance < nearest.distance) {
      return { ...food, distance };
    }
    return nearest;
  }, null);

  const foodsWithDistance = foods.map(food => {
    const coords = [food.location.coordinates[1], food.location.coordinates[0]];
    const distance = haversineDistance(userCoords, coords);
    return { ...food, distance };
  }).sort((a, b) => a.distance - b.distance);

  if (closestFood) console.log("Closest Food:", closestFood);
  if (foodsWithDistance) console.log("Foods with Distance:", foodsWithDistance);

  useEffect(() => {
    fetchFoods();
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1f12] to-[#0c0f08]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-amber-300/70 font-serif italic">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f12] to-[#0c0f08] px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mt-20 mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-4">
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Food Rescue Map
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white/90 tracking-tight">
            Find <span className="text-amber-400">available meals</span> near you
          </h1>
          <p className="text-amber-200/60 text-base max-w-2xl mx-auto mt-2">
            Discover the closest food donations and plan your rescue route
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Stats badge – shows number of available foods */}
        {foodsWithDistance.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-amber-500/30 text-amber-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{foodsWithDistance.length} donation{foodsWithDistance.length !== 1 ? 's' : ''} available</span>
              {closestFood && (
                <>
                  <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    Closest: {closestFood.distance?.toFixed(1)} km
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Map container – glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/20 shadow-2xl shadow-black/20 overflow-hidden"
        >
          <div className="p-1">
            <MapFood
              foods={foodsWithDistance}
              userCoords={userCoords}
              closestFood={closestFood}
            />
          </div>
        </motion.div>

        {/* Optional helper text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-6 text-amber-200/40 text-xs tracking-wide"
        >
          <p>Click on any marker to see food details and reserve it</p>
          <p className="mt-1">📍 Your location is automatically detected from your profile</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MAP;