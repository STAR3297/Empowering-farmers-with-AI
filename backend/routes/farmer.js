const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Crop = require('../models/Crop');
const router = express.Router();

// Auth middleware
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Get farmer profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('crops');
  if (!user || user.userType !== 'farmer') return res.status(404).json({ message: 'Farmer not found' });
  res.json(user);
});

// Update farmer profile
router.put('/profile', auth, async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
  res.json(user);
});

// Add crop
router.post('/crops', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.userType !== 'farmer') return res.status(404).json({ message: 'Farmer not found' });
  const crop = new Crop({ ...req.body, farmer: user._id });
  await crop.save();
  user.crops.push(crop._id);
  await user.save();
  res.status(201).json(crop);
});

// Get all crops for farmer
router.get('/crops', auth, async (req, res) => {
  const crops = await Crop.find({ farmer: req.user.id });
  res.json(crops);
});

// Update crop
router.put('/crops/:id', auth, async (req, res) => {
  const crop = await Crop.findOneAndUpdate({ _id: req.params.id, farmer: req.user.id }, req.body, { new: true });
  if (!crop) return res.status(404).json({ message: 'Crop not found' });
  res.json(crop);
});

// Delete crop
router.delete('/crops/:id', auth, async (req, res) => {
  const crop = await Crop.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });
  if (!crop) return res.status(404).json({ message: 'Crop not found' });
  await User.findByIdAndUpdate(req.user.id, { $pull: { crops: crop._id } });
  res.json({ message: 'Crop deleted' });
});

module.exports = router; 