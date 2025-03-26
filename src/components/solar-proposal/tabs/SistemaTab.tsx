import React from 'react';
import { ProposalData } from '../types';
import Image from 'next/image';

interface SistemaTabProps {
  data: ProposalData;
  isDarkMode: boolean;
}

const SistemaTab: React.FC<SistemaTabProps> = ({ data, isDarkMode }) => {
  // Estilos basados en el tema
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textMainColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textSecondaryColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const hoverEffect = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  
  return (
    <div className="animate-fadeIn">
      <h2 className={`text-xl font-bold ${textMainColor} mb-6 flex items-center gap-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-9l1-8z" />
        </svg>
        Detalles del Sistema Solar
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md mb-6 ${hoverEffect} transition-all duration-300`}>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-4 flex items-center gap-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Componentes
            </h3>
            
            <div className="space-y-6">
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Tamaño del Sistema</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xl font-bold ${textMainColor}`}>{data.sistema.tamano} kW</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {Math.round(data.financiero.porcentajeAhorro)}% de ahorro
                  </span>
                </div>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Paneles Solares</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    {data.sistema.paneles} x {data.sistema.tamanoPanel}W Monocristalinos
                  </p>
                  
                </div>
                <p className={`text-sm ${textSecondaryColor} mt-1`}>Marca LONGi o similar</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Garantía de 30 años</p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Inversores</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    {data.sistema.inversores} x Inversor{data.sistema.inversores > 1 ? 'es' : ''} SOLIS
                  </p>
                
                </div>
                <p className={`text-sm ${textSecondaryColor} mt-1`}>{data.sistema.detalle_inversores}</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Garantía de 10 años</p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Estructura de Montaje</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  Racking de Aluminio
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Incluye tornillería inoxidable y sellado a prueba de agua</p>
              </div>
            </div>
          </div>
          
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md ${hoverEffect} transition-all duration-300`}>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-4 flex items-center gap-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Espacio Requerido
            </h3>
            
            <div className="relative p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/30 flex items-center justify-between">
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Área Total</p>
                <p className={`text-3xl font-bold ${textMainColor}`}>{data.sistema.espacioTecho} m²</p>
                <p className={`text-sm ${textSecondaryColor} mt-1`}>
                  Equivalente aproximado: {Math.round(data.sistema.espacioTecho / 2)} paneles
                </p>
              </div>
              
              <div className="w-20 h-20 relative">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-500 opacity-70">
                  <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="2"/>
                  <line x1="30" y1="10" x2="30" y2="90" stroke="currentColor" strokeWidth="2"/>
                  <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2"/>
                  <line x1="70" y1="10" x2="70" y2="90" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md mb-6 ${hoverEffect} transition-all duration-300`}>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-4 flex items-center gap-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Producción Energética
            </h3>
            
            <div className="space-y-6">
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Producción Diaria Promedio</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {Math.round(data.produccion.promedioMensual / 30)} kWh
                </p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Producción Mensual Promedio</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.produccion.promedioMensual} kWh
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Varía según la radiación solar de cada mes</p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                <p className={`text-sm ${textSecondaryColor}`}>Producción Anual Estimada</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.produccion.anual.toLocaleString()} kWh
                </p>
              </div>
            </div>
          </div>
          
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md ${hoverEffect} transition-all duration-300`}>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-4 flex items-center gap-2`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Garantías
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                  <p className={`text-sm ${textSecondaryColor}`}>Garantía de Paneles</p>
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    30 años
                  </p>
                </div>
                
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                  <p className={`text-sm ${textSecondaryColor}`}>Garantía de Inversores</p>
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    10 años
                  </p>
                </div>
                
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                  <p className={`text-sm ${textSecondaryColor}`}>Garantía de Estructura</p>
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    15 años
                  </p>
                </div>
                
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg`}>
                  <p className={`text-sm ${textSecondaryColor}`}>Garantía de Instalación</p>
                  <p className={`text-xl font-bold ${textMainColor}`}>
                    1 año
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(por goteras)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-8 p-5 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl border ${isDarkMode ? 'border-blue-800/50' : 'border-blue-200'}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'} mb-2 flex items-center gap-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Información Importante
        </h3>
        <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-700'} text-sm mb-3`}>
          Esta propuesta incluye:
        </p>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'} text-sm space-y-1`}>
          <li>Estudios técnicos e ingeniería</li>
          <li>Componentes de alta calidad con garantías extendidas</li>
          <li>Instalación por técnicos certificados</li>
          <li>Trámites con la distribuidora eléctrica</li>
          <li>Soporte técnico post-instalación</li>
        </ul>
      </div>
    </div>
  );
};

export default SistemaTab;