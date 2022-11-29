import React from "react";
import Header from "../components/Header";
import {useState} from 'react'
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function SingInPage() {
  const { getUser } = useAuth();
  const navigate = useNavigate()
  const [userIn, setUserIn] = useState({
    email: "",
    password: "",
    
  });
  return (
    <div>
      <Header />
      <Formik
        initialValues={userIn}
        validationSchema={Yup.object({
          email: Yup.string().required("El Email es Requerido"),
          password: Yup.string().required("La Contraseña es Requerida"),
        })}
        onSubmit={async (values, actions) => {
           await getUser(values); 
          actions.setSubmitting(false);
          navigate("/")
        }}
        enableReinitialize
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label className="label-email" htmlFor="email">
              Email
            </label>
            <Field name="email" placeholder="Email" className="input-email" />
            <ErrorMessage
              name="email"
              component="p"
              className="errormessage-email"
            />
            <label className="label-password" htmlFor="password">
              Constraseña
            </label>
            <Field name="password" placeholder="Contraseña" className="input-password" />
            <ErrorMessage
              name="password"
              component="p"
              className="errormessage-password"
            />
            <button
              type="submit"
              className="button-Singin"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h5 w5" />
              ) : (
                "Entrar"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
