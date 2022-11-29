import Header from "../components/Header";
import {ProductsCard} from '../components/Products'
import {useProducts} from '../context/ProductsContext'
import { useAuth } from "../context/AuthContext";


export function ProductsPage() {
  const { products } = useProducts();
  const { roles } = useAuth();

  return (
    <>
      <Header />
      <div className="productspage">
        <h1>ProductsPage</h1>
          <div className="decoration"></div>
        <div className="content-productspage">
          <div className="aside"></div>
          <div className="content-main">
          <div className="details"></div>
          <div className="content-products">
             {products.map((product) => (
              <ProductsCard key={product._id} product={product} roles={roles} section="inventario" />
            ))} 
          </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
