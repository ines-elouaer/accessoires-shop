const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Accessoire = require('../models/Accessoire');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newAcc = new Accessoire({
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      image: req.file ? req.file.filename : null
    });
    await newAcc.save();
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const accs = await Accessoire.find();
    res.json(accs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
    };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Accessoire.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Accessoire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Accessoire supprimé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
