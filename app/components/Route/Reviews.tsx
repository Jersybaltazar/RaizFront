import React from "react";
import { styles } from "@/app/styles/style";

// Genera el estilo de la animación
const slideDownAnimation = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .text-slide-down {
    display: inline-block;
    animation: slideDown 1s ease-out forwards;
  }
`;

const Reviews = () => {
  // Función para dividir el texto en palabras y agregar retraso a cada palabra
  const getAnimatedWords = (text: string, baseDelay = 0.5) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className="text-slide-down"
        style={{ animationDelay: `${baseDelay + index * 0.2}s` }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <div className="relative overflow-hidden w-full h-[500px]">
      <style>{slideDownAnimation}</style>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 text-white p-4 md:p-8 lg:p-16">
        <h3 className={`${styles.title} text-[30px] md:text-[40px] lg:text-[50px] font-bold`}>
          {getAnimatedWords("Un Equipo Apasionado por Hacer Realidad")}
          <br />
          {getAnimatedWords("tus Sueños Inmobiliarios")}
        </h3>
        <br />
        <p className={`${styles.label} text-[16px] md:text-[20px] italic mx-4 md:mx-8 lg:mx-16`}>
          {getAnimatedWords("Somos tu equipo, tu guía en el camino hacia el hogar perfecto. ¡Bienvenido a nuestra familia!")}
        </p>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/equipo.png"
          alt="business"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Reviews;