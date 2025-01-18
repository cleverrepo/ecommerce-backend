const express = require("express");  // Fixed typo
const routes = express.Router();     // Fixed typo
const {
    postProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchProduct,
} = require("../Controller/product.controller.js");

// Define routes
routes.post("/", postProduct);
routes.get("/", getAllProducts);
routes.get("/:id", getProductById);
routes.get("/search/:key", searchProduct)
routes.put("/:id", updateProductById);
routes.delete("/:id", deleteProductById);

module.exports = routes;  // Fixed typo
