const express = require("express");
require("dotenv").config();

// DB connection
const connectDB = require("./config/db");

connectDB();

// Instantiate express app
const app = express();

// Body parser
app.use(express.json());

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// ROUTES
// Dishes
const DishesRoute = require("./routes/Dishes");
app.use("/v1/dishes", DishesRoute);

// Sold Items
const SoldItemsRoute = require("./routes/SoldItems");
app.use("/v1/sold", SoldItemsRoute);
