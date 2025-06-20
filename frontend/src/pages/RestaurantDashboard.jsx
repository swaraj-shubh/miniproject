import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "@/api/axios";
import LocationPickerMap from "@/components/LocationPickerMap";
import MapSearch from "@/components/MapSearch";
import { uploadToCloudinary } from "@/api/uploadToCloudinary";

export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageNames, setSelectedImageNames] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    preparationDate: "",
    expiryDate: "",
    images: [],
    price: 0,
    isFree: true,
    location: { coordinates: ["", ""] },
    address: "",
  });

  const donateFood = (data) => {
    return API.post("/foods/donate", data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isFree") {
      setFormData((prev) => ({ ...prev, isFree: checked }));
    } else if (name === "quantity" || name === "price") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "lng" || name === "lat") {
      const coordIndex = name === "lng" ? 0 : 1;
      const coords = [...formData.location.coordinates];
      coords[coordIndex] = Number(value);
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, coordinates: coords },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
  
    // Preview: Add to existing previews and names
    const newNames = files.map(file => file.name);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setSelectedImageNames(prev => [...prev, ...newNames]);
    setSelectedImages(prev => [...prev, ...newPreviews]);
  
    try {
      const newUrls = await Promise.all(files.map(uploadToCloudinary));
      // Append new image URLs to formData.images
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newUrls],
      }));
    } catch (err) {
      toast.error("Failed to upload image(s)");
      console.error("Upload error:", err);
    }
  };
  
  //remove 
  const removeImage = (index) => {
    const updatedPreviews = [...selectedImages];
    const updatedNames = [...selectedImageNames];
    const updatedCloudUrls = [...formData.images];
  
    updatedPreviews.splice(index, 1);
    updatedNames.splice(index, 1);
    updatedCloudUrls.splice(index, 1);
  
    setSelectedImages(updatedPreviews);
    setSelectedImageNames(updatedNames);
    setFormData((prev) => ({ ...prev, images: updatedCloudUrls }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.quantity ||
      !formData.preparationDate ||
      !formData.location.coordinates[0] ||
      !formData.location.coordinates[1]
    ) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      await donateFood({
        name: formData.name,
        description: formData.description,
        quantity: formData.quantity,
        preparationDate: formData.preparationDate,
        expiryDate: formData.expiryDate || null,
        images: formData.images,
        price: formData.isFree ? 0 : formData.price,
        isFree: formData.isFree,
        location: {
          type: "Point",
          coordinates: formData.location.coordinates,
        },
        address: formData.address,
      });
      alert("✅ Food donation posted successfully!");
      toast.success("Food donation posted successfully!");
      navigate("/ngoDashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to donate food");
    }
  };

  return (
    
    <div className="bg-[url('/../../public/background.png')] min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-black sm:text-4xl mb-3">
            Share Your Blessings
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Your food donation can make someone's day. Fill out the details below to get started.
          </p>
        </div>

        {/* Donation Form Card */}
        <Card className="overflow-hidden shadow-xl">
          {/* Form Header with Image */}
          <div className="relative h-48">
            <img 
              src="./../../public/donation.jpg" 
              alt="Food donation" 
              className="w-full h-full object-cover opacity-90"
            />
            <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white">
              Donate Food
            </h2>
          </div>

          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-700 border-b pb-2">
                  Food Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
                  <Input
                    name="name"
                    placeholder="e.g. Homemade Lasagna, Fresh Fruits"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    name="description"
                    placeholder="Tell us about the food (ingredients, special notes, etc.)"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <Input
                      type="number"
                      min={1}
                      name="quantiy"
                      placeholder="How many servings"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Date *</label>
                    <Input
                      type="date"
                      name="preparationDate"
                      value={formData.preparationDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <Input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Food Images */}
              <div>
                <h3 className="text-lg font-semibold text-orange-700 border-b pb-2 mb-4">
                  Food Images
                </h3>

                <div className="flex items-center justify-center w-full mb-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-orange-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB each)</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview Thumbnails */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`upload-preview-${index}`}
                          className="w-full h-32 object-cover rounded-lg shadow border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-90 group-hover:opacity-100"
                        >
                          ✕
                        </button>
                        <p className="text-center text-xs mt-1 truncate">{selectedImageNames[index]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-orange-700 border-b pb-2 mb-4">
                  Pricing
                </h3>
                <div className="flex items-center mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-700">This food is free</span>
                  </label>
                </div>

                {!formData.isFree && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <Input
                      type="number"
                      name="price"
                      min={0}
                      placeholder="Enter fair price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-orange-700 border-b pb-2 mb-4">
                  Pickup Location
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <Input
                    name="address"
                    placeholder="Street address where food can be picked up"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select on Map *</label>
                  <div className="h-70 rounded-lg overflow-hidden border border-gray-300">
                    <LocationPickerMap
                      onLocationSelect={(coords) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: { ...prev.location, coordinates: coords },
                        }))
                      }
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Selected coordinates: {formData.location.coordinates[1]}, {formData.location.coordinates[0]}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Submit Donation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your donation helps reduce food waste and feed those in need. Thank you for your generosity!</p>
        </div>
      </div>
    </div>
  );
}
