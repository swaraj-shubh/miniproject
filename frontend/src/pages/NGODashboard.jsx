import React, { useEffect, useState } from "react";
import { getAvailableFoods, reserveFood } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const NGODashboard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await getAvailableFoods();
      setFoods(res.data);
    } catch (error) {
      toast.error("Failed to fetch donated food items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (id) => {
    try {
      await reserveFood(id);
      toast.success("Food reserved successfully");
      fetchFoods(); // Refresh the list
      alert("Food reserved successfully");
    } catch (error) {
      toast.error("Failed to reserve food");
      alert("Failed to reserve food");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Donated Foods</h2>

      {loading ? (
        <p>Loading...</p>
      ) : foods.length === 0 ? (
        <p>No food items available currently.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <Card key={food._id}>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{food.name}</h3>
                <p>{food.description}</p>
                {food.image && (
                   <img
                   src={item.images[0]} // base64 image
                   alt={item.name}
                   className="rounded-xl object-cover w-full h-64"
                 />
                )}
                <p><strong>Quantity:</strong> {food.quantity}</p>
                <p><strong>Donor:</strong> {food.donor?.name || "N/A"}</p>
                <p><strong>Prep Date:</strong> {new Date(food.preparationDate).toLocaleDateString()}</p>
                <p><strong>Expiry:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {food.address}</p>
                <p><strong>Free:</strong> {food.isFree ? "Yes" : `₹${food.price}`}</p>
                {food.location?.coordinates && (
                  <p>
                    <strong>Location (Lat, Lng):</strong>{" "}
                    {food.location.coordinates[1]}, {food.location.coordinates[0]}
                  </p>
                )}
                <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NGODashboard;
