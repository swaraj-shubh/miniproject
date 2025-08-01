import User from '../models/User.js';

export const getUserProfile = async (req, res) => {   // GET /api/users/profile

  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateUserProfile = async (req, res) => {  // PUT /api/users/profile

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      // 🔧 Update nested address fields individually if present
      user.address.street = req.body.address?.street || user.address.street;
      user.address.city = req.body.address?.city || user.address.city;
      user.address.state = req.body.address?.state || user.address.state;
      user.address.zipCode = req.body.address?.zipCode || user.address.zipCode;
      user.address.country = req.body.address?.country || user.address.country;
      user.address.latitude = req.body.address?.latitude ?? user.address.latitude;
      user.address.longitude = req.body.address?.longitude ?? user.address.longitude;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users/all (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// DELETE /api/users/:id (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves (optional)
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

