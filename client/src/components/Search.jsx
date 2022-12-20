import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import {useProducts} from '../context/ProductsContext'
import { useNavigate } from "react-router-dom";


export function Search() {
  const [searchBar, setSearchBar] = useState("");
  const [showSearch, setShowSearch] = useState(false)
  const { products } = useProducts();
  const navigate = useNavigate()
  
 const goToProduct = (product) =>{
  setSearchBar("")
  navigate(`/product/${product}`)
 } 
 const searcher = (e) =>{
  setSearchBar(e.target.value)
  e.target.value.length > 0 ? setShowSearch(true) : setShowSearch(false)
 }

let result = []
searchBar ? result = products.filter((dato)=>dato.title.toLowerCase().includes(searchBar.toLocaleLowerCase())) : searchBar 

  return (
    <div className="content-search-and-result">
      <div className="content-search">
        <input
          type="text"
          name="search"
          placeholder="Buscar en la Tienda"
          className="input-search"
          value={searchBar}
          onChange={searcher}
        />
        <button className="button-search">
          <BsSearch />
        </button>
      </div>
      <div className={showSearch ? "content-result" : "none"}>
      {result.map((product) => (
              <div key={product._id} className={product.section === "inventario" ? "result-search" : "none"} onClick={()=>goToProduct(product._id)}>
                <img className="result-search-image" src={product.image[0].url}/>
                <div className="result-search-info">
                  <p className="search-info-titulo">{product.title}</p>
                  <p className="search-info-price">${product.price}</p>
                </div>
                </div>
            ))} 
      </div>
    </div>
  );
}
