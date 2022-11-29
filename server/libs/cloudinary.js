import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: "djkaetrhv",
  api_key: "647673254199546",
  api_secret: "sbvDQEYdbNZJnUbXqjBjASVw9S4",
});


export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, { //filePath seria una ruta de un archivo
    folder: "products", //nombre de la carpeta que se crea en clodinary
  });
};

export const deleteImage = async (id)=>{
    return await cloudinary.uploader.destroy(id)
}