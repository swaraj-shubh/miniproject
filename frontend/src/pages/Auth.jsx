import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      const ress = await getUserProfile();
      setProfileData(ress.data);
      localStorage.setItem("role", ress.data.role);
      setTimeout(() => window.location.reload(), 100);
      alert(`✅ Logged in as: ${loginData.email}`);
      navigate("/profile"); 
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
      navigate("/profile");
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      console.log(err);
      alert("❌ Error: " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f12] to-[#0c0f08] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        <Card className="w-full bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header image with gradient overlay */}
          <div className="relative h-32 bg-gradient-to-r from-amber-600 to-orange-600 overflow-hidden">
            <img 
              src="./../../donation.jpg" 
              alt="Food sharing concept"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h1 className="font-serif text-3xl font-light text-white drop-shadow-lg">Second Serve</h1>
              <p className="text-amber-200/80 text-sm tracking-wide">Share Nourishment, Spread Joy</p>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-500/10 p-1 rounded-xl mb-8">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-lg py-2 text-amber-200 transition-all font-medium"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-lg py-2 text-amber-200 transition-all font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="py-2 px-3 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                          required
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="login-password" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="py-2 px-3 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                          required
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="signup-name" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          className="py-2 px-3 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="signup-role" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          id="signup-role"
                          value={signupData.role}
                          onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                          className="w-full p-2 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white appearance-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                          required
                        >
                          <option value="" disabled hidden className="text-gray-400">Select your role</option>
                          <option value="donor">Food Donor</option>
                          <option value="receiver">Food Receiver</option>
                        </select>
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="signup-email" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="py-2 px-3 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="signup-password" className="block text-xs uppercase tracking-wider text-amber-400/70 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="py-2 px-3 pl-10 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="pt-2 border-t border-amber-500/20">
                    <h2 className="font-serif text-xl font-light text-white mb-3">Address Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-amber-400/70 mb-1">Street</label>
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
                          className="bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-amber-400/70 mb-1">City</label>
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
                          className="bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-amber-400/70 mb-1">State</label>
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
                          className="bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-amber-400/70 mb-1">Zip Code</label>
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
                          className="bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-amber-400/70 mb-1">Country</label>
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
                          className="bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder:text-amber-200/30 focus:border-amber-500 transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Location Picker */}
                    <div className="mt-4">
                      <h3 className="font-serif text-lg font-light text-white mb-2">Choose Your Location</h3>
                      <div className="rounded-xl overflow-hidden border border-amber-500/20">
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
                      </div>
                      {signupData.address?.latitude && signupData.address?.longitude && (
                        <p className="mt-2 text-xs text-amber-200/60">
                          Selected: {Number(signupData.address.latitude).toFixed(6)}, {Number(signupData.address.longitude).toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 mt-4"
                  >
                    Create Account
                  </motion.button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}