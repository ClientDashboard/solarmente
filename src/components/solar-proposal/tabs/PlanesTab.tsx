import React from 'react';
import { ProposalData } from '../types';

interface PlanesTabProps {
  data: ProposalData;
  isDarkMode: boolean;
}

const PlanesTab: React.FC<PlanesTabProps> = ({ data, isDarkMode }) => {
  // Estilos basados en el tema
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textMainColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textSecondaryColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const hoverEffect = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const sectionBg = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50';
  const highlightBg = isDarkMode ? 'bg-solarmente-button/20' : 'bg-solarmente-button/10';
  const highlightBorder = isDarkMode ? 'border-solarmente-button/30' : 'border-solarmente-button/20';

  return (
    <div className="animate-fadeIn">
      <h2 className={`text-xl font-bold ${textMainColor} mb-6 flex items-center gap-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Planes de Pago
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${cardBg} rounded-xl border-2 ${highlightBorder} shadow-lg ${hoverEffect} transition-all duration-300`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${textMainColor}`}>Plan 1</h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Mejor Precio
              </span>
            </div>
            
            <p className={`text-sm ${textSecondaryColor} mb-4`}>
              Mejor precio con pago distribuido durante la instalación
            </p>
            
            <div className="mb-6 flex justify-between items-baseline">
              <span className={`text-3xl font-bold ${textMainColor}`}>
                ${data.precios.plan1.total.toLocaleString()}
              </span>
              <span className={`text-sm ${textSecondaryColor}`}>
                Precio total
              </span>
            </div>
            
            <div className={`p-4 ${highlightBg} rounded-lg mb-6`}>
              <div className="flex justify-between mb-2">
                <span className={`text-sm font-medium ${textMainColor}`}>Sistema</span>
                <span className={`text-sm font-medium ${textMainColor}`}>${data.precios.plan1.sistema.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${textSecondaryColor}`}>Instalación</span>
                <span className={`text-sm ${textSecondaryColor}`}>${data.precios.plan1.instalacion.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${textSecondaryColor}`}>Planos y Trámites</span>
                <span className={`text-sm ${textSecondaryColor}`}>${data.precios.plan1.tramites.toLocaleString()}</span>
              </div>
              <div className={`pt-2 mt-2 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} flex justify-between font-semibold`}>
                <span className={`text-sm ${textMainColor}`}>Total</span>
                <span className={`text-sm ${textMainColor}`}>${data.precios.plan1.total.toLocaleString()}</span>
              </div>
            </div>
            
            <h4 className={`text-md font-semibold ${textMainColor} mb-3`}>Etapas de Pago</h4>
            
            <div className="space-y-6 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>1er Abono (Inicio)</span>
                  <span className={`text-sm font-medium ${textMainColor}`}>
                    ${data.precios.plan1.abono1.toLocaleString()} (60%)
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Al recibir el primer abono y firma del contrato iniciamos la instalación del sistema solar en máximo 10 días hábiles y los trámites correspondientes.
                </p>
              </div>
              
              <div className={`p-4 ${sectionBg} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>2do Abono (Entrega materiales)</span>
                  <span className={`text-sm font-medium ${textMainColor}`}>
                    ${data.precios.plan1.abono2.toLocaleString()} (30%)
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  El segundo abono se cancela al terminar la instalación de todos los equipos y dejar el sistema funcionando con inyección cero para obtener ahorro mientras se realizan los trámites.
                </p>
              </div>
              
              <div className={`p-4 ${sectionBg} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>3er Abono (Finalización)</span>
                  <span className={`text-sm font-medium ${textMainColor}`}>
                    ${data.precios.plan1.abono3.toLocaleString()} (10%)
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  El tercer y último abono se cancela al tener el nuevo medidor bidireccional instalado por la compañía eléctrica.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%201%20para%20mi%20sistema%20solar%20de%20${data.sistema.tamano}kW.`}
                target="_blank"
                rel="noopener noreferrer" 
                className="block w-full bg-solarmente-button hover:bg-opacity-90 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Consultar Plan 1
              </a>
            </div>
          </div>
        </div>
        
        <div className={`${cardBg} rounded-xl border ${borderColor} shadow-md ${hoverEffect} transition-all duration-300`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${textMainColor}`}>Plan 2</h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Financiamiento
              </span>
            </div>
            
            <p className={`text-sm ${textSecondaryColor} mb-4`}>
              Pago inicial más pequeño con financiamiento a 6 meses
            </p>
            
            <div className="mb-6 flex justify-between items-baseline">
              <span className={`text-3xl font-bold ${textMainColor}`}>
                ${data.precios.plan2.total.toLocaleString()}
              </span>
              <span className={`text-sm ${textSecondaryColor}`}>
                Precio total
              </span>
            </div>
            
            <div className={`p-4 ${sectionBg} rounded-lg mb-6`}>
              <div className="flex justify-between mb-2">
                <span className={`text-sm font-medium ${textMainColor}`}>Sistema</span>
                <span className={`text-sm font-medium ${textMainColor}`}>${data.precios.plan2.sistema.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${textSecondaryColor}`}>Instalación</span>
                <span className={`text-sm ${textSecondaryColor}`}>${data.precios.plan2.instalacion.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${textSecondaryColor}`}>Planos y Trámites</span>
                <span className={`text-sm ${textSecondaryColor}`}>${data.precios.plan2.tramites.toLocaleString()}</span>
              </div>
              <div className={`pt-2 mt-2 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} flex justify-between font-semibold`}>
                <span className={`text-sm ${textMainColor}`}>Total</span>
                <span className={`text-sm ${textMainColor}`}>${data.precios.plan2.total.toLocaleString()}</span>
              </div>
            </div>
            
            <h4 className={`text-md font-semibold ${textMainColor} mb-3`}>Plan de Financiamiento</h4>
            
            <div className="space-y-6 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Abono Inicial (70%)</span>
                  <span className={`text-sm font-medium ${textMainColor}`}>
                    ${data.precios.plan2.abonoInicial.toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Al recibir el abono inicial iniciamos la instalación del sistema solar en máximo 10 días hábiles y los trámites correspondientes.
                </p>
              </div>
              
              <div className={`p-4 ${sectionBg} rounded-lg border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Saldo a Financiar (30%)</span>
                  <span className={`text-sm font-medium ${textMainColor}`}>
                    ${data.precios.plan2.saldoPendiente.toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  El saldo pendiente se paga en 6 cuotas mensuales. La primera cuota se paga al terminar la instalación del sistema.
                </p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg border ${isDarkMode ? 'border-blue-800/30' : 'border-blue-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>Cuota Mensual (6 meses)</span>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    ${data.precios.plan2.cuotaMensual.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Sin intereses, financiamiento directo con SolarMente
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%202%20con%20financiamiento%20para%20mi%20sistema%20solar%20de%20${data.sistema.tamano}kW.`}
                target="_blank"
                rel="noopener noreferrer" 
                className="block w-full border border-solarmente-button text-solarmente-button hover:bg-solarmente-button hover:text-white text-center font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Consultar Plan 2
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-8 p-5 ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl border ${isDarkMode ? 'border-green-800/30' : 'border-green-200'}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-800'} mb-2 flex items-center gap-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          El momento es ahora
        </h3>
        <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm mb-3`}>
          Recuerda que este sistema solar:
        </p>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm mb-4 space-y-1`}>
          <li>Te ahorrará ${data.financiero.ahorroAnual.toLocaleString()} cada año en facturas de electricidad</li>
          <li>Protegerá tu hogar de los aumentos en las tarifas eléctricas</li>
          <li>Aumentará el valor de tu propiedad</li>
          <li>Reducirá tu huella de carbono</li>
        </ul>
        <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm`}>
          Contacta a nuestro equipo hoy mismo para iniciar tu proyecto solar.
        </p>
      </div>
    </div>
  );
};

export default PlanesTab;