"use client";
import React, { useState, FC } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Properties from "./components/Route/Properties";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Route/Footer";
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Raiz app"
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
      <Hero />
      <Properties />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};
export default Page;
