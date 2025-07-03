import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    phone: String,
    role: {
      type: String,
      enum: ['donor', 'receiver', 'admin'],
      default: 'donor'
    },
    cart: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
        quantity: Number
      }
    ],
    donatedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    receivedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
