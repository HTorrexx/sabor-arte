import { createContext, useEffect, useState, useContext } from "react";
import {
  createProductsRequests,
  deleteProductRequest,
  getProductRequest,
  getProductsRequests,
  updateProductRequest,
} from "../api/products.api";

export const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  return context;
};

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await getProductsRequests();
    setProducts(res.data);
  };

  const createProducts = async (product, token) => {
    try {
      const res = await createProductsRequests(product,token);
      setProducts([...products, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id,token) => {
    await deleteProductRequest(id,token);
    setProducts(
      products.filter((product) => (product._id !== id))
    );
  };

  const getProduct = async (id, token) =>{
    const res = await getProductRequest(id, token);
    return res.data
  }

  const updateProduct = async (id, product, token)=>{
    const res = await updateProductRequest(id, product, token)
    setProducts(products.map(product=> (product._id === id ? res.data: product)))
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, getProducts, getProduct,createProducts, deleteProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
