import axios from "axios";


export const getProductsRequests = async () =>
  await axios.get("http://localhost:4000/products");

export const createProductsRequests = async (product, token) => {
  const form = new FormData();

  for (let key in product) {
    form.append(key, product[key]);
  }

  return await axios.post("http://localhost:4000/products", form, {
    headers: {
      "token": token,
      "Content-Type": "multipart/form-data"
    },
  });
};

export const deleteProductRequest = async (id,token) => {
  return await axios.delete("http://localhost:4000/products/" + id, {
    headers: {
      "token": token,
    },
  });
};

export const getProductRequest = async (id, token) => {
  return await axios.get("http://localhost:4000/products/" + id, {
    headers: {
      "token": token,
    },
  });
};

export const updateProductRequest = async (id, newFields, token) => {
  const form = new FormData();

  for (let key in newFields) {
    form.append(key, newFields[key]);
  }

  return await axios.put(`http://localhost:4000/products/${id}`, form, {
    headers: {
      "token": token,
      "Content-Type": "multipart/form-data"
    },
  });
};
