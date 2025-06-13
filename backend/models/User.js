const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['farmer', 'customer'], required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  farmName: { type: String }, // Only for farmers
  farmSize: { type: String }, // Only for farmers
  experience: { type: String }, // Only for farmers
  crops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crop' }], // Only for farmers
  preferences: [{ type: String }], // Only for customers
  address: { type: String }, // Only for customers
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 