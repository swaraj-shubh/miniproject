import React, { useEffect, useState } from "react";
import { getAvailableFoods, getDonatedFoods, reserveFood, getReceivedFoods, getUserProfile, updateUserProfile } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

const Profile = () => {
  const [foods, setFoods] = useState([]);
  const [reserveFoods, setReserveFoods] = useState([]);
  const [receivedFoods, setReceivedFoods] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfileData(res.data);
    } catch (error) {
      toast.error("Failed to fetch donated food items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      const res = await getDonatedFoods();
      setFoods(res.data);
    } catch (error) {
      toast.error("Failed to fetch donated food items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchReservedFoods = async () => {
    try {
      const res = await reserveFood();
      setReserveFoods(res.data);
    } catch (error) {
      toast.error("Failed to fetch donated food items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchReceivedFoods = async () => {
    try {
      const res = await getReceivedFoods();
      setReceivedFoods(res.data);
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
      alert("Food reserved successfully");
      toast.success("Food reserved successfully");
      fetchFoods(); // Refresh the list
    } catch (error) {
      toast.error("Failed to reserve food");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoods(),fetchReservedFoods(),fetchReceivedFoods(),fetchProfile();
  }, []);

  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Profile:-</h2>
        <Card className="w-full max-w-full shadow-lg rounded-2xl border border-gray-200 bg-white">
            <CardContent className="p-6  space-y-6">
                <h3 className="text-xl font-semibold">Name: {profileData.name}</h3>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Role:</strong> {profileData.role}</p>
                <p><strong>createdAt:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>
                <p><strong>updatedAt:</strong> {new Date(profileData.updatedAt).toLocaleDateString()}</p>
                
            </CardContent>
        </Card>

      <h2 className="text-2xl font-bold mb-4 mt-4">All my tracks:</h2>


        <Card className="w-full max-w-full shadow-lg rounded-2xl border border-gray-200 bg-white">
            <CardContent className="p-6  space-y-6">
                <Tabs defaultValue="donated" className="w-full">
                    <TabsList className="mb-5 grid w-full grid-cols-3 gap-2 bg-gray-100 rounded-lg p-1">
                        <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black text-sm font-medium py-2 rounded-lg transition" value="donated">Donated</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black text-sm font-medium py-2 rounded-lg transition" value="reserved">Reserved</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black text-sm font-medium py-2 rounded-lg transition" value="recieved">Recieved</TabsTrigger>
                    </TabsList>

                    <TabsContent value="donated">
                        {loading ? (
                            <p>Loading...</p>
                        ) : foods.length === 0 ? (
                            <Card className='flex item-center h-100 w-full'>
                                <div className="ml-4 text-gray-700">
                                    No food items donated.
                                </div>
                            </Card>
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
                                    {/* <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button> */}
                                </CardContent>
                                </Card>
                            ))}
                            </div>
                        )}
                    </TabsContent>


                    <TabsContent value="reserved">
                    {loading ? (
                            <p>Loading...</p>
                        ) : reserveFoods.length === 0 ? (
                            <Card className='flex item-center h-100 w-full'>
                                <div className="ml-4 text-gray-700">
                                    No food items available in reserved.
                                </div>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reserveFoods.map((food) => (
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
                                    {/* <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button> */}
                                </CardContent>
                                </Card>
                            ))}
                            </div>
                        )}
                    </TabsContent>


                    <TabsContent value="recieved">
                    {loading ? (
                            <p>Loading...</p>
                        ) : receivedFoods.length === 0 ? (
                            <Card className='flex item-center h-100 w-full'>
                                <div className="ml-4 text-gray-700">
                                    No food items recieved.
                                </div>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {receivedFoods.map((food) => (
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
                                    {/* <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button> */}
                                </CardContent>
                                </Card>
                            ))}
                            </div>
                        )}
                    </TabsContent>

                </Tabs>
            </CardContent>
        </Card>


      {/* {loading ? (
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
      )} */}
    </div>
  );
};

export default Profile;