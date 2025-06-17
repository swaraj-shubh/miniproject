import React, { useEffect, useState } from 'react';
import { admin } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await admin();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // sorted one 
  // just change 'foods' to 'sortedFoods' in the map
  const sortedFoods = [...foods].sort((a, b) => {
    // Prioritize 'reserved' first, then others (e.g., 'available')
    if (a.status === 'reserved' && b.status !== 'reserved') return -1;
    if (a.status !== 'reserved' && b.status === 'reserved') return 1;
    return 0; // If both are same, no change
  });
  

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
        Admin Dashboard – All Food Donations
      </h1>
  
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-orange-200 dark:border-zinc-700">
        <table className="min-w-full text-sm text-left bg-white dark:bg-zinc-900">
          <thead className="bg-orange-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Food Name</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Prep Date</th>
              <th className="px-4 py-3">Expiry</th>
            </tr>
          </thead>
  
          <tbody className="divide-y divide-orange-100 dark:divide-zinc-800">
            {foods.map((food, index) => (
              <tr key={food._id} className="hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-semibold">{food.name}</td>
                <td className="px-4 py-3">{food.quantity}</td>
  
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{food.donor?.name}</div>
                    <div className="text-xs text-gray-500">{food.donor?.email}</div>
                  </div>
                </td>
  
                <td className="px-4 py-3">
                  {food.receiver ? (
                    <div>
                      <div className="font-medium">{food.receiver.name}</div>
                      <div className="text-xs text-gray-500">{food.receiver.email}</div>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Not Reserved</span>
                  )}
                </td>
  
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      food.status === "available"
                        ? "bg-green-100 text-green-600"
                        : food.status === "reserved"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {food.status}
                  </span>
                </td>
  
                <td className="px-4 py-3">{food.address}</td>
  
                <td className="px-4 py-3">
                  {new Date(food.preparationDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
  
                <td className="px-4 py-3">
                  {new Date(food.expiryDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Admin;
