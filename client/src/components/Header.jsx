import logo from "../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import { TfiShoppingCart } from "react-icons/tfi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const [coin, setCoin] = useState("$ Dolar");
  const [showList, setShowList] = useState(false);
  const { roles, token, setRoles, setToken } = useAuth();
  const navigate = useNavigate()

  const changeCoin = (e) => {
    setCoin(e.target.innerText);
  };
  const closeSesion = (uno, dos) => {
    setToken(uno);
    setRoles(dos);
    navigate("/")
  };

  const showListActive = (e) => {
    setShowList(true);
  };
  const showListDisable = (e) => {
    setShowList(false);
  };
  return (
    <header>
      <nav className="nav-home">
        <div className="content-title">
          <div>
            <img src={logo} alt="logo" className="img-logo" />
            
          </div>
          <div>
            <h1 className="title"><Link to="/">Sabor&Arte</Link></h1>
          </div>
        </div>
        <div className="content-search">
          <input
            type="text"
            name="search"
            placeholder="Buscar en la Tienda"
            className="input-search"
          />
          <button className="button-search">
            <BsSearch />
          </button>
        </div>
        <div
          className="change-coin"
          onMouseOver={showListActive}
          onMouseOut={showListDisable}
        >
          {coin}
          {
            <ul className={showList ? "list-coin" : "none"}>
              <li>
                <span onClick={changeCoin}>$ Dolar</span>
              </li>
              <li>
                <span onClick={changeCoin}>Bs. Bolivares</span>
              </li>
            </ul>
          }
        </div>
        <div className="car-content">
          <p>cantidad de artiulos - monto</p>
          <TfiShoppingCart className="car" />
        </div>
      </nav>
      <nav className="nav-products">
        <div className="content-list-products">
          <ul className="list-products">
            <li><Link to="/products">TORTAS</Link></li>
            <li>POSTRES FRIOS</li>
            <li>DUlCES</li>
            <li>COMBOS</li>
          </ul>
        </div>
        <div className="-content-list-acount">
          <ul className="list-acount">
            <li className={token && "none"}><Link to="/singup">CREAR CUENTA</Link></li>
            <li className={token && "none"}><Link to="/singin">INICIAR SESION</Link></li>
            <li
              className={token ? "button-close" : "none"}
              onClick={() => closeSesion("", "")}
            >
              CERRAR SESION
            </li>
            <li>WHATSAPP</li>
            <li className={roles !== "admin" ? "none" : ""}><Link to="/newproduct">CREAR PRODUCTO</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
