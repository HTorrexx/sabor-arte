import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
  },
  section: {
    type: String,
    default: "inventario"
  },
  image: [{
    url: String,
    public_id: String,
  }],
});

export default mongoose.model("Product", productSchema);
