import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { login, register } from "@/api/axios";
import { getUserProfile } from "@/api/axios";
import { Mail, Lock, User, Users } from 'lucide-react';
import LocationPickerMap from "@/components/LocationPickerMap";

export default function Auth() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      latitude: '',
      longitude: ''
    }
  });
  
  const [profileData, setProfileData] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      localStorage.setItem("token", res.data.token);
      // load profile data to set role
      const ress = await getUserProfile();
      setProfileData(ress.data);
      localStorage.setItem("role", ress.data.role);
      setTimeout(() => window.location.reload(), 100);

      // reload and navigate
      alert(`✅ Logged in as: ${loginData.email}`);
      // navigate("/profile"); 
      setTimeout(() => window.location.reload(), 100); 
    } catch (err) {
      console.log(err);
      alert("❌ Error: " + (err.response?.data?.message || "Login failed"));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await register(signupData);
      localStorage.setItem("token", res.data.token);
      alert(`✅ Signed up as: ${signupData.email}`);
      // navigate("/profile");
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      console.log(err);
      alert("❌ Error: " + (err.response?.data?.message || "Signup failed"));
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden border border-orange-100">
      {/* <Card className="w-full min-h-screen shadow-none rounded-none border-0"> */}

        {/* Food-themed header image */}
        <div className="relative h-32 bg-orange-500 overflow-hidden">
          <img 
            src="./../../donation.jpg" 
            alt="Food sharing concept"
            className="w-full h-full object-cover opacity-90"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-orange-400/20"></div> */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">Second Serve</h1>
            <p className="text-orange-100 font-medium">Share Nourishment, Spread Joy</p>
          </div>
        </div>
  
        <CardContent className="p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-orange-100 p-1 rounded-lg mb-8">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-orange-600 rounded-md py-2 transition-all font-medium"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-orange-600 rounded-md py-2 transition-all font-medium"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
  
            {/* Login Tab */}
            <TabsContent value="login" className="justify-center">
              <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-amber-900 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="py-2 px-3 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-amber-900 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="py-2 px-3 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-md transition-all shadow-md hover:shadow-orange-200">
                  Login
                </Button>
              </form>
            </TabsContent>
  
            {/* Sign Up Tab */}
            <TabsContent value="signup" className="justify-center">
              <form onSubmit={handleSignup} className="space-y-6">
              {/* <div className=" gap-4"> */}
                {/* Personal Details */}
                <div className="max-w-sm mx-auto space-y-6">
                  <div>
                    <label htmlFor="signup-name" className="block text-sm font-medium text-amber-900 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        className="py-2 px-3 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="signup-role" className="block text-sm font-medium text-amber-900 mb-1">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        id="signup-role"
                        value={signupData.role}
                        onChange={(e) =>
                          setSignupData({ ...signupData, role: e.target.value })
                        }
                        className="w-full p-2 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white appearance-none"
                        required
                      >
                        <option value="" disabled hidden>Select your role</option>
                        <option value="donor">Food Donor</option>
                        <option value="receiver">Food Receiver</option>
                      </select>
                      <Users className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-amber-900 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({ ...signupData, email: e.target.value })
                        }
                        className="py-2 px-3 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-amber-900 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({ ...signupData, password: e.target.value })
                        }
                        className="py-2 px-3 pl-10 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        required
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
                {/* Address Section */}
                <div className=" pt-2 border-t border-orange-100">
                  <h2 className="text-lg font-semibold text-amber-900 mb-2">Address Details</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-amber-900 mb-1">Street</label>
                      <Input
                        type="text"
                        placeholder="123 Main Street"
                        value={signupData.address?.street || ''}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            address: { ...signupData.address, street: e.target.value }
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-900 mb-1">City</label>
                      <Input
                        type="text"
                        placeholder="Ranchi"
                        value={signupData.address?.city || ''}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            address: { ...signupData.address, city: e.target.value }
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-900 mb-1">State</label>
                      <Input
                        type="text"
                        placeholder="Jharkhand"
                        value={signupData.address?.state || ''}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            address: { ...signupData.address, state: e.target.value }
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-900 mb-1">Zip Code</label>
                      <Input
                        type="text"
                        placeholder="834001"
                        value={signupData.address?.zipCode || ''}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            address: { ...signupData.address, zipCode: e.target.value }
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-900 mb-1">Country</label>
                      <Input
                        type="text"
                        placeholder="India"
                        value={signupData.address?.country || ''}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            address: { ...signupData.address, country: e.target.value }
                          })
                        }
                        required
                      />
                    </div>   
                  </div>

                  {/* Location coordinates */}
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 border-b pb-2 mb-4 mt-4">
                      Choose Your Location
                    </h3>
                    <LocationPickerMap
                      onLocationSelect={([lng, lat]) =>
                        setSignupData({
                          ...signupData,
                          address: {
                            ...signupData.address,
                            latitude: lat.toString(),
                            longitude: lng.toString()
                          }
                        })
                      }
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Selected coordinates: {signupData.address?.latitude}, {signupData.address?.longitude}
                    </p>
                  </div>
                </div>
              {/* </div> */}

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-md transition-all shadow-md hover:shadow-orange-200">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
  //     <Card className="w-full max-w-md shadow-lg">
  //       <CardContent className="p-6">
  //         <Tabs defaultValue="login" className="w-full">
  //           <TabsList className="grid w-full grid-cols-2 mb-6">
  //             <TabsTrigger value="login">Login</TabsTrigger>
  //             <TabsTrigger value="signup">Sign Up</TabsTrigger>
  //           </TabsList>

  //           {/* Login Tab */}
  //           <TabsContent value="login">
  //             <form onSubmit={handleLogin} className="space-y-4">
  //               <Input
  //                 type="email"
  //                 placeholder="Email"
  //                 value={loginData.email}
  //                 onChange={(e) =>
  //                   setLoginData({ ...loginData, email: e.target.value })
  //                 }
  //                 required
  //               />
  //               <Input
  //                 type="password"
  //                 placeholder="Password"
  //                 value={loginData.password}
  //                 onChange={(e) =>
  //                   setLoginData({ ...loginData, password: e.target.value })
  //                 }
  //                 required
  //               />
  //               <Button type="submit" className="w-full">
  //                 Login
  //               </Button>
  //             </form>
  //           </TabsContent>

  //           {/* Sign Up Tab */}
  //           <TabsContent value="signup">
  //             <form onSubmit={handleSignup} className="space-y-4">
  //               <Input
  //                 type="text"
  //                 placeholder="Full Name"
  //                 value={signupData.name}
  //                 onChange={(e) =>
  //                   setSignupData({ ...signupData, name: e.target.value })
  //                 }
  //                 required
  //               />
  //               <select
  //                 value={signupData.role}
  //                 onChange={(e) =>
  //                   setSignupData({ ...signupData, role: e.target.value })
  //                 }
  //                 className="w-full p-2 border rounded-md"
  //                 placeholder="Select Role"
  //                 required
  //               >
  //                 <option value="donor">Donor</option>
  //                 <option value="receiver">Receiver</option>
  //                 <option value="admin">Admin</option>
  //               </select>
  //               <Input
  //                 type="email"
  //                 placeholder="Email"
  //                 value={signupData.email}
  //                 onChange={(e) =>
  //                   setSignupData({ ...signupData, email: e.target.value })
  //                 }
  //                 required
  //               />
  //               <Input
  //                 type="password"
  //                 placeholder="Password"
  //                 value={signupData.password}
  //                 onChange={(e) =>
  //                   setSignupData({ ...signupData, password: e.target.value })
  //                 }
  //                 required
  //               />
  //               <Button type="submit" className="w-full">
  //                 Register
  //               </Button>
  //             </form>
  //           </TabsContent>
  //         </Tabs>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}
