'use client';

import { useState, useEffect, useCallback } from 'react';

interface FacturasModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId: string | null;
}

function FacturasModal({ isOpen, closeModal, projectId }: FacturasModalProps) {
  // Mover todos los hooks al nivel superior (antes de cualquier condicional)
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
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;
    let kwhInterval: NodeJS.Timeout;
    let priceInterval: NodeJS.Timeout;
    let demandInterval: NodeJS.Timeout;
    
    if (isOpen) {
      // Mostrar primero la animación de entrada
      timeout1 = setTimeout(() => {
        setShowComparison(true);
      }, 500);
      
      // Luego iniciar la animación de los contadores
      timeout2 = setTimeout(() => {
        kwhInterval = setInterval(() => {
          setKwhCounter(prev => {
            const newValue = prev - Math.ceil((data.kwhBefore - data.kwhAfter) / 50);
            if (newValue <= data.kwhAfter) {
              clearInterval(kwhInterval);
              return data.kwhAfter;
            }
            return newValue;
          });
        }, 40);
        
        priceInterval = setInterval(() => {
          setPriceCounter(prev => {
            const newValue = prev - Math.ceil((data.priceBefore - data.priceAfter) / 50);
            if (newValue <= data.priceAfter) {
              clearInterval(priceInterval);
              return data.priceAfter;
            }
            return newValue;
          });
        }, 40);
        
        demandInterval = setInterval(() => {
          setDemandCounter(prev => {
            const newValue = prev - Math.ceil((data.demandBefore - data.demandAfter) / 50);
            if (newValue <= data.demandAfter) {
              clearInterval(demandInterval);
              return data.demandAfter;
            }
            return newValue;
          });
        }, 40);
      }, 1000);
      
      // Mostrar el contenido completo después de terminar las animaciones
      timeout3 = setTimeout(() => {
        setAnimationComplete(true);
        setShowFullContent(true);
      }, 3000);
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
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearInterval(kwhInterval);
      clearInterval(priceInterval);
      clearInterval(demandInterval);
    };
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

  // Aquí movemos la condicional después de todos los hooks
  if (!isOpen) return null;

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
        
        {/* El resto del contenido se mantiene igual */}
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
                  
                  {/* Resto del contenido (omitido por brevedad) */}
                  {/* ... */}
                </div>
                
                {/* ... Resto del código ... */}
              </div>
              
              {/* ... Resto del código ... */}
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

export default FacturasModal;