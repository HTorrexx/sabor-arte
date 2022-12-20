import { useProducts } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export function ProductsCard({ product, roles, section }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const { token } = useAuth();
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Esta seguro de Eliminar? <strong>{id}</strong>
          </p>
          <div>
            <button
              className="bg-red-500 hovber:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deleteProduct(id, token);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };
  return (
    <div
      className={
        product.section === "inventario" && section === "inventario"
          ? "product-card"
          : product.section === "favoritas" && section === "favoritas"
          ? "content-favorite-div"
          : product.section === "nosotros" && section === "nosotros"
          ? "content-skills-div"
          : "none"
      }
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        className={
          section === "inventario"
            ? "product-image"
            : section === "favoritas"
            ? "favorite-image"
            : "skill-image"
        }
        src={product.image[0].url}
      />
      <h2 className="product-name">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(product._id);
        }}
        className={roles === "admin" ? "product-delete" : "none"}
      >
        Eliminar
      </button>
      <button className={section === "nosotros" ? "none" : "product-delete"}>
        Comprar
      </button>
      <button
        className={roles === "admin" ? "product-delete" : "none"}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/products/${product._id}`);
        }}
      >
        Actualizar
      </button>
    </div>
  );
}
