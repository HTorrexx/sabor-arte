import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductsForm } from "./pages/ProductsForm";
import { Toaster } from "react-hot-toast";
import { SingInPage } from "./pages/SingInPage";
import { SingUpPage } from "./pages/SingUpPage";
import { ProductView } from "./pages/ProductView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/newproduct" element={<ProductsForm />} />
        <Route path="/products/:id" element={<ProductsForm />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/car" element={<h1>mi carrito</h1>} />
        <Route path="/singup" element={<SingUpPage />} />
        <Route path="/singin" element={<SingInPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
