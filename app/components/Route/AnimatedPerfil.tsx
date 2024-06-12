import React from "react";

// Array de personas con sus detalles
const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },

];

// Componente de vista previa del tooltip animado
export function AnimatedTooltipPreview() {
  return (
    <div className="relative flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center rounded-full"

      ></div>
      {/* Contenedor de las imágenes de perfil /}
      <div className="flex items-center justify-start gap-[-6px] overflow-hidden">
        {/ Imágenes de perfil */}
        {people.map((person) => (
          <img
            key={person.id} // Clave única para la iteración
            src={person.image} // Fuente de la imagen
            alt={person.name} // Texto alternativo para la imagen
            className="rounded-full w-12 h-12" // Clases para el estilo de la imagen
            style={{ marginLeft: "-6px", zIndex: 2 }} // Estilos personalizados
          />
        ))}
      </div>
  );
}