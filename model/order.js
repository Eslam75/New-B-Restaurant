import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId:String,
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product", // ربط المنتج بالموديل الخاص به
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
