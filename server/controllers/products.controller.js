import Products from "../models/Products.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const result = await Products.find();
    return res.send(result);
  } catch (error) {
    return res.status(500).json({ messaje: error.messaje });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { title, description, price, section } = req.body;
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newProduct = new Products({ title, description, price, section, image });
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productUpdate = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send(productUpdate);
  } catch (error) {
    return res.status(500).json({ messaje: error.messaje });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const productRemove = await Products.findByIdAndRemove(req.params.id);
    if (!productRemove) return res.sendStatus(404);

    if (productRemove.image.public_id) {
      await deleteImage(productRemove.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500).json({ messaje: error.messaje });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) res.sendStatus(404);
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ messaje: error.messaje });
  }
};
