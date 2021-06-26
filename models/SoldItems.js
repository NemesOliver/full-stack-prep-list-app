const mongoose = require("mongoose");

const SoldItemsSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  sold: {
    type: Array,
  },
});

module.exports = mongoose.model("SoldItems", SoldItemsSchema);
