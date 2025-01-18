const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        mainImage: {
            type: String,
            required: true,
        },
        imageThumbnails: {
            type: [String],
            required: true,
        },

        reviews: [
            {
                reviewer: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
const ProductsModel = mongoose.model("Grocery", schema);
module.exports = ProductsModel;

