// src/pages/MAP.jsx

import { useEffect, useState } from 'react';
import MapFood from '../components/MapFood';
import { getAvailableFoods } from '@/api/axios';
import { toast } from 'react-toastify';
import { getUserProfile } from '@/api/axios';

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

    const lat= profileData?.address?.latitude || 12.907416208459988;
    const lng= profileData?.address?.longitude || 77.56728144479759;
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

  // to calculate distance
  const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
    const toRad = (x) => (x * Math.PI) / 180;
  
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // in km
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

  if (loading) return <div className="p-4 text-center">Loading map...</div>;

  return (
    <div className="flex justify-center items-center mx-auto p-4 bg-white shadow-lg rounded-lg">
        <MapFood 
            //foods={foods} 
            foods={foodsWithDistance}
            userCoords={userCoords} 
            closestFood={closestFood} 
        />
    </div>
  );
};

export default MAP;
