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

export default function RestaurantDashboard() {
  const navigate = useNavigate();

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

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    ).then((base64Images) => {
      setFormData((prev) => ({ ...prev, images: base64Images }));
    });
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
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-lg w-full shadow-md">
        <CardContent>
          <h2 className="text-2xl mb-6 font-semibold text-center">Donate Food</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Food Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              type="number"
              min={1}
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <label>
              Preparation Date *
              <Input
                type="date"
                name="preparationDate"
                value={formData.preparationDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Expiry Date
              <Input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Images (multiple)
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
              />
              <span>Is this food free?</span>
            </label>

            {!formData.isFree && (
              <Input
                type="number"
                name="price"
                min={0}
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            )}

            {/* <label>Location Coordinates *</label>
            <div className="flex space-x-2">
              <Input
                type="number"
                step="any"
                name="lng"
                placeholder="Longitude"
                value={formData.location.coordinates[0]}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                step="any"
                name="lat"
                placeholder="Latitude"
                value={formData.location.coordinates[1]}
                onChange={handleChange}
                required
              />
            </div> */}

            <div>
              <label className="block font-medium mb-1">Select Restaurant Location *</label>
              <LocationPickerMap
                onLocationSelect={(coords) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, coordinates: coords },
                  }))
                }
              />
              <p className="text-sm text-gray-500">
                Selected: {formData.location.coordinates[1]}, {formData.location.coordinates[0]}
              </p>
              {/* <MapSearch
                lat={formData.location.coordinates[1] || 23.3441}
                lng={formData.location.coordinates[0] || 85.3096}
                name={formData.name}
                setLatLng={({ lat, lng, address }) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { coordinates: [lng, lat] },
                    address,
                  }))
                }
              /> */}

            </div>


            <Input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">
              Donate Food
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
