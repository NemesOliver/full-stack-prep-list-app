const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
//Model
const SoldItems = require("../models/SoldItems");

//POST  create a sold items record
//Route /record
router.post("/record", async (req, res) => {
  const newRecord = new SoldItems(req.body);
  const savedRecord = await newRecord.save();

  res.json(savedRecord);
});

module.exports = router;
