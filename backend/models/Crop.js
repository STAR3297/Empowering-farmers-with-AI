const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  variety: { type: String },
  plantingDate: { type: Date },
  area: { type: Number },
  status: { type: String, enum: ['planted', 'growing', 'harvested'], default: 'planted' },
  expectedHarvest: { type: Date },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema); 