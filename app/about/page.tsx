"use client";
import React, { useState, FC } from "react";
import Image from "next/image";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../utils/Footer";

const textStyle: React.CSSProperties = {
  padding: "20px",
  color: "white",
};

const cardContainerStyle: React.CSSProperties = {
  perspective: "1000px",
  margin: "1rem",
  display: "flex", 
  justifyContent: "space-around", 
};

const cardStyles: React.CSSProperties = {
  width: "300px",
  height: "300px",
  position: "relative",
  borderRadius: "20px",
  textAlign: "center",
  transition: "transform 2s",
  transformStyle: "preserve-3d",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
  backgroundColor: "#333",
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
  const overlayText = ["¿Por qué?", "¿Cómo?", "¿Qué hacemos?"][index];

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
        <div style={overlayTextStyle}>{overlayText}</div>
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

interface Props {}

const Page: FC<Props> = (props) => {
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

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ margin: "0 0 2rem", color: "white" }}>
          NUESTROS PROPÓSITOS
        </h2>
        <div style={cardContainerStyle}>
          <Card
            index={0}
            imageSrc="/assets/about.jpeg"
            text="Grupo Raíz se compromete con el progreso de Huánuco, impulsando
                proyectos de habilitación urbana que mejoran la calidad de vida
                y profesionalizan el mercado inmobiliario
              "
          />
          <Card
            index={1}
            imageSrc="/assets/image.jpg"
            text="Implementamos proyectos de habilitación urbana con un equipo ético
              y calificado, asegurando la calidad y sostenibilidad de cada
              desarrollo."
          />
          <Card
            index={2}
            imageSrc="/assets/about3.jpeg"
            text=" Realizamos la transformación y urbanización de terrenos, creando
              comunidades planeadas y accesibles en Huánuco, con todos los
              servicios necesarios para el crecimiento sostenible"
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "calc(100vh - 4rem)",
          margin: "90px",
        }}
      >
        <div style={{ flex: 1, position: "relative", height: "100%" }}>
          <Image
            style={{ ...imageContainerStyle }}
            src="/assets/image.jpg"
            alt="Cityscape"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            maxHeight: "600px",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginLeft: "-50px",
            zIndex: 2,
            transition: "box-shadow 0.3s ease",
            cursor: "pointer",
            
          }}
        >
          <p>
            Grupo Raíz fue fundada en el año 000 por xxx con el objetivo de
            proporcionar servicios inmobiliarios de alta calidad en la región.
            Comenzamos como una pequeña agencia local en la ciudad de Huánuco y
            Arequipa, Perú, enfocada en brindar un servicio personalizado y
            centrado en las necesidades individuales de cada cliente. A lo largo
            de los años, hemos crecido y nos hemos consolidado como una de las
            principales empresas inmobiliarias de la zona, gracias a nuestro
            compromiso con la excelencia, la integridad y la satisfacción del
            cliente, ofreciendo un servicio profesional y confiable que los
            acompaña en cada paso del proceso de compra o venta de propiedades.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;
