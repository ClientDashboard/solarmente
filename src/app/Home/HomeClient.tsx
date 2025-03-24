'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './globals.css'; // Cambiado a globals.css que debería contener todo

// Crea componentes para los iconos que necesitamos
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Definición de interfaces para tipos
interface FacturasModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId: string | null;
}

// Componente Modal para mostrar las facturas con animación de ahorro
const FacturasModal: React.FC<FacturasModalProps> = ({ isOpen, closeModal, projectId }) => {
  if (!isOpen) return null;
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [kwhCounter, setKwhCounter] = useState(23000);
  const [priceCounter, setPriceCounter] = useState(3500);
  const [showFullContent, setShowFullContent] = useState(false);
  
  // Mapeo de imágenes por proyecto
  const facturaImages: Record<string, string[]> = {
    dsv: ['/images/dsvfactura1.png', '/images/dsvfactura2.png'],
    // Puedes agregar más proyectos según necesites
  };

  const images = projectId && facturaImages[projectId] ? facturaImages[projectId] : [];
  
  // Datos de consumo por proyecto
  const projectData: Record<string, { kwhBefore: number, kwhAfter: number, priceBefore: number, priceAfter: number }> = {
    dsv: {
      kwhBefore: 23000,
      kwhAfter: 0,
      priceBefore: 3500,
      priceAfter: 500,
    },
    // Puedes agregar más proyectos aquí
  };
  
  const data = projectId && projectData[projectId] ? projectData[projectId] : 
    { kwhBefore: 0, kwhAfter: 0, priceBefore: 0, priceAfter: 0 };
  
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
        
        return () => {
          clearInterval(kwhInterval);
          clearInterval(priceInterval);
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
    }
  }, [isOpen, data.kwhBefore, data.kwhAfter, data.priceBefore, data.priceAfter]);

  // Función para formatear números con separador de miles
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-solarmente-orange to-solarmente-orange/90 p-4 text-white flex justify-between items-center">
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
                      <span className="text-white font-bold">${formatNumber(data.priceBefore)}</span>
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
                
                {animationComplete && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-solarmente-orange/20 rounded-full text-solarmente-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ahorro anual estimado: <span className="font-bold ml-1">${formatNumber((data.priceBefore - data.priceAfter) * 12)}</span>
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
                    <div className="bg-black rounded-lg overflow-hidden border border-gray-800 h-80 flex items-center justify-center p-2">
                      {images[0] ? (
                        <img 
                          src={images[0]} 
                          alt="Factura Antes" 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <p className="text-gray-500">Imagen no disponible</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      DESPUÉS de Energía Solar
                    </h4>
                    <div className="bg-black rounded-lg overflow-hidden border border-gray-800 h-80 flex items-center justify-center p-2">
                      {images[1] ? (
                        <img 
                          src={images[1]} 
                          alt="Factura Después" 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <p className="text-gray-500">Imagen no disponible</p>
                      )}
                    </div>
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
    </div>
  );
};

export default function HomeClient() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [showAIDemo, setShowAIDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const targetCount = 280; // Número de instalaciones
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Efecto para la animación inicial
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Iniciar contador cuando estamos en la vista correcta
    const counterInterval = setInterval(() => {
      setCount(prev => {
        const increment = Math.ceil(targetCount / 30);
        const newValue = prev + increment;
        if (newValue >= targetCount) {
          clearInterval(counterInterval);
          return targetCount;
        }
        return newValue;
      });
    }, 80);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearInterval(counterInterval);
    };
  }, []);

  const toggleAIDemo = () => {
    setShowAIDemo(!showAIDemo);
    setDemoStep(1);
  };

  const advanceDemo = () => {
    if (demoStep < 3) {
      setDemoStep(demoStep + 1);
    } else {
      setShowAIDemo(false);
    }
  };
  
  const openModal = (projectId: string) => {
    setCurrentProject(projectId);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  // Función para dar formato al número con comas para miles
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div ref={mainRef} className="overflow-x-hidden bg-black text-white font-[Mulish,sans-serif]">
      {/* Hero Section con fondo animado */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
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
          <div className="moving-line-h line-h3"></div>
          <div className="moving-line-v line-v1"></div>
          <div className="moving-line-v line-v2"></div>
          <div className="moving-line-v line-v3"></div>
        </div>
        
        <div className={`relative z-10 container mx-auto px-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="text-center max-w-4xl mx-auto hero-content">
            <div className="mb-6 inline-block bg-black bg-opacity-50 backdrop-blur-md px-4 py-1 rounded-full border border-solarmente-orange/20">
              <span className="text-sm text-white flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-solarmente-orange rounded-full animate-pulse-custom"></span>
                Primera empresa solar en Panamá con IA
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-2 tracking-tight">
              Solar<span className="text-solarmente-orange">Mente</span>
              <span className="text-solarmente-orange font-light">.AI</span>
            </h1>
            
            {/* Logo con texto "Por:" */}
            <div className="flex items-center justify-center mb-6">
              <span className="text-gray-400 mr-2">Por:</span>
              <div className="h-10 w-auto relative">
                <img src="/images/LOGO SOLAR.svg" alt="Logo SolarMente" className="h-full object-contain" />
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl mb-6 font-light">
              Cambiando la forma de <span className="relative">
                <span className="relative z-10 text-solarmente-orange font-medium">cotizar, comprar e instalar</span>
                <span className="absolute bottom-0 left-1 h-2 w-full bg-solarmente-orange/20 z-0"></span>
              </span> paneles solares
            </h2>
            
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
              Ahorra hasta un 100% en tu factura eléctrica con energía limpia y renovable.
              <span className="block mt-2">Obtén propuestas personalizadas en tiempo real generadas por IA.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-16">
              <Link 
                href="/propuesta"
                className="group flex-1 orange-button py-4 px-6 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Cotizador IA</span>
                <ZapIcon />
              </Link>
              
              <Link 
                href="/proyectos" 
                className="flex-1 bg-transparent hover:bg-white/5 text-white font-bold py-4 px-6 border-2 border-gray-700 hover:border-solarmente-orange/70 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Ver Proyectos</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          
          {/* Stats flotantes */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-xl p-5 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-solarmente-orange/5">
              <h3 className="text-2xl md:text-3xl font-bold text-white">30s</h3>
              <p className="text-xs md:text-sm text-gray-400">Propuesta IA</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-xl p-5 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-solarmente-orange/5">
              <h3 className="text-2xl md:text-3xl font-bold text-white">100%</h3>
              <p className="text-xs md:text-sm text-gray-400">Ahorro Posible</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-xl p-5 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-solarmente-orange/5">
              <h3 className="text-2xl md:text-3xl font-bold text-white">{formatNumber(count)}+</h3>
              <p className="text-xs md:text-sm text-gray-400">Instalaciones</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-10 h-10 flex items-center justify-center text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* IA Cotizador Demo Modal */}
      {showAIDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-gradient-to-r from-solarmente-orange to-solarmente-orange/90 p-4 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ZapIcon />
                Cotizador SolarMente.AI
              </h3>
              <button 
                onClick={toggleAIDemo}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {demoStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h4 className="text-lg font-semibold text-white">Ingresa tus datos de consumo:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Consumo mensual (kWh)</label>
                      <input type="text" defaultValue="850" className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-solarmente-orange focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Factura mensual ($)</label>
                      <input type="text" defaultValue="220" className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-solarmente-orange focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de techo</label>
                      <select className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-solarmente-orange focus:border-transparent transition-all">
                        <option>Techo metálico</option>
                        <option>Techo de concreto</option>
                        <option>Techo de tejas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Ubicación</label>
                      <select className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-solarmente-orange focus:border-transparent transition-all">
                        <option>Ciudad de Panamá</option>
                        <option>Colón</option>
                        <option>David</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {demoStep === 2 && (
                <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                  <div className="text-center">
                    <div className="w-16 h-16 border-t-2 border-b-2 border-solarmente-orange rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-white mb-2">Analizando datos...</h3>
                    <p className="text-gray-400">
                      Nuestra IA está procesando tu información para crear una propuesta personalizada
                    </p>
                    <div className="w-full max-w-xs h-2 bg-gray-800 rounded-full mt-6 mx-auto overflow-hidden">
                      <div className="h-full bg-solarmente-orange animate-pulse w-2/3"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {demoStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-gray-800/50 border border-green-800/30 rounded-lg p-4 flex items-start">
                    <div className="bg-green-800/20 rounded-full p-1 mr-3">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-400">¡Propuesta lista!</h4>
                      <p className="text-sm text-gray-400">Generada en 28 segundos por SolarMente.AI</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-white mb-4">Sistema recomendado para ti:</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900/80 p-3 rounded border border-gray-700">
                        <span className="text-sm text-gray-400">Capacidad del sistema</span>
                        <p className="text-lg font-bold text-solarmente-orange">5.7 kW</p>
                      </div>
                      <div className="bg-gray-900/80 p-3 rounded border border-gray-700">
                        <span className="text-sm text-gray-400">Paneles solares</span>
                        <p className="text-lg font-bold text-solarmente-orange">14 x 410W</p>
                      </div>
                      <div className="bg-gray-900/80 p-3 rounded border border-gray-700">
                        <span className="text-sm text-gray-400">Inversor</span>
                        <p className="text-lg font-bold text-solarmente-orange">6kW Fronius</p>
                      </div>
                      <div className="bg-gray-900/80 p-3 rounded border border-gray-700">
                        <span className="text-sm text-gray-400">Ahorro mensual estimado</span>
                        <p className="text-lg font-bold text-green-500">$185</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="font-medium text-white mb-2">Inversión total:</h5>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-solarmente-orange">$8,500</span>
                        <span className="text-sm text-gray-400 ml-2">o desde $157/mes financiado</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={advanceDemo}
                  className="orange-button py-3 px-8 text-white font-bold rounded-lg transition-all duration-300 flex items-center"
                >
                  {demoStep === 3 ? 'Cerrar' : demoStep === 2 ? 'Ver Resultados' : 'Continuar'}
                  {demoStep !== 2 && <ArrowRightIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sección de Ahorro Garantizado con estilos oscuros */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="bg-gray-900 text-solarmente-orange text-sm px-4 py-1 rounded-full border border-gray-800">BENEFICIOS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-2 relative">
              <span className="text-white">AHORRO</span> <span className="text-solarmente-orange">GARANTIZADO</span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-solarmente-orange"></span>
            </h2>
            
            <p className="text-center text-gray-400 max-w-2xl mt-6">
              Instala energía solar en tu hogar o negocio y comienza a ahorrar desde el primer día con tecnología inteligente que optimiza tu consumo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-gray-900/40 rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:border-solarmente-orange/30 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-solarmente-orange to-solarmente-orange rounded-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Hasta 100% de Ahorro</h3>
              <p className="text-gray-400">Reduce drásticamente o elimina por completo tu factura eléctrica con nuestros sistemas solares personalizados por IA.</p>
            </div>
            
            <div className="group bg-gray-900/40 rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:border-solarmente-orange/30 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-solarmente-orange to-solarmente-orange rounded-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <BarChartIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Retorno de Inversión Rápido</h3>
              <p className="text-gray-400">Recupera tu inversión en 2-3 años mientras disfrutas de energía gratuita por décadas. Monitorea en tiempo real.</p>
            </div>
            
            <div className="group bg-gray-900/40 rounded-xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:border-solarmente-orange/30 flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-solarmente-orange to-solarmente-orange rounded-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Garantía Completa</h3>
              <p className="text-gray-400">Paneles con 30 años y 10 años en inversores. Incluye mantenimiento preventivo y soporte técnico 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de IA estilo oscuro */}
      <section className="py-20 bg-black relative overflow-hidden border-t border-gray-900">
        {/* Fondo con líneas animadas */}
        <div className="absolute inset-0">
          <div className="moving-line-h line-h1"></div>
          <div className="moving-line-h line-h2"></div>
          <div className="moving-line-v line-v1"></div>
          <div className="moving-line-v line-v2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-gray-900 text-solarmente-orange text-sm px-4 py-1 rounded-full border border-gray-800 mb-4">TECNOLOGÍA EXCLUSIVA</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Revolucionando la Energía Solar con <br/><span className="text-solarmente-orange">Inteligencia Artificial</span></h2>
              <p className="text-xl text-gray-400">Primera empresa en Panamá en integrar IA para diseñar sistemas solares personalizados en segundos</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 order-2 md:order-1 border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-white">Tu sistema solar, diseñado por IA</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="text-solarmente-orange flex-shrink-0 mt-0.5 mr-3">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Propuestas en 30 segundos</h4>
                      <p className="text-gray-400">No más esperas de días para recibir una cotización</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-solarmente-orange flex-shrink-0 mt-0.5 mr-3">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Diseño optimizado por IA</h4>
                      <p className="text-gray-400">Maximiza la eficiencia según tu consumo y espacio disponible</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-solarmente-orange flex-shrink-0 mt-0.5 mr-3">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Predicción de ahorro precisa</h4>
                      <p className="text-gray-400">Basada en tu historial de consumo y datos climáticos locales</p>
                    </div>
                  </li>
                </ul>
                
                <Link
                  href="/propuesta"
                  className="mt-8 orange-button py-3 px-6 text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ZapIcon />
                  <span>Probar Cotizador IA</span>
                </Link>
              </div>
              
              <div className="relative md:order-2">
                <div className="bg-black rounded-xl border border-gray-800 shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-300">
                  {/* Usamos div con background-image en lugar de Image para simplificar */}
                  <div 
                    className="w-full h-64 md:h-80 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/ai-dashboard.jpg')" }}
                  ></div>
                  
                  {/* Overlay with code-like elements */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col justify-end p-4">
                    <div className="text-solarmente-orange text-xs opacity-80 font-mono">
                      <div>{">> initializing AI solar analysis"}</div>
                      <div>{">> calculating optimal panel placement"}</div>
                      <div>{">> estimating ROI and savings..."}</div>
                      <div className="text-green-400">{">> proposal ready: 28.4 seconds"}</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-solarmente-orange text-white font-bold px-4 py-2 rounded-lg shadow-lg transform rotate-6 animate-pulse-custom">
                  ¡En tiempo real!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Proyectos con estilo oscuro */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="bg-gray-900 text-solarmente-orange text-sm px-4 py-1 rounded-full border border-gray-800">EXPERIENCIA COMPROBADA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-2 relative">
              <span className="text-white">Nuestros</span> <span className="text-solarmente-orange">Proyectos</span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-solarmente-orange"></span>
            </h2>
            
            <p className="text-center text-gray-400 max-w-2xl mt-6">
              Más de {formatNumber(count)} instalaciones residenciales y comerciales respaldan nuestra experiencia.
              Conoce algunos de nuestros proyectos destacados.
            </p>
          </div>
          
          {/* Proyecto carrusel horizontal */}
          <div className="flex space-x-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {/* Proyecto 1 - DSV */}
<div className="flex-shrink-0 w-80 snap-center" id="dsv-project">
  <div className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col">
    <div className="h-56 overflow-hidden relative">
      {/* Imagen principal del proyecto */}
      <div 
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/38.jpg')" }}
      ></div>
      
      {/* Logo overlay que ocupa todo el cuadro */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <img 
          src="/images/dsv.jpg" 
          alt="DSV Logo" 
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">Proyecto Comercial - DSV</h3>
        <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">218.36 kW</span>
      </div>
      
      {/* Descripción alineada con altura fija */}
      <div className="h-16 mb-4">
        <p className="text-sm text-gray-400">367 paneles solares de última generación con sistema de monitoreo en tiempo real.</p>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Ahorro mensual:</span>
          <span className="font-bold text-green-500">$4,500</span>
        </div>
        <button 
          onClick={() => openModal('dsv')}
          className="w-full text-solarmente-orange hover:text-white inline-flex items-center justify-center text-sm font-medium py-2 border border-solarmente-orange/30 rounded-lg hover:bg-solarmente-orange transition-all duration-300"
        >
          Ver resultados de ahorro
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
            
            {/* Proyecto 2 */}
            <div className="flex-shrink-0 w-80 snap-center">
              <div className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <div 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/2.jpg')" }}
                  ></div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">Casa - Costa del Este</h3>
                    <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">15.34 kW</span>
                  </div>
                  
                  {/* Descripción alineada con altura fija */}
                  <div className="h-16 mb-4">
                    <p className="text-sm text-gray-400">26 paneles con sistema de batería de respaldo para cortes eléctricos.</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-500">Ahorro mensual:</span>
                      <span className="font-bold text-green-500">$450</span>
                    </div>
                    <button 
                      className="w-full text-solarmente-orange hover:text-solarmente-orange/80 inline-flex items-center justify-center text-sm font-medium py-2 border border-solarmente-orange/30 rounded-lg hover:bg-solarmente-orange/10 transition-colors"
                    >
                      Ver resultados de ahorro
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proyecto 3 */}
            <div className="flex-shrink-0 w-80 snap-center">
              <div className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <div 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/33.jpg')" }}
                  ></div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">Casa - Santa Maria</h3>
                    <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">16.40 kW</span>
                  </div>
                  
                  {/* Descripción alineada con altura fija */}
                  <div className="h-16 mb-4">
                    <p className="text-sm text-gray-400">40 paneles solares con sistema de monitoreo inteligente vía app móvil.</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-500">Ahorro mensual:</span>
                      <span className="font-bold text-green-500">$500</span>
                    </div>
                    <button 
                      className="w-full text-solarmente-orange hover:text-solarmente-orange/80 inline-flex items-center justify-center text-sm font-medium py-2 border border-solarmente-orange/30 rounded-lg hover:bg-solarmente-orange/10 transition-colors"
                    >
                      Ver resultados de ahorro
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proyecto 4 */}
            <div className="flex-shrink-0 w-80 snap-center">
              <div className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <div 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/37.jpg')" }}
                  ></div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">Casa - Costa del Este</h3>
                    <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">23.60 kW</span>
                  </div>
                  
                  {/* Descripción alineada con altura fija */}
                  <div className="h-16 mb-4">
                    <p className="text-sm text-gray-400">40 paneles solares con sistema híbrido y 3 baterías de litio.</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-500">Ahorro mensual:</span>
                      <span className="font-bold text-green-500">$750</span>
                    </div>
                    <button 
                      className="w-full text-solarmente-orange hover:text-solarmente-orange/80 inline-flex items-center justify-center text-sm font-medium py-2 border border-solarmente-orange/30 rounded-lg hover:bg-solarmente-orange/10 transition-colors"
                    >
                      Ver resultados de ahorro
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/proyectos" 
              className="inline-block orange-button py-3 px-8 rounded-lg shadow-lg transition-colors group flex items-center justify-center"
            >
              <span>Ver Todos los Proyectos</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Modal para mostrar facturas */}
        <FacturasModal
          isOpen={modalOpen}
          closeModal={closeModal}
          projectId={currentProject}
        />
      </section>

      {/* Call to Action Mejorado con estilo oscuro */}
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
                <ZapIcon />
              </Link>
              
              <Link 
                href="/contacto" 
                className="flex-1 bg-transparent hover:bg-white/5 text-white font-bold py-4 px-6 border-2 border-gray-800 hover:border-solarmente-orange/70 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Contactar</span>
                <ArrowRightIcon />
              </Link>
            </div>
            
            <div className="mt-8 text-gray-400 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <span className="flex items-center text-sm">
                <div className="text-solarmente-orange mr-1">
                  <CheckCircleIcon />
                </div>
                Propuesta en 30 segundos
              </span>
              <span className="flex items-center text-sm">
                <div className="text-solarmente-orange mr-1">
                  <CheckCircleIcon />
                </div>
                Instalación en 7-10 días
              </span>
              <span className="flex items-center text-sm">
                <div className="text-solarmente-orange mr-1">
                  <CheckCircleIcon />
                </div>
                Garantía de 30 años
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Estilos CSS inline para animaciones específicas que no están en animations.css */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}