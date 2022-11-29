import Header from "../components/Header";
import {useState} from 'react'
import {useAuth} from '../context/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from "yup"
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

export function SingUpPage() {
const {createUser} = useAuth()
const navigate = useNavigate()
const [userUp, setUserUp] = useState({
  username: "",
  email: "",
  password: "",
})

  return (
    <div>
      <Header />
      <Formik 
      initialValues={userUp}
      validationSchema={Yup.object({
        username: Yup.string().required("El Username Es Requerido"),
        email: Yup.string().required("El Email Es Requerido"),
        password: Yup.string().required("La Contraseña Es Requerido"),
      })}
      onSubmit={async(values, actionb)=>{
        await createUser(values)
        actionb.setSubmitting(false)
        navigate("/singin")
      }}
      enableReinitialize
      >
      {({handleSubmit, isSubmitting})=>(
        <Form onSubmit={handleSubmit}>
         <label className="label-username" htmlFor="username">
          Nombre de Usuario
         </label>
         <Field name="username" placeholder="Nombre de Usuario" className="input-username" />
        <ErrorMessage name="username" component="p" className="errormessage-username" />
        <label className="label-email-up" htmlFor="email">
          Email
         </label>
         <Field name="email" placeholder="Email" className="input-email-up" />
        <ErrorMessage name="email" component="p" className="errormessage-email-up" />
        <label className="label-password-up" htmlFor="password">
          Contraseña
         </label>
         <Field name="password" placeholder="Contraseña" className="input-password-up" />
        <ErrorMessage name="password" component="p" className="errormessage-password-up" />
        <button
        type="submit"
        className="button-singup"
        disabled={isSubmitting}
        >
        {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h5 w5" />
              ) : (
                "Crear Usuario"
              )}
        </button>
        </Form>
      )}
      </Formik>
    </div>
  );
}
