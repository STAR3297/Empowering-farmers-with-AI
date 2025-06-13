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

// Haversine formula for distance (in km)
function getDistance(lat1, lng1, lat2, lng2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Get nearby farmers
router.get('/nearby-farmers', auth, async (req, res) => {
  const { lat, lng, radius = 20 } = req.query; // radius in km
  if (!lat || !lng) return res.status(400).json({ message: 'lat and lng required' });
  const farmers = await User.find({ userType: 'farmer', location: { $ne: null } }).populate('crops');
  const nearby = farmers.filter(farmer => {
    if (!farmer.location || farmer.location.lat == null || farmer.location.lng == null) return false;
    return getDistance(Number(lat), Number(lng), farmer.location.lat, farmer.location.lng) <= radius;
  });
  res.json(nearby);
});

module.exports = router; 