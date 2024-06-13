"use client";
import React, { useState, FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
interface Props {}

const page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

  const handleAcceptCookies = () => {
    setIsCookiePolicyOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        open={open}
        setOpen={setOpen}
        activateItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white leading-relaxed">
          Legal
        </h1>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white leading-relaxed">
            Política de Privacidad
          </h2>
          <ol className="list-decimal pl-6 text-black dark:text-white leading-relaxed">
            <li>
              <strong>
                Propósito de la Política de Privacidad y Protección de Datos
                Personales:
              </strong>
              <p>
                En Grupo Raíz, la protección de la privacidad y los datos
                personales de nuestros clientes es de suma importancia. Nos
                comprometemos a manejar y proteger los datos personales de
                manera adecuada y conforme a las leyes aplicables.
              </p>
            </li>
            <li>
              <strong>Definiciones Importantes:</strong>
              <p>
                - Datos personales: Información relacionada con personas
                naturales o jurídicas. - Datos sensibles: Información que revela
                detalles como origen étnico, opiniones políticas, entre otros. -
                Tratamiento de datos: Operaciones realizadas sobre datos
                personales.
              </p>
            </li>
            <li>
              <strong>Recopilación y Uso de Datos Personales:</strong>
              <p>
                En Grupo Raíz, recopilamos información mediante formularios y
                contratos, siempre respetando la normativa de protección de
                datos vigente en Perú.
              </p>
            </li>
            <li>
              <strong>Registro de Datos:</strong>
              <p>
                Cumplimos con los requisitos de registro ante la Autoridad
                Nacional de Protección de Datos Personales (ANPDP) en Perú.
              </p>
            </li>
            <li>
              <strong>Confidencialidad de los Datos:</strong>
              <p>
                En Grupo Raíz, mantenemos la confidencialidad de la información
                personal y no compartimos datos sin autorización, salvo lo
                establecido en nuestra política.
              </p>
            </li>
          </ol>
        </div>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white leading-relaxed">
            Términos de Uso
          </h2>
          <p className="text-lg text-black dark:text-white leading-relaxed">
            Al acceder y utilizar nuestros servicios en Grupo Raíz, aceptas los
            siguientes términos y condiciones:
          </p>
          <ol className="list-decimal pl-6 text-black dark:text-white leading-relaxed">
            <li>
              <strong>Propiedades y Servicios:</strong>
              <p>
                Ofrecemos servicios inmobiliarios diversos. Es esencial revisar
                detenidamente cada descripción para comprender claramente lo que
                proporcionamos.
              </p>
            </li>
            <li>
              <strong>Información de Propiedades y Pagos:</strong>
              <p>
                Los precios y detalles de nuestras propiedades están claramente
                indicados en nuestro sitio web. Los métodos de pago, políticas
                de compra y otros detalles se especifican en nuestras
                condiciones de venta.
              </p>
            </li>
            <li>
              <strong>Responsabilidades y Garantías:</strong>
              <p>
                Nuestros servicios inmobiliarios están respaldados por las
                garantías y responsabilidades detalladas en nuestras políticas.
              </p>
            </li>
            <li>
              <strong>Derechos de Propiedad Intelectual:</strong>
              <p>
                Todos los derechos de propiedad intelectual relacionados con
                nuestras propiedades están protegidos por la ley.
              </p>
            </li>
            <li>
              <strong>Terminación de Servicios:</strong>
              <p>
                Tienes el derecho de finalizar la relación con nosotros
                siguiendo nuestros procedimientos de terminación de servicios.
              </p>
            </li>
            <li>
              <strong>Legislación Aplicable:</strong>
              <p>
                Nuestros términos y condiciones se rigen por las leyes de la
                República del Perú.
              </p>
            </li>
            <li>
              <strong>Modificaciones a los Términos:</strong>
              <p>
                Nos reservamos el derecho de actualizar o modificar estos
                términos en cualquier momento. Las actualizaciones serán
                efectivas inmediatamente después de su publicación en nuestro
                sitio web.
              </p>
            </li>
          </ol>
        </div>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white leading-relaxed">
            Política de Cookies
          </h2>
          <p className="text-lg text-black dark:text-white leading-relaxed">
            En Grupo Raíz, utilizamos cookies para mejorar tu experiencia en
            nuestro sitio web. Las cookies son pequeños archivos de texto que se
            almacenan en tu dispositivo y nos permiten recordar tus preferencias
            y visitas anteriores. Al continuar utilizando nuestro sitio, aceptas
            nuestro uso de cookies.
          </p>
          <p className="text-sm italic mt-4 text-black dark:text-white leading-relaxed">
            Consulta nuestra{" "}
            <a
              href="#"
              onClick={() => setIsCookiePolicyOpen(true)}
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              política de cookies
            </a>{" "}
            para obtener más información.
          </p>
        </div>
      </div>

      {isCookiePolicyOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white leading-relaxed">
              Política de Cookies
            </h2>
            <p className="text-lg text-black dark:text-white leading-relaxed mb-4">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio
              web. Las cookies son pequeños archivos de texto que se almacenan
              en tu dispositivo y nos permiten recordar tus preferencias y
              visitas anteriores.
            </p>
            <p className="text-lg text-black dark:text-white leading-relaxed mb-4">
              Las cookies se utilizan para:
            </p>
            <ul className="list-disc pl-6 text-black dark:text-white leading-relaxed mb-4">
              <li>Recordar tus preferencias y configuraciones.</li>
              <li>Proporcionar contenido personalizado.</li>
              <li>Analizar el tráfico del sitio y el rendimiento.</li>
              <li>
                Facilitar la navegación y mejorar la experiencia del usuario.
              </li>
            </ul>
            <p className="text-lg text-black dark:text-white leading-relaxed mb-4">
              Al continuar utilizando nuestro sitio, aceptas nuestro uso de
              cookies.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleAcceptCookies}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default page;
