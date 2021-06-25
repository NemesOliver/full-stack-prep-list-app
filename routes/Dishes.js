const express = require("express");
const mongoose = require("mongoose");
const Dishes = require("../models/Dishes");
const router = express.Router();
//Model
const Dish = require("../models/Dishes");

//GET   get all dishes
//Route /dishes
router.get("/", async (req, res) => {
  const dishes = await Dish.find();

  res.json(dishes);
});

//GET   get a dish
//Route /dishes/:id
router.get("/:id", async (req, res) => {
  const dish = await Dish.findById({ _id: req.params.id });

  res.json(dish);
});

//POST   create a dish
//Route /dishes/new
router.post("/new", async (req, res) => {
  const newDish = new Dishes(req.body);
  const savedDish = await newDish.save();

  res.json(savedDish);
});

//PATCH   update a dish
//Route /dishes/edit/:id
router.patch("/edit/:id", async (req, res) => {
  const dish = await Dish.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );

  res.json(dish);
});

//PATCH record sold items
//Route /dishes/sold/:id
router.patch("/sold/:id", async (req, res) => {
  try {
    const sold = await Dish.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { sold: req.body } }
    );

    res.json(sold);
  } catch (err) {
    console.error(err);
  }
});

//DELETE   delete a dish
//Route /dishes/delete/:id
router.delete("/delete/:id", async (req, res) => {
  const result = await Dish.findByIdAndDelete({ _id: req.params.id });

  res.json(result);
});

//BULKWRITE
router.patch("/recordTotal", async (req, res) => {
  const documents = req.body;

  const bulkOps = documents.map((document) => ({
    updateOne: {
      filter: { _id: mongoose.Types.ObjectId(document._id) },
      update: {
        $set: { total: document.total },
      },
      upsert: true,
    },
  }));

  const results = await Dish.collection.bulkWrite(bulkOps);

  res.json(results);
});

module.exports = router;
