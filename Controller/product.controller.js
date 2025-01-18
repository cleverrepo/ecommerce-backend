const mongoose = require("mongoose");
const Product = require("../Models/product.model.js");

// upload product to database
const postProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    res.status(500).json({ message: "Post request failed", error: error });
  }
};

// get all products from the database
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Get request failed", error: error });
  }
};

// get product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Correct usage of Model
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Get request failed", error: error });
  }
};

// update product by id
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Update request failed", error: error });
  }
};

// delete product by id
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete request failed", error: error });
  }
};
// search product

const searchProduct = async (req, res) => {
    try {
      const { key } = req.params; 
      if (!key) {
        return res.status(400).json({ message: "Please provide a search query" });
      }
  
      const result = await Product.aggregate([
        {
          $search: {
            index: "grocery",
            text: {
              query: key,
              path: {
                wildcard: "*", 
              },
            },
          },
        },
      ]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: "No matching products found" });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Search request failed", error: error.message });
    }
  };
  
module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProduct,
};
