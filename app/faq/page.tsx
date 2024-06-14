"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import FAQ from "../components/Route/FAQ";
interface Props {}

const Page = (props:Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  return (
    <div>
        <Heading
          title="Preguntas y Respuestas - Raiz"
          description="En esta plataforma de bienes y raices encontraras el terreno de tus sueños para que
       vivas tus sueños "
          Keywords="Departamentos, Casas, Terrenos"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activateItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <FAQ />
      <Footer/>
    </div>
  );
};
export default Page;
