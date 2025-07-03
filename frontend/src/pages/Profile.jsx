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
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  //const [reserveFoods, setReserveFoods] = useState([]);
  const [receivedFoods, setReceivedFoods] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });



  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [] );

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfileData(res.data);
      localStorage.setItem("role", res.data.role);
  
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: {
          street: res.data.address?.street || "",
          city: res.data.address?.city || "",
          state: res.data.address?.state || "",
          zipCode: res.data.address?.zipCode || "",
          country: res.data.address?.country || "",
          latitude: res.data.address?.latitude || "",
          longitude: res.data.address?.longitude || ""
        },
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully");
      setEditMode(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
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


  useEffect(() => {
    fetchFoods(),fetchReceivedFoods(),fetchProfile();
  }, []);

  return (


    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-6">
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-orange-100">
            <img 
              src="./../../public/locked.jpeg" 
              alt="Login required" 
              className="h-40 mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Access Your Profile
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to view your donation history and profile details
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Go to Login Page
            </Button>
          </div>
        </div>
      ) : (
    <>
      <div className="max-w-7xl mx-auto">

        {/* Profile Section */}
        {!editMode &&(<div className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            Your Profile
          </h2>
          <Card className="w-full shadow-lg rounded-2xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-amber-400 h-3"></div>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-orange-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <img 
                    src="./../../public/profile-pic.png" 
                    alt="Profile" 
                    className="h-20 w-20"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-xl">{profileData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="text-xl capitalize">{profileData.role}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-xl">{new Date(profileData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 mt-4"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>

                </div>
              </div>
              {/* Address Block */}
              <h2 className="text-2xl mt-8 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Your Address Info:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-orange-100">
                <div>
                  <p className="text-sm font-medium text-gray-500">Street</p>
                  <p className="text-lg">{profileData.address?.street || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">City</p>
                  <p className="text-lg">{profileData.address?.city || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">State</p>
                  <p className="text-lg">{profileData.address?.state || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Zip Code</p>
                  <p className="text-lg">{profileData.address?.zipCode || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-lg">{profileData.address?.country || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Latitude</p>
                  <p className="text-lg">{profileData.address?.latitude || "—"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Longitude</p>
                  <p className="text-lg">{profileData.address?.longitude || "—"}</p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>)}

        {/* Edit mode */}
        {editMode && (
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white border border-orange-200 p-6 mt-4 rounded-xl shadow-sm space-y-4"
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Edit Your Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* 🔽 Updated Address Section (Split Fields) */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Street</label>
                <input
                  type="text"
                  value={formData.address?.street || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  value={formData.address?.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">State</label>
                <input
                  type="text"
                  value={formData.address?.state || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.address?.zipCode || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.address?.country || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.address?.latitude || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, latitude: parseFloat(e.target.value) } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.address?.longitude || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, longitude: parseFloat(e.target.value) } })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* 🔐 Password */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">New Password (optional)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* {editMode && (
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white border border-orange-200 p-6 mt-4 rounded-xl shadow-sm space-y-4"
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            Edit Your Profile
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">New Password (optional)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )} */}


        {/* Donation History Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            Your Food History
          </h2>
          <Card className="w-full shadow-lg rounded-2xl border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-amber-400 h-3"></div>
            <CardContent className="p-6">
              <Tabs defaultValue="donated" className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 gap-2 bg-orange-50 rounded-lg p-1">
                  <TabsTrigger 
                    value="donated" 
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
                  >
                    Donated
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recieved" 
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
                  >
                    Received
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="donated">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  ) : foods.length === 0 ? (
                    <Card className='flex flex-col items-center justify-center p-8 h-64 bg-orange-50 rounded-xl'>
                      <img 
                        src="./../../public/bag.jpg" 
                        alt="No donations" 
                        className="h-24 mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No food items donated yet</h3>
                      <p className="text-gray-500 text-center">
                        Your donated food items will appear here when you share meals with the community
                      </p>
                      <Button 
                        onClick={() => navigate("/donate")} 
                        className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                      >
                        Donate Food Now
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {foods.map((food) => (
                        <Card key={food._id} className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-4 space-y-4">
                          <div className="relative h-48 rounded-xl overflow-hidden">
                            {food.images?.[0] ? (
                              <img
                                src={food.images[0]}
                                alt={food.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                                <img 
                                  src="./../../public/bag.jpg" 
                                  alt="Food placeholder" 
                                  className="h-24 opacity-50"
                                />
                              </div>
                            )}
                          </div>

                            <h3 className="text-xl font-semibold">{food.name}</h3>
                            <p className="text-gray-600 line-clamp-2">{food.description}</p>
                            
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
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  food.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {food.isFree ? "FREE" : `₹${food.price}`}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recieved">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  ) : receivedFoods.length === 0 ? (
                    <Card className='flex flex-col items-center justify-center p-8 h-64 bg-orange-50 rounded-xl'>
                      <img 
                        src="./../../public/empty-plate.jpg" 
                        alt="No received items" 
                        className="h-24 mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No food items received yet</h3>
                      <p className="text-gray-500 text-center">
                        Food items you receive from donors will appear here
                      </p>
                      <Button 
                        onClick={() => navigate("/foods")} 
                        className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                      >
                        Browse Available Food
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {receivedFoods.map((food) => (
                        <Card key={food._id} className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-4 space-y-4">
                          <div className="relative h-48 rounded-xl overflow-hidden">
                            {food.images?.[0] ? (
                              <img
                                src={food.images[0]}
                                alt={food.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                                <img 
                                  src="./../../public/bag.jpg" 
                                  alt="Food placeholder" 
                                  className="h-24 opacity-50"
                                />
                              </div>
                            )}
                          </div>

                            <h3 className="text-xl font-semibold">{food.name}</h3>
                            <p className="text-gray-600 line-clamp-2">{food.description}</p>
                            
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
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  food.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {food.isFree ? "FREE" : `₹${food.price}`}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )}
</div>



    // <div className="p-6">
      
    //   {!isLoggedIn ? (
    //   <div className="text-center mt-10">
    //     <h2 className="text-2xl font-bold mb-4 text-red-600">Login First</h2>
    //     <Button
    //       onClick={() => (navigate("/auth"))}
    //       className="bg-green-600 hover:bg-blue-700"
    //     >
    //       Go to Login Page
    //     </Button>
    //   </div>

    //   ):(
    //   <div>
    //     <h2 className="text-2xl font-bold mb-4">Profile:-</h2>
    //     <Card className="w-full max-w-full shadow-lg rounded-2xl border border-gray-200 bg-white">
    //         <CardContent className="p-6  space-y-6">
    //             <h3 className="text-xl font-semibold">Name: {profileData.name}</h3>
    //             <p><strong>Email:</strong> {profileData.email}</p>
    //             <p><strong>Role:</strong> {profileData.role}</p>
    //             <p><strong>createdAt:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>
    //             <p><strong>updatedAt:</strong> {new Date(profileData.updatedAt).toLocaleDateString()}</p>
                
    //         </CardContent>
    //     </Card>
    //   </div>)}
    //   <h2 className="text-2xl font-bold mb-4 mt-4">All my tracks:</h2>


    //     <Card className="w-full max-w-full shadow-lg rounded-2xl border border-gray-200 bg-white">
    //         <CardContent className="p-6 space-y-6">
    //             <Tabs defaultValue="donated" className="w-full">
    //                 <TabsList className="mb-5 grid grid-cols-2 gap-2 bg-gray-100 rounded-lg">
    //                     <TabsTrigger className="w-50" value="donated">Donated</TabsTrigger>
    //                     <TabsTrigger className="w-50" value="recieved">Recieved</TabsTrigger>
    //                 </TabsList>

    //                 <TabsContent value="donated">
    //                     {loading ? (
    //                         <p>Loading...</p>
    //                     ) : foods.length === 0 ? (
    //                         <Card className='flex item-center h-100 w-full'>
    //                             <div className="ml-4 text-gray-700">
    //                                 No food items donated.
    //                             </div>
    //                         </Card>
    //                     ) : (
    //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //                         {foods.map((food) => (
    //                             <Card key={food._id}>
    //                             <CardContent className="p-4 space-y-2">
    //                                 <h3 className="text-xl font-semibold">{food.name}</h3>
    //                                 <p>{food.description}</p>
    //                                 {food.image && (
    //                                 <img
    //                                 src={item.images[0]} // base64 image
    //                                 alt={item.name}
    //                                 className="rounded-xl object-cover w-full h-64"
    //                                 />
    //                                 )}
    //                                 <p><strong>Quantity:</strong> {food.quantity}</p>
    //                                 <p><strong>Donor:</strong> {food.donor?.name || "N/A"}</p>
    //                                 <p><strong>Prep Date:</strong> {new Date(food.preparationDate).toLocaleDateString()}</p>
    //                                 <p><strong>Expiry:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
    //                                 <p><strong>Address:</strong> {food.address}</p>
    //                                 <p><strong>Free:</strong> {food.isFree ? "Yes" : `₹${food.price}`}</p>
    //                                 {food.location?.coordinates && (
    //                                 <p>
    //                                     <strong>Location (Lat, Lng):</strong>{" "}
    //                                     {food.location.coordinates[1]}, {food.location.coordinates[0]}
    //                                 </p>
    //                                 )}
    //                                 {/* <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button> */}
    //                             </CardContent>
    //                             </Card>
    //                         ))}
    //                         </div>
    //                     )}
    //                 </TabsContent>




    //                 <TabsContent value="recieved">
    //                 {loading ? (
    //                         <p>Loading...</p>
    //                     ) : receivedFoods.length === 0 ? (
    //                         <Card className='flex item-center h-100 w-full'>
    //                             <div className="ml-4 text-gray-700">
    //                                 No food items recieved.
    //                             </div>
    //                         </Card>
    //                     ) : (
    //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //                         {receivedFoods.map((food) => (
    //                             <Card key={food._id}>
    //                             <CardContent className="p-4 space-y-2">
    //                                 <h3 className="text-xl font-semibold">{food.name}</h3>
    //                                 <p>{food.description}</p>
    //                                 {food.image && (
    //                                 <img
    //                                 src={item.images[0]} // base64 image
    //                                 alt={item.name}
    //                                 className="rounded-xl object-cover w-full h-64"
    //                                 />
    //                                 )}
    //                                 <p><strong>Quantity:</strong> {food.quantity}</p>
    //                                 <p><strong>Donor:</strong> {food.donor?.name || "N/A"}</p>
    //                                 <p><strong>Prep Date:</strong> {new Date(food.preparationDate).toLocaleDateString()}</p>
    //                                 <p><strong>Expiry:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
    //                                 <p><strong>Address:</strong> {food.address}</p>
    //                                 <p><strong>Free:</strong> {food.isFree ? "Yes" : `₹${food.price}`}</p>
    //                                 {food.location?.coordinates && (
    //                                 <p>
    //                                     <strong>Location (Lat, Lng):</strong>{" "}
    //                                     {food.location.coordinates[1]}, {food.location.coordinates[0]}
    //                                 </p>
    //                                 )}
    //                                 {/* <Button onClick={() => handleReserve(food._id)} className='bg-red-500 hover:bg-red-700'>Reserve</Button> */}
    //                             </CardContent>
    //                             </Card>
    //                         ))}
    //                         </div>
    //                     )}
    //                 </TabsContent>

    //             </Tabs>
    //         </CardContent>
    //     </Card>
    // </div>
  );
};

export default Profile;