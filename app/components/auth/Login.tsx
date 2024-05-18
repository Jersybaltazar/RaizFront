"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import {toast} from "react-hot-toast";
import { signIn } from "next-auth/react";



type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean)=> void;
};

const schema = Yup.object().shape({  
  email: Yup.string()
    .email("Correo Electronico no valido")
    .required("Por favor infrese su correo"),
  password: Yup.string().required("Por favor ingrese su contraseña").min(6),
}); 


const Login: FC<Props> = ({ setRoute , setOpen}) => {
  const [show, setShow] = useState(false);
  const [login,{isSuccess,error}] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({email, password});
    },
  });
  useEffect(()=>{
    if (isSuccess) {
      toast.success("Acceso Correcto");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
      }
    }
  },[isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Incia Sesion en Raiz</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Ingresa tu correo Electronico
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="ejemplo@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block ">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Ingrese su contraseña
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="contaseña!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block ">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Iniciar Sesion" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          O registrese con
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" 
          onClick={()=> signIn("google")}/>
          <AiFillGithub size={30} className="cursor-pointer ml-2"
          onClick={()=> signIn("github")} />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          ¿ No tienes una cuenta ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Registrate
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
