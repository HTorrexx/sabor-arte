import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";

export function ProductView() {
  const params = useParams();
  const { getProduct } = useProducts();
  const [product, setproduct] = useState("");
  const [value,setValue] = useState("")
  const [option, setOption] = useState(0);



  useEffect(() => {
    (async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setproduct(product);
        setValue(product.image.length)
      }
    })();
  }, [params]);

  return (
    <div>
      <Header />
      <div className="content-title-view">
        <h1 className="view-title">{product.title}</h1>
        <div className="decoration"></div>
      </div>
      <div className="content-product-view">
        <div className="content-multi-image">
          {value > 1 &&
            product.image.map((img) => (
              <img
                key={img.public_id}
                className="multi-image"
                src={img.url}
                onClick={() => setOption(product.image.indexOf(img))}
              />
            ))}
        </div>
        <div className="content-image-view">
          {product && (
            <img className="image-view" src={product.image[option].url} />
          )}
        </div>
        <div className="content-info-product-view">
          <p className="description-view">{product.description}</p>
          <div className="decoration-2"></div>
          <p className="price-view">{product.price}</p>
          <div className="content-button-view">
            <button>contador</button>
            <button>añandir carrito</button>
            <button>comprar ya</button>
          </div>
        </div>
      </div>
      <footer>
        <h3>Copyright © 2019, Somos Dulcear, Todos los derechos reservados</h3>
        <p>Redes Sociales</p>
      </footer>
    </div>
  );
}
