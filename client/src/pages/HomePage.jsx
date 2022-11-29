import banner from "../assets/banner.jpg";
import Header from "../components/Header";
import {useProducts} from '../context/ProductsContext'
import {ProductsCard} from '../components/Products'
import { useAuth } from "../context/AuthContext";


export function HomePage() {
  const { products } = useProducts();
  const { roles } = useAuth();
  return (
    <div>
      <Header />
      <section className="section-banner">
        <div className="content-banner">
          {/* <img src={banner} alt="banner" className="banner" /> */}
          <div className="content-span-banner">
            <p>EL MEJOR SABOR</p>
            <p>LA MEJOR ATENCION</p>
            <p>LOS MEJORES PRECIOS</p>
          </div>
          <span className="text-banner">
            Sabor&Arte La Mejor Opcion Para LLevar El Dulce A Tu Vida.
          </span>
        </div>
      </section>
      <section className="favorite-section">
        <h2>Las Favoritas Del Momento</h2>
        <div className="content-favorite">
        {products.map((product) => (
              <ProductsCard key={product._id} product={product} roles={roles} section="favoritas" />
            ))} 
        </div>
      </section>
      <section className="skills-section">
        <h2>Nuesta Calidad</h2>
        <div className="content-skills">
        {products.map((product) => (
              <ProductsCard key={product._id} product={product} roles={roles} section="nosotros" />
            ))} 
        </div>
      </section>
      <footer>
        <h3>Copyright © 2019, Somos Dulcear, Todos los derechos reservados</h3>
        <p>Redes Sociales</p>
      </footer>
    </div>
  );
}
