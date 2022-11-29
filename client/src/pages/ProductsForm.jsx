import Header from "../components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";


export function ProductsForm() {
  const { createProducts, getProduct, updateProduct } = useProducts();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState("inventario");
  const params = useParams();
  const [product, setproduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    section:""
  });
  
 
  useEffect(() => {
    (async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setproduct(product);
        setSection(product.section)
      }
    })();
  }, [params]);

  const changeSection = (e) => {
   setSection(e.target.options[e.target.selectedIndex].value);
  };

  useEffect(() => {
   setproduct({...product, "section":section})
  }, [section])
  

  return (
    <div>
      <Header />
      <div className="content-main">
        <div className="content-newpp-title">
          <h3 className="title-newpp-page">Nuevo Producto</h3>
          <div className={params.id && "none"} >
            <select onChange={changeSection} name="select">
              <option defaultValue value="inventario">
                Inventario
              </option>
              <option value="favoritas">Favoritas</option>
              <option value="nosotros">Diseños</option>
            </select>
          </div>
          <Link to="/" className="go-home">
            Volver
          </Link>
        </div>

        <Formik
          initialValues={product}
          validationSchema={Yup.object({
            title: Yup.string().required("El Titulo es Requerido"),
            description: Yup.string().required("La Descripcion es Requerida"),
            price: Yup.number(),
            image: Yup.string().required("La Imagen Es Requerida")
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateProduct(params.id, values,token);
            } else {
              await createProducts(values,token);
            }
            actions.setSubmitting(false);
             navigate("/products");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label className="label-title" htmlFor="title">
                Titulo
              </label>
              <Field
                name="title"
                placeholder="titulo"
                className="input-title"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="errormessage-title"
              />
              <label className="label-description" htmlFor="description">
                Descripcion
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="descripcion"
                className="input-description"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="p"
                className="errormessage-description"
              />
              <label
                className={section === "nosotros" ? "none" : "label-price" }
                htmlFor="price"
              >
                Pricio
              </label>
              <Field
                name="price"
                placeholder="Precio"
                className={section === "nosotros" ? "none" : "input-precio" }
              />
              <ErrorMessage
                name="price"
                component="p"
                className={
                  section === "nosotros" ? "none" : "errormessage-precio" 
                }
              />
              <label className="label-image" htmlFor="image">
                Imagen
              </label>
              <input
                type="file"
                name="image"
                className="input-image"
                onChange={(e) => setFieldValue("image",e.target.files[0])}
              />
              <ErrorMessage
                name="image"
                component="p"
                className="errormessage-description"
              />
              <button
                type="submit"
                className="button-create"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h5 w5" />
                ) : (
                  "Guardar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
