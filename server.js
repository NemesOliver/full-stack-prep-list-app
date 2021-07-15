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

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
