const mongoose = require('mongoose');

const accessoireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  prix: { type: Number, required: true },
  image: String
});

module.exports = mongoose.model('Accessoire', accessoireSchema);
