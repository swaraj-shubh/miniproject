// File: backend/controllers/foodController.js
import Food from '../models/Food.js';
import User from '../models/User.js';

export const donateFood = async (req, res) => {
  const { name, description, quantity, preparationDate, expiryDate, images, price, isFree, address, location } = req.body;

  try {
    const food = await Food.create({
      name,
      description,
      quantity,
      preparationDate,
      expiryDate,
      images,
      price,
      isFree,
      donor: req.user._id,
      address,
      location  
    });
    

    await User.findByIdAndUpdate(req.user._id, {
      $push: { donatedFoods: food._id }
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("Error in donateFood:", error);
    res.status(500).json({ message: 'Server error in donation', error: error.message });
  }
  
};

export const getAvailableFoods = async (req, res) => {
  try {
    const foods = await Food.find({ status: 'available' }).populate('donor', 'name email');
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error to fetch available food' });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('donor', 'name email');
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error to get food by id' });
  }
};

export const reserveFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (food.status !== 'available') {
      return res.status(400).json({ message: 'Food is not available' });
    }

    food.status = 'reserved';
    food.receiver = req.user._id;
    await food.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { receivedFoods: food._id }
    });

    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error in finding reserved food' });
  }
};

export const getDonatedFoods = async (req, res) => {
  try {
    const foods = await Food.find({ donor: req.user._id });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while getting donated food' });
  }
};

export const getReceivedFoods = async (req, res) => {
  try {
    const foods = await Food.find({ receiver: req.user._id });
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while getting received food' });
  }
};



export const getAllDonatedFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('donor', 'name email').populate('receiver', 'name email');
    res.json(foods);
  } catch (error) {
    console.error("Error in getAllFoods:", error);
    res.status(500).json({ message: 'Server error while fetching all food data' });
  }
};


// not in work yet



export const updateFood = async (req, res) => {
  const { name, description, quantity, preparationDate, expiryDate, images, price, isFree, address, location } = req.body;

  try {
    const food = await Food.findByIdAndUpdate(req.params.id, {
      name,
      description,
      quantity,
      preparationDate,
      expiryDate,
      images,
      price,
      isFree,
      address,
      location
    }, { new: true });

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    console.error("Error in updateFood:", error);
    res.status(500).json({ message: 'Server error while updating food' });
  }
};
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { donatedFoods: food._id }
    });

    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error("Error in deleteFood:", error);
    res.status(500).json({ message: 'Server error while deleting food' });
  }
};
export const getFoodByLocation = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const foods = await Food.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], 5 / 3963.2] // 5 miles radius
        }
      }
    });

    res.json(foods);
  } catch (error) {
    console.error("Error in getFoodByLocation:", error);
    res.status(500).json({ message: 'Server error while fetching food by location' });
  }
};
export const getFoodByAddress = async (req, res) => {
  const { address } = req.query;

  try {
    const foods = await Food.find({ address: { $regex: address, $options: 'i' } });
    res.json(foods);
  } catch (error) {
    console.error("Error in getFoodByAddress:", error);
    res.status(500).json({ message: 'Server error while fetching food by address' });
  }
};
