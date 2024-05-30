"use client";
import React, { useState, FC } from "react";
import Image from "next/image";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../utils/Footer";
import Reviews from "../components/Route/Reviews";
import { styles } from "@/app/styles/style";

import Properties from "../components/Route/Properties";

const textStyle: React.CSSProperties = {
  padding: "20px",
  color: "white",
};

const cardContainerStyle: React.CSSProperties = {
  perspective: "1500px", 
  margin: "1rem",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

const cardStyles: React.CSSProperties = {
  width: "100%",
  maxWidth: "320px", 
  height: "400px", 
  position: "relative",
  borderRadius: "20px",
  textAlign: "center",
  transition: "transform 1s", 
  transformStyle: "preserve-3d",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  marginBottom: "1rem",
};

const cardContentStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "10px",
};

const cardFrontStyle: React.CSSProperties = {
  ...cardContentStyle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#b7c9e5",
  borderRadius: "20px",
};

const cardBackStyle: React.CSSProperties = {
  ...cardContentStyle,
  backgroundColor: "#ab0303",
  color: "#b7c9e5",
  transform: "rotateY(180deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageContainerStyle: React.CSSProperties = {
  borderRadius: "20px",
  overflow: "hidden",
};

const overlayTextStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  padding: "10px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  zIndex: 10,
};

interface CardProps {
  index: number;
  imageSrc: string;
  text: string;
}

const Card: FC<CardProps> = ({ index, imageSrc, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const overlayText = ["¿Por qué?", "¿Cómo?", "¿Qué hacemos?"][index];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        ...cardStyles,
        transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={cardFrontStyle}>
        {/* <div style={overlayTextStyle}>{overlayText}</div> */}
        <Image
          style={{ ...imageContainerStyle }}
          src={imageSrc}
          alt="Ciudad"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div style={cardBackStyle}>
        <p style={textStyle}>{text}</p>
      </div>
    </div>
  );
};

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Raiz app"
        description="En esta plataforma de bienes y raices encontraras el terreno de tus sueños para que vivas tus sueños."
        Keywords="Departamentos, Casas, Terrenos"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activateItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Reviews />

      <Properties />
      {/* <Cont /> */}

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3 className={`${styles.title} 800px:!text-[40px]`}>
          <span className="text-gradient">NUESTRO PROPOSITO </span>
          {""}
        </h3>
        <div style={cardContainerStyle}>
          <Card
            index={0}
            imageSrc="/assets/porque.png"
            text="Grupo Raíz se compromete con el progreso de Huánuco, impulsando proyectos de habilitación urbana que mejoran la calidad de vida y profesionalizan el mercado inmobiliario"
          />
          <Card
            index={1}
            imageSrc="/assets/como.png"
            text="Implementamos proyectos de habilitación urbana con un equipo ético y calificado, asegurando la calidad y sostenibilidad de cada desarrollo."
          />
          <Card
            index={2}
            imageSrc="/assets/hacemos.png"
            text=" Realizamos la transformación y urbanización de terrenos, creando comunidades planeadas y accesibles en Huánuco, con todos los servicios necesarios para el crecimiento sostenible"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
