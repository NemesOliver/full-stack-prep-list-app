const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
//Model
const SoldItems = require("../models/SoldItems");

//GET   get all records
//Route /
router.get("/", async (req, res) => {
  const soldItems = await SoldItems.find();

  res.json(soldItems);
});

//POST  create a sold items record
//Route /record
router.post("/record", async (req, res) => {
  const newRecord = new SoldItems(req.body);
  const savedRecord = await newRecord.save();

  res.json(savedRecord);
});

module.exports = router;
