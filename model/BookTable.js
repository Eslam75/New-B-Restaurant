import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  isReserved: { type: Boolean, default: false }
});

export const Table = mongoose.model("Table", tableSchema);

