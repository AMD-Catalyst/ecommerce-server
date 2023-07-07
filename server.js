require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//middleware
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(cookieParser());

//routers
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");
const stripeRoutes = require("./routes/stripe");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);

mongoose.mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // const Product = require("./models/Product");
    // const { productsDummy } = require("./productsDummy");

    // Product.insertMany(productsDummy)
    //   .then(function () {
    //     console.log("Data inserted"); // Success
    //   })
    //   .catch(function (error) {
    //     console.log(error); // Failure
    //   });

    console.log(`MongoDB Successfully Connected`);
    app.listen(PORT, () => {
      console.log(`Server running at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
