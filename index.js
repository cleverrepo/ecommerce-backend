const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const routes = require("./Routes/product.routes.js");
const { default: mongoose } = require("mongoose");
app.use(express.json());

dotenv.config();
app.use("/api/products", routes);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
