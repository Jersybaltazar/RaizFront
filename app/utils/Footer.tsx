import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Sobre Nosotros</h3>
            <p className="text-sm">Somos una empresa líder en el sector inmobiliario, dedicada a ofrecer las mejores soluciones para tus necesidades de vivienda.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Servicios</h3>
            <ul className="space-y-2">
              <li>Venta de propiedades</li>
              <li>Venta de lotes</li>
              <li>Alquiler de propiedades</li>
              <li>Asesoramiento inmobiliario</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contacto</h3>
            <p>Dirección: 123 Calle Principal, Ciudad</p>
            <p>Teléfono: +123 456 7890</p>
            <p>Email: info@inmobiliaria.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Síguenos</h3>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-4 items-center">
                <a href="#" aria-label="Facebook" className="transition-colors duration-300 hover:text-blue-500 transform hover:scale-150 relative" onMouseEnter={() => setHoveredIcon('Facebook')} onMouseLeave={() => setHoveredIcon(null)}>
                  <FaFacebookF className="text-2xl" />
                  {hoveredIcon === 'Facebook' && (
                    <span className="tooltip bg-blue-500 text-white p-1 text-sm rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2 ">Facebook</span>
                  )}
                </a>
                <a href="#" aria-label="Twitter" className="transition-colors duration-300 hover:text-blue-400 transform hover:scale-150 relative" onMouseEnter={() => setHoveredIcon('Twitter')} onMouseLeave={() => setHoveredIcon(null)}>
                  <FaTwitter className="text-2xl" />
                  {hoveredIcon === 'Twitter' && (
                    <span className="tooltip bg-blue-400 text-white p-1 text-sm rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2">Twitter</span>
                  )}
                </a>
                <a href="#" aria-label="Instagram" className="transition-colors duration-300 hover:text-pink-500 transform hover:scale-150 relative" onMouseEnter={() => setHoveredIcon('Instagram')} onMouseLeave={() => setHoveredIcon(null)}>
                  <FaInstagram className="text-2xl" />
                  {hoveredIcon === 'Instagram' && (
                    <span className="tooltip bg-pink-500 text-white p-1 text-sm rounded-lg  absolute top-8 left-1/2 transform -translate-x-1/2 ">Instagram</span>
                  )}
                </a>
                <a href="#" aria-label='Github' className="transition-colors duration-300 hover:text-gray-800 transform hover:scale-150 relative" onMouseEnter={() => setHoveredIcon('Github')} onMouseLeave={() => setHoveredIcon(null)}>
                  <FaGithub className='text-2xl'/>
                  {hoveredIcon === 'Github' && (
                    <span className="tooltip bg-gray-800 text-white p-1 text-sm rounded-lg  absolute top-8 left-1/2 transform -translate-x-1/2 ">Github</span>
                  )}
                </a>
                <a href="#" aria-label='Youtube' className="transition-colors duration-300 hover:text-red-500 transform hover:scale-150 relative" onMouseEnter={() => setHoveredIcon('Youtube')} onMouseLeave={() => setHoveredIcon(null)}>
                  <FaYoutube className='text-2xl'/>
                  {hoveredIcon === 'Youtube' && (
                    <span className="tooltip bg-red-500 text-white p-1 text-sm rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2 ">Youtube</span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 py-4 text-center">
        <p className="text-xs">© {new Date().getFullYear()} Grupo Raíz. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
