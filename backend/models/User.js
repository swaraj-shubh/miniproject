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
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
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

