import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "@/api/axios";
// import LocationPickerMap from "@/components/LocationPickerMap";
// import MapSearch from "@/components/MapSearch";
import { uploadToCloudinary } from "@/api/uploadToCloudinary";
import { getUserProfile } from "@/api/axios";

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

  const [loading, setLoading] = useState(false);


  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();

    setFormData(prev => ({
      ...prev,
      address: res.data.address?.street || "",
      location: { 
        coordinates: [
          res.data.address?.longitude || "",
          res.data.address?.latitude || ""
        ]
      },
    }));
    // formData.address = res.data.address?.street || "";
    // formData.location.coordinates[0] = res.data.address?.latitude || "";
    // formData.location.coordinates[1] = res.data.address?.longitude || "";

      console.log("Profile fetched successfully:", res.data);
      // console.log("Form data updated with profile address:", formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]); // Runs whenever formData changes

  useEffect(() => {
    setLoading(true);
    fetchProfile()
    .catch(error => {
      toast.error("Failed to load profile");
      console.error(error);
    });
  }, []);

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
      const numValue = Number(value);
      if (isNaN(numValue)) return;
      coords[coordIndex] = numValue;
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
      const uploadResults = await Promise.allSettled(files.map(uploadToCloudinary));
      const successfulUploads = uploadResults
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      
      if (successfulUploads.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...successfulUploads],
        }));
      }

      if (successfulUploads.length !== files.length) {
        toast.warning(`Uploaded ${successfulUploads.length} of ${files.length} images`);
      }
    } catch (err) {
      toast.error("Failed to upload image(s)");
      console.error("Upload error:", err);
    }
  };
  
  //remove 
  const removeImage = (index) => {
    URL.revokeObjectURL(selectedImages[index]);
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
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    if (formData.expiryDate && formData.expiryDate < formData.preparationDate) {
      toast.error("Expiry date must be after preparation date");
      alert("❌ Expiry date must be after preparation date");
      return;
    }

    try {
      console.log("formData while submitting: ", formData);

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
      alert("✅ Food donated successfully! Thanks for your donation.");
      toast.success("Food donation posted successfully!");
      navigate("/ngoDashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to donate food");
      alert("❌ Failed to post food donation: ", error);
      console.error("Donation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="bg-[url('/../../background.png')] min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Donation Form Card */}
        <Card className="overflow-hidden shadow-xl">
          {/* Form Header with Image */}
          <div className="relative h-48">
            <img 
              src="./../../donation.jpg" 
              alt="Food donation" 
              className="w-full h-full object-cover opacity-90"
            />
            <h1 className="absolute top-6 left-6 text-3xl font-extrabold text-black sm:text-4xl mb-3">
              Share Your Blessings
            </h1>
            <p className="absolute top-20 left-6 text-lg text-orange-100 max-w-xl mx-auto">
              Your food donation can make someone's day. Fill out the details below to get started.
            </p>
            <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
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
                      name="quantity"
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

                <div className="mb-4">
                  
                  {/* Combined Upload Area */}
                  <label 
                    className="flex items-center justify-between p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-orange-500', 'bg-orange-100');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-orange-500', 'bg-orange-100');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-orange-500', 'bg-orange-100');
                      if (e.dataTransfer.files.length > 0) {
                        handleImagesChange({ target: { files: e.dataTransfer.files } });
                      }
                    }}
                  >
                    {/* Left side - Upload Info */}
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-gray-700">
                        {selectedImages.length > 0 
                          ? `${selectedImages.length} file(s) selected`
                          : "Drag & drop or click to upload"}
                      </span>
                    </div>
                    
                    {/* Right side - Browse Button */}
                    <div className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors">
                      Browse
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                        className="sr-only"
                      />
                    </div>
                  </label>
                  
                  {/* Helper Text */}
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG (MAX. 5MB each)
                  </p>
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
              {/* <div>
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
              </div> */}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-all duration-300
                    ${isSubmitting 
                      ? 'bg-orange-400 transform scale-95' 
                      : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'}
                    relative overflow-hidden`}
                  onClick={(e) => {
                    if (!isSubmitting) {
                      // Ripple effect
                      const button = e.currentTarget;
                      const ripple = document.createElement('span');
                      ripple.className = 'absolute bg-white opacity-30 rounded-full animate-ripple';
                      
                      const rect = button.getBoundingClientRect();
                      const size = Math.max(rect.width, rect.height);
                      ripple.style.width = ripple.style.height = `${size}px`;
                      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                      
                      button.appendChild(ripple);
                      setTimeout(() => ripple.remove(), 600);
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-y-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                      Submit Donation
                      <style jsx>{`
                        @keyframes ripple {
                          to {
                            transform: scale(4);
                            opacity: 0;
                          }
                        }
                        .animate-ripple {
                          animation: ripple 600ms linear;
                        }
                      `}</style>
                    </>
                  )}
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
