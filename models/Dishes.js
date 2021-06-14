const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  neededAmount: {
    type: Number,
    default: 0,
  },
  section: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dish", DishSchema);
