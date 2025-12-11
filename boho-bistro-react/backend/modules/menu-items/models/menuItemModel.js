import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String, default: "" },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;