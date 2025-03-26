import React from 'react';
import { ProposalData } from '../types';

interface FinancieroTabProps {
  data: ProposalData;
  isDarkMode?: boolean;
}

const FinancieroTab: React.FC<FinancieroTabProps> = ({ data, isDarkMode = false }) => {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Análisis Financiero
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`${cardBg} rounded-xl border-2 ${highlightBorder} shadow-lg ${hoverEffect} transition-all duration-300`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${textMainColor}`}>Ahorros</h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Beneficio Económico
              </span>
            </div>
            
            <div className={`p-4 ${highlightBg} rounded-lg mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-medium ${textMainColor}`}>Ahorro Mensual Estimado</span>
                <span className={`text-2xl font-bold text-green-600`}>
                  ${data.financiero.ahorroMensual}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-medium ${textMainColor}`}>Ahorro Anual</span>
                <span className={`text-2xl font-bold text-green-600`}>
                  ${data.financiero.ahorroAnual}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${textMainColor}`}>Ahorro a 30 Años</span>
                <span className={`text-2xl font-bold text-green-600`}>
                  ${data.financiero.ahorro30Anos.toLocaleString()}
                </span>
              </div>
            </div>
            
            <h4 className={`text-md font-semibold ${textMainColor} mb-3`}>Comparativo de Costos</h4>
            
            <div className="space-y-6 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg border ${borderColor}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Costo Actual Mensual</span>
                  <span className={`text-xl font-bold text-red-600`}>
                    ${Math.round(data.cliente.consumo * 0.26)}
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Basado en tu consumo actual y tarifa promedio
                </p>
              </div>
              
              <div className={`p-4 ${sectionBg} rounded-lg border ${borderColor}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Nuevo Costo Mensual</span>
                  <span className={`text-xl font-bold text-green-600`}>
                    $0
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Con autoproducción completa de energía solar
                </p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-lg border ${isDarkMode ? 'border-green-800/30' : 'border-green-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'} font-medium`}>Ahorro Total Mensual</span>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    ${data.financiero.ahorroMensual}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-green-300' : 'text-green-500'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className={`text-xs ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                    Este ahorro aumentará con los incrementos futuros en la tarifa eléctrica
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${cardBg} rounded-xl border ${borderColor} shadow-md ${hoverEffect} transition-all duration-300`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${textMainColor}`}>Valor del Sistema</h3>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Inversión Inteligente
              </span>
            </div>
            
            <div className={`p-4 ${sectionBg} rounded-lg mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm font-medium ${textMainColor}`}>Inversión Total (Plan 1)</span>
                <span className={`text-2xl font-bold ${textMainColor}`}>
                  ${data.precios.plan1.total.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm ${textSecondaryColor}`}>Costo por Watt (Plan 1)</span>
                <span className={`text-lg font-medium ${textMainColor}`}>
                  ${data.precios.plan1.precioWatt}
                </span>
              </div>
              
              <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-sm font-medium ${textMainColor}`}>Inversión Total (Plan 2)</span>
                  <span className={`text-2xl font-bold ${textMainColor}`}>
                    ${data.precios.plan2.total.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${textSecondaryColor}`}>Costo por Watt (Plan 2)</span>
                  <span className={`text-lg font-medium ${textMainColor}`}>
                    ${data.precios.plan2.precioWatt}
                  </span>
                </div>
              </div>
            </div>
            
            <h4 className={`text-md font-semibold ${textMainColor} mb-3`}>Retorno de Inversión</h4>
            
            <div className="space-y-6 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg border ${borderColor}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Tiempo de Recuperación</span>
                  <span className={`text-xl font-bold ${textMainColor}`}>
                    {data.sistema.roi} años
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Período en el que recuperas tu inversión con los ahorros generados
                </p>
              </div>
              
              <div className={`p-4 ${sectionBg} rounded-lg border ${borderColor}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${textSecondaryColor}`}>Vida Útil del Sistema</span>
                  <span className={`text-xl font-bold ${textMainColor}`}>
                    30+ años
                  </span>
                </div>
                <p className={`text-xs ${textSecondaryColor}`}>
                  Garantía de 25 años en paneles y componentes principales
                </p>
              </div>
              
              <div className={`p-4 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg border ${isDarkMode ? 'border-blue-800/30' : 'border-blue-200'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'} font-medium`}>Aumento Valor de Propiedad</span>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    ${Math.round(data.precios.plan1.total * 0.6).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Estimado del incremento en el valor de tu propiedad con energía solar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-8 p-5 ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl border ${isDarkMode ? 'border-green-800/30' : 'border-green-200'}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-800'} mb-2 flex items-center gap-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Beneficios Financieros Clave
        </h3>
        <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm mb-3`}>
          Tu inversión solar te proporciona:
        </p>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm mb-4 space-y-1`}>
          <li>Ahorro anual de ${data.financiero.ahorroAnual.toLocaleString()} en facturas de electricidad</li>
          <li>Retorno completo de inversión en {data.sistema.roi} años</li>
          <li>Más de ${Math.round(data.financiero.ahorro30Anos - data.precios.plan1.total).toLocaleString()} de ganancia neta a lo largo de 30 años</li>
          <li>Protección contra futuros aumentos en la tarifa eléctrica</li>
          <li>Incremento del valor de tu propiedad en aproximadamente ${Math.round(data.precios.plan1.total * 0.6).toLocaleString()}</li>
        </ul>
        <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm`}>
          Este análisis muestra que el sistema solar no solo es ecológicamente responsable, sino también una inversión financiera sólida.
        </p>
      </div>
      

    </div>
  );
};

export default FinancieroTab;