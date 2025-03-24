'use client';

import { useState } from 'react';
import Link from 'next/link';

// Datos de proyectos destacados con información de empresa
const featuredProjects = [
  {
    id: "38",
    logo: "/images/dsv.jpg"
  },
  {
    id: "39",
    logo: "/images/play chitre.jpg"
  },
  {
    id: "36",
    logo: "/images/logo-panafarma-x2-1.png"
  },
  {
    id: "32",
    logo: "/images/panamamusic.jpg"
  },
  {
    id: "31",
    logo: "/images/reinadelmar.png"
  },
  // Posiciones 6 y 7 con logos actualizados
  {
    id: "19",
    logo: "/images/Panama-Maritime-International-Training-Center.png"
  },
  {
    id: "14",
    logo: "/images/sunsave.png"
  },
  // Posiciones 8 y 9 sin logos
  {
    id: "33",
    logo: null
  },
  {
    id: "17",
    logo: null
  }
];

export default function ProyectosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generar lista de imágenes prioritarias e IDs
  const priorityImageIds = featuredProjects.map(p => p.id);
  
  // Generar lista de imágenes restantes (1-40 excluyendo las prioritarias)
  const remainingImages = Array.from({length: 40}, (_, i) => ({
    id: (i+1).toString(),
    imagePath: `/images/${i+1}.jpg`
  })).filter(img => !priorityImageIds.includes(img.id));

  // Tamaño fijo para las imágenes en 3 columnas
  const imageSize = 350;

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-solarmente-title mb-8">Nuestros Proyectos</h1>
        
        {/* Proyectos destacados con hover effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer aspect-[1/1] mx-auto"
              onMouseEnter={() => project.logo ? setHoveredIndex(index) : null}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(`/images/${project.id}.jpg`)}
              style={{ height: `${imageSize}px`, width: `${imageSize}px` }}
            >
              <div className="relative h-full w-full"> 
                {/* Imagen principal del proyecto */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    hoveredIndex === index && project.logo ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <img 
                    src={`/images/${project.id}.jpg`} 
                    alt={`Proyecto ${project.id}`}
                    className="absolute w-full h-full object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.parentElement?.parentElement?.classList.add('hidden');
                    }}
                  />
                </div>
                
                {/* Logo de la empresa (se muestra al hacer hover) - Solo si hay logo */}
                {project.logo && (
                  <div 
                    className={`absolute inset-0 bg-white p-6 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={project.logo} 
                      alt={`Logo ${project.id}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Imágenes restantes (sin efecto hover) */}
          {remainingImages.map((img, index) => (
            <div 
              key={`regular-${index}`} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer aspect-[1/1] mx-auto"
              onClick={() => setSelectedImage(img.imagePath)}
              style={{ height: `${imageSize}px`, width: `${imageSize}px` }}
            >
              <div className="relative h-full w-full">
                <img 
                  src={img.imagePath} 
                  alt={`Proyecto Solar ${img.id}`} 
                  className="absolute w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  onError={(e) => {
                    // Si la imagen no existe, ocultamos la tarjeta
                    const target = e.target as HTMLImageElement;
                    target.parentElement?.parentElement?.classList.add('hidden');
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
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
        
        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-6 text-solarmente-title">¿Te gustaría tener un proyecto como estos?</h2>
          <Link 
            href="/propuesta" 
            className="inline-block bg-solarmente-button hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </main>
  );
}
