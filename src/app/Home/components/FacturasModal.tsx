'use client';

import { useState, useEffect, useCallback } from 'react';

interface FacturasModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId: string | null;
}

function FacturasModal({ isOpen, closeModal, projectId }: FacturasModalProps) {
  if (!isOpen) return null;
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [kwhCounter, setKwhCounter] = useState(23000);
  const [priceCounter, setPriceCounter] = useState(3500);
  const [demandCounter, setDemandCounter] = useState(760);
  const [showFullContent, setShowFullContent] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  // Mapeo de imágenes por proyecto
  const facturaImages: Record<string, string[]> = {
    dsv: ['/images/dsvfactura1.png', '/images/dsvfactura2.png'],
    // Puedes agregar más proyectos según necesites
  };

  const images = projectId && facturaImages[projectId] ? facturaImages[projectId] : [];
  
  // Datos de consumo por proyecto
  const projectData: Record<string, { 
    kwhBefore: number, 
    kwhAfter: number, 
    priceBefore: number, 
    priceAfter: number,
    demandBefore: number,
    demandAfter: number
  }> = {
    dsv: {
      kwhBefore: 23000,
      kwhAfter: 0,
      priceBefore: 3500,
      priceAfter: 0, // Cambiado a 0 para enfatizar el consumo cero
      demandBefore: 760,
      demandAfter: 534,
    },
    // Puedes agregar más proyectos aquí
  };
  
  const data = projectId && projectData[projectId] ? projectData[projectId] : 
    { kwhBefore: 0, kwhAfter: 0, priceBefore: 0, priceAfter: 0, demandBefore: 0, demandAfter: 0 };
  
  // Efecto para bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }
    
    // Limpiar y restaurar el scroll cuando se cierra
    return () => {
      if (isOpen) {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      // Mostrar primero la animación de entrada
      const timeout1 = setTimeout(() => {
        setShowComparison(true);
      }, 500);
      
      // Luego iniciar la animación de los contadores
      const timeout2 = setTimeout(() => {
        const kwhInterval = setInterval(() => {
          setKwhCounter(prev => {
            const newValue = prev - Math.ceil((data.kwhBefore - data.kwhAfter) / 50);
            if (newValue <= data.kwhAfter) {
              clearInterval(kwhInterval);
              return data.kwhAfter;
            }
            return newValue;
          });
        }, 40);
        
        const priceInterval = setInterval(() => {
          setPriceCounter(prev => {
            const newValue = prev - Math.ceil((data.priceBefore - data.priceAfter) / 50);
            if (newValue <= data.priceAfter) {
              clearInterval(priceInterval);
              return data.priceAfter;
            }
            return newValue;
          });
        }, 40);
        
        const demandInterval = setInterval(() => {
          setDemandCounter(prev => {
            const newValue = prev - Math.ceil((data.demandBefore - data.demandAfter) / 50);
            if (newValue <= data.demandAfter) {
              clearInterval(demandInterval);
              return data.demandAfter;
            }
            return newValue;
          });
        }, 40);
        
        return () => {
          clearInterval(kwhInterval);
          clearInterval(priceInterval);
          clearInterval(demandInterval);
        };
      }, 1000);
      
      // Mostrar el contenido completo después de terminar las animaciones
      const timeout3 = setTimeout(() => {
        setAnimationComplete(true);
        setShowFullContent(true);
      }, 3000);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    } else {
      // Resetear estados al cerrar
      setShowComparison(false);
      setAnimationComplete(false);
      setShowFullContent(false);
      setKwhCounter(data.kwhBefore);
      setPriceCounter(data.priceBefore);
      setDemandCounter(data.demandBefore);
      setEnlargedImage(null);
    }
  }, [isOpen, data.kwhBefore, data.kwhAfter, data.priceBefore, data.priceAfter, data.demandBefore, data.demandAfter]);

  // Función para formatear números con separador de miles
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Función para ampliar una imagen - con useCallback
  const handleImageClick = useCallback((imgSrc: string) => {
    setEnlargedImage(imgSrc);
  }, []);
  
  // Función para cerrar la imagen ampliada - con useCallback
  const closeEnlargedImage = useCallback(() => {
    setEnlargedImage(null);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl overflow-auto max-h-[90vh] shadow-2xl">
        <div className="bg-gradient-to-r from-solarmente-orange to-solarmente-orange/90 p-4 text-white flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-xl font-bold">Resultados de Ahorro Increíbles</h3>
          <button 
            onClick={closeModal}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Animación de transición inicial */}
          {!showComparison && (
            <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
              <div className="w-20 h-20 border-t-2 border-b-2 border-solarmente-orange rounded-full animate-spin mb-8"></div>
              <h3 className="text-2xl font-bold text-white mb-4">Calculando ahorros...</h3>
              <p className="text-gray-400 text-center max-w-lg">
                Estamos procesando los datos de antes y después para mostrarle los resultados impresionantes
              </p>
            </div>
          )}
          
          {showComparison && (
            <>
              {/* Tablero de comparación de energía */}
              <div className="mb-8 bg-black/50 p-6 rounded-xl border border-gray-800">
                <h4 className="text-xl font-bold text-white mb-6 text-center">Impacto en Consumo y Facturación</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Consumo de energía */}
                  <div className="relative">
                    <h5 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Consumo de Energía
                    </h5>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Antes:</span>
                      <span className="text-white font-bold">{formatNumber(data.kwhBefore)} kWh</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Ahora:</span>
                      <div className="flex items-baseline">
                        <span className={`text-2xl font-bold ${animationComplete ? 'text-green-400' : 'text-white'} transition-colors duration-500`}>
                          {formatNumber(kwhCounter)} kWh
                        </span>
                      </div>
                    </div>
                    
                    <div className="h-3 w-full bg-gray-700 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-1000 ease-out rounded-full"
                        style={{ 
                          width: `${100 - (kwhCounter / data.kwhBefore * 100)}%`,
                          transitionDelay: '0.5s'
                        }}
                      ></div>
                    </div>
                    
                    {animationComplete && (
                      <div className="mt-2 text-right">
                        <span className="text-green-400 font-bold">
                          {Math.round(100 - (data.kwhAfter / data.kwhBefore * 100))}% de reducción
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Facturación */}
                  <div className="relative">
                    <h5 className="text-lg font-semibold text-white mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Facturación Mensual
                    </h5>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Antes:</span>
                      <span className="text-white font-bold">${formatNumber(data.priceBefore)} <span className="text-xs text-gray-500">(promedio)</span></span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Ahora:</span>
                      <div className="flex items-baseline">
                        <span className={`text-2xl font-bold ${animationComplete ? 'text-green-400' : 'text-white'} transition-colors duration-500`}>
                          ${formatNumber(priceCounter)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="h-3 w-full bg-gray-700 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-1000 ease-out rounded-full"
                        style={{ 
                          width: `${100 - (priceCounter / data.priceBefore * 100)}%`,
                          transitionDelay: '0.75s'
                        }}
                      ></div>
                    </div>
                    
                    {animationComplete && (
                      <div className="mt-2 text-right">
                        <span className="text-green-400 font-bold">
                          {Math.round(100 - (data.priceAfter / data.priceBefore * 100))}% de ahorro
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Nueva sección: Demanda */}
                {animationComplete && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm7 1a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a1 1 0 01-2 0V7h-1a1 1 0 01-1-1V3zm-4 9a1 1 0 010 2H3a1 1 0 01-1-1v-3a1 1 0 011-1h1V9a1 1 0 012 0v1h1a1 1 0 010 2H6v1zm7-1a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-medium">Demanda:</span>
                      </div>
                      <div className="text-white">
                        <span className="text-gray-400 mr-2">Antes:</span>
                        <span className="text-white">${formatNumber(data.demandBefore)}</span>
                        <span className="mx-2">→</span>
                        <span className="text-gray-400 mr-2">Ahora:</span>
                        <span className="text-green-400 font-bold">${formatNumber(data.demandAfter)}</span>
                        <span className="ml-2 text-green-400 text-sm">
                          (-{Math.round(100 - (data.demandAfter / data.demandBefore * 100))}%)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {animationComplete && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-solarmente-orange/20 rounded-full text-solarmente-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ahorro anual estimado: <span className="font-bold ml-1">${formatNumber((data.priceBefore - data.priceAfter) * 12)}</span>
                    </div>
                    <div className="mt-3 text-green-400 text-sm font-bold">
                      Consumo reducido a 0kWh gracias a la instalación de los paneles solares
                    </div>
                  </div>
                )}
              </div>
              
              {/* Imágenes de facturas (aparecen después de la animación) */}
              {showFullContent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      ANTES de Energía Solar
                    </h4>
                    <div className="bg-black rounded-lg overflow-hidden border border-gray-800 h-80 flex items-center justify-center p-2 cursor-pointer hover:border-solarmente-orange transition-colors">
                      {images[0] ? (
                        <img 
                          src={images[0]} 
                          alt="Factura Antes"
                          onClick={() => handleImageClick(images[0])}
                          className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <p className="text-gray-500">Imagen no disponible</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 text-center">Haz clic en la imagen para ampliarla</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      DESPUÉS de Energía Solar
                    </h4>
                    <div className="bg-black rounded-lg overflow-hidden border border-gray-800 h-80 flex items-center justify-center p-2 cursor-pointer hover:border-solarmente-orange transition-colors">
                      {images[1] ? (
                        <img 
                          src={images[1]} 
                          alt="Factura Después"
                          onClick={() => handleImageClick(images[1])}
                          className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <p className="text-gray-500">Imagen no disponible</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 text-center">Haz clic en la imagen para ampliarla</p>
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="mt-8 text-center">
            <button 
              onClick={closeModal}
              className="orange-button py-3 px-8 text-white font-bold rounded-lg transition-all duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de imagen ampliada */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" 
          onClick={closeEnlargedImage}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors z-10"
              onClick={closeEnlargedImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={enlargedImage} 
              alt="Factura ampliada"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Envolver con memo para prevenir re-renders innecesarios
export default FacturasModal;
