'use client';

import { useState } from 'react';
import Link from 'next/link';

// Combinar todos los proyectos en una sola lista
const allProjects = [
  {
    id: "38",
    logo: "/images/dsv.jpg",
    title: "Proyecto Comercial - DSV",
    capacity: "218.36 kW"
  },
  {
    id: "39",
    logo: "/images/play chitre.jpg",
    title: "Play Chitre",
    capacity: "85.65 kW"
  },
  {
    id: "36",
    logo: "/images/logo-panafarma-x2-1.png",
    title: "Panafarma",
    capacity: "58.44 kW"
  },
  {
    id: "32",
    logo: "/images/panamamusic.jpg",
    title: "Panama Music",
    capacity: "42.12 kW"
  },
  {
    id: "31",
    logo: "/images/reinadelmar.png",
    title: "Restaurante - Reina del Mar",
    capacity: "36.80 kW"
  },
  {
    id: "19",
    logo: "/images/Panama-Maritime-International-Training-Center.png",
    title: "Panama Maritime International",
    capacity: "48.75 kW"
  },
  {
    id: "14",
    logo: "/images/sunsave.png",
    title: "Sunsave",
    capacity: "35.20 kW"
  },
  {
    id: "33",
    logo: null,
    title: "Casa - The Grove",
    capacity: "15.40 kW"
  },
  {
    id: "17",
    logo: null,
    title: "Casa",
    capacity: "16.80 kW"
  },
  {
    id: "1",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "18",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "6",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "11",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "12",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "13",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "30",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "34",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "35",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "37",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "40",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "41",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "42",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "43",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "44",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "45",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  },
  {
    id: "46",
    logo: null,
    title: "Casa",
    capacity: "Sistema solar 0kWh"
  }
];

// Generar proyectos adicionales con valores fijos (no aleatorios)
const additionalProjects = [
  // Proyectos residenciales
  { id: "2", title: "Casa - Costa del Este", capacity: "10.20 kW" },
  { id: "3", title: "Casa - Panama Pacifico", capacity: "8.75 kW" },
  { id: "4", title: "Casa", capacity: "12.40 kW" },
  { id: "5", title: "Casas - Costa del Este", capacity: "" },
  { id: "7", title: "Casa - Colon", capacity: "11.80 kW" },
  { id: "8", title: "Casa - Colon", capacity: "15.20 kW" },
  { id: "9", title: "Casa - Costa Sur", capacity: "16.40 kW" },
  { id: "10", title: "Casa - Colon", capacity: "14.60 kW" },
  { id: "20", title: "Comercial - Costa Del Este", capacity: "45.30 kW" },
  { id: "21", title: "Comercial - Vía España", capacity: "53.20 kW" },
  { id: "22", title: "Comercial - Transistmica", capacity: "38.90 kW" },
  { id: "23", title: "Comercial - Tocumen", capacity: "65.40 kW" },
  { id: "24", title: "Comercial - David", capacity: "42.70 kW" },
  { id: "25", title: "Casa - Colon", capacity: "86.50 kW" },
  { id: "26", title: "Casa - Panama Pacifico", capacity: "75.20 kW" },
  { id: "27", title: "Comercial - Penonomé", capacity: "49.80 kW" },
  { id: "28", title: "Casa - Costa del Este", capacity: "51.30 kW" },
  { id: "29", title: "Comercio - Autonitro", capacity: "94.60 kW" }
].map(project => ({
  ...project,
  logo: null
}));

// Filtra para excluir proyectos que ya están en allProjects
const filteredAdditional = additionalProjects.filter(
  ap => !allProjects.some(p => p.id === ap.id)
);

// Combinar todos los proyectos
const combinedProjects = [...allProjects, ...filteredAdditional];

export default function ProyectosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <main className="min-h-screen bg-black text-white font-['Mulish',sans-serif]">
      {/* Hero Section con fondo animado */}
      <div className="relative py-20 flex flex-col items-center justify-center overflow-hidden border-b border-gray-900">
        {/* Fondo con grid pattern similar al panel solar */}
        <div className="absolute inset-0 bg-black">
          {/* Grid Pattern - Panel Solar */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(30, 30, 40, 0.9) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(30, 30, 40, 0.9) 1px, transparent 1px),
              linear-gradient(rgba(20, 80, 120, 0.1) 1px, transparent 2px),
              linear-gradient(90deg, rgba(20, 80, 120, 0.1) 1px, transparent 2px)
            `,
            backgroundSize: '200px 300px, 200px 300px, 40px 60px, 40px 60px',
            backgroundPosition: '0 0, 0 0, -1px -1px, -1px -1px',
            opacity: 0.7
          }}></div>
          
          {/* Efecto reflejo panel solar */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 70% 20%, rgba(40, 80, 120, 0.2) 0%, transparent 70%)',
            opacity: 0.7
          }}></div>

          {/* Animated Lines */}
          <div className="moving-line-h line-h1"></div>
          <div className="moving-line-h line-h2"></div>
          <div className="moving-line-v line-v1"></div>
          <div className="moving-line-v line-v2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-block bg-black bg-opacity-50 backdrop-blur-md px-4 py-1 rounded-full border border-solarmente-orange/20">
              <span className="text-sm text-white flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-solarmente-orange rounded-full animate-pulse-custom"></span>
                Energía solar para hogares y empresas
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Nuestros <span className="text-solarmente-orange">Proyectos</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Más de 280 instalaciones residenciales y comerciales respaldan nuestra experiencia.
              Conoce algunos de nuestros proyectos destacados.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Proyectos con estilo oscuro */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="bg-gray-900 text-solarmente-orange text-sm px-4 py-1 rounded-full border border-gray-800">PROYECTOS DESTACADOS</span>
            <h2 className="text-3xl font-bold text-center mt-4 mb-2 relative">
              <span className="text-white">Clientes que</span> <span className="text-solarmente-orange">Confían en Nosotros</span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-solarmente-orange"></span>
            </h2>
          </div>
          
          {/* Todos los proyectos con el mismo diseño */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {combinedProjects.map((project, index) => (
              !imageErrors[project.id] && (
                <div 
                  key={index}
                  className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col"
                  onClick={() => setSelectedImage(`/images/${project.id}.jpg`)}
                >
                  <div className="h-56 overflow-hidden relative">
                    {/* Imagen principal del proyecto */}
                    <div 
                      className={`h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center ${
                        hoveredIndex === index && project.logo ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ 
                        backgroundImage: project.id === "6" ? 
                          `url('/images/${project.id}.webp')` : 
                          project.id >= "41" && project.id <= "45" ? 
                            `url('/images/${project.id}.png')` : 
                            `url('/images/${project.id}.jpg')` 
                      }}
                      onMouseEnter={() => project.logo ? setHoveredIndex(index) : null}
                      onMouseLeave={() => setHoveredIndex(null)}
                    ></div>
                    
                    {/* Usa una imagen real con manejador de errores */}
                    <img
                      src={
                        project.id === "6" ? 
                          `/images/${project.id}.webp` : 
                          project.id >= "41" && project.id <= "45" ? 
                            `/images/${project.id}.png` : 
                            `/images/${project.id}.jpg`
                      }
                      alt=""
                      className="hidden"
                      onError={() => handleImageError(project.id)}
                    />
                    
                    {/* Logo overlay que ocupa todo el cuadro - Solo si hay logo */}
                    {project.logo && (
                      <div 
                        className={`absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 ${
                          hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <img 
                          src={project.logo} 
                          alt={`Logo ${project.title}`}
                          className="max-w-[80%] max-h-[80%] object-contain"
                          onError={() => {
                            const updatedProject = {...project};
                            updatedProject.logo = null;
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      {project.capacity && (
                        <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">
                          {project.capacity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
      
      {/* Modal para ver imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt="Proyecto ampliado" 
              className="max-h-[90vh] max-w-full object-contain"
              onError={() => setSelectedImage(null)}
            />
            <button 
              className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <section className="py-20 bg-black relative overflow-hidden border-t border-gray-900">
        <div className="absolute inset-0">
          <div className="moving-line-h line-h1"></div>
          <div className="moving-line-h line-h2"></div>
          <div className="moving-line-v line-v1"></div>
          <div className="moving-line-v line-v2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Listo para <span className="text-solarmente-orange">Cambiar</span> a Energía Solar <span className="text-solarmente-orange">Inteligente</span>?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Solicita una cotización personalizada generada por IA y descubre cuánto puedes ahorrar con energía solar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link 
                href="/propuesta"
                className="group flex-1 orange-button py-4 px-6 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Cotizar Ahora</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </Link>
              
              <Link 
                href="/contacto" 
                className="flex-1 bg-transparent hover:bg-white/5 text-white font-bold py-4 px-6 border-2 border-gray-800 hover:border-solarmente-orange/70 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Contactar</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
