import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: Array,
        },
        category: {
            type: String,
            required: true,
        },
        offer: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);


export const productmodel = mongoose.model("product", productSchema);


