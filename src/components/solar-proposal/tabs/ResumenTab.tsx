import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ProposalData } from '../types';
import Image from 'next/image';

interface ResumenTabProps {
  data: ProposalData;
  isDarkMode: boolean;
}

const ResumenTab: React.FC<ResumenTabProps> = ({ data, isDarkMode }) => {
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  // Colores basados en el tema
  const textColor = isDarkMode ? '#FFFFFF' : '#323131';
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tooltipBgColor = isDarkMode ? '#2D3748' : '#FFFFFF';
  const tooltipTextColor = isDarkMode ? '#FFFFFF' : '#060100';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textMainColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textSecondaryColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Generación kWh',
        data: data.produccion.mensual,
        backgroundColor: '#FF371E',
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: 'kWh',
          color: textColor,
        },
        ticks: {
          color: textColor,
        }
      },
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: textColor
        }
      },
      tooltip: {
        backgroundColor: tooltipBgColor,
        titleColor: tooltipTextColor,
        bodyColor: tooltipTextColor,
        borderColor: gridColor,
        borderWidth: 1,
      }
    },
  };

  return (
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className={`text-xl font-bold ${textMainColor} mb-4 flex items-center gap-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Resumen del Sistema
          </h2>
          
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Consumo Mensual</p>
                <p className={`text-2xl font-bold ${textMainColor}`}>{data.cliente.consumo} kWh</p>
              </div>
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Tamaño del Sistema</p>
                <p className={`text-2xl font-bold ${textMainColor}`}>{data.sistema.tamano} kW</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Paneles Solares</p>
                <p className={`text-2xl font-bold ${textMainColor}`}>{data.sistema.paneles}</p>
              </div>
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Espacio Requerido</p>
                <p className={`text-2xl font-bold ${textMainColor}`}>{data.sistema.espacioTecho} m²</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Ahorro Mensual</p>
                <p className={`text-2xl font-bold text-green-500`}>${data.financiero.ahorroMensual}</p>
              </div>
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Retorno de Inversión</p>
                <p className={`text-2xl font-bold ${textMainColor}`}>{data.sistema.roi} años</p>
              </div>
            </div>

            <div className={`border-t ${borderColor} pt-4 mt-2`}>
              <p className={`text-sm ${textSecondaryColor}`}>Reducción de Factura</p>
              <p className={`text-2xl font-bold ${textMainColor}`}>
                {data.financiero.porcentajeAhorro}%
              </p>
              {data.financiero.excedente > 0 && (
                <p className="text-sm text-green-500">
                  Con {data.financiero.excedente}% de excedente
                </p>
              )}
            </div>
          </div>
          
          <h2 className={`text-xl font-bold ${textMainColor} mt-8 mb-4 flex items-center gap-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Impacto Ambiental
          </h2>
          
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Reducción de CO₂</p>
                <p className="text-2xl font-bold text-green-500">{data.ambiental.co2Reducido} toneladas</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Anual</p>
              </div>
              <div>
                <p className={`text-sm ${textSecondaryColor}`}>Petróleo Evitado</p>
                <p className="text-2xl font-bold text-green-500">{data.ambiental.petroleoReducido} galones</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Anual</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className={`text-xl font-bold ${textMainColor} mb-4 flex items-center gap-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-solarmente-button" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Generación Mensual Estimada
          </h2>
          
          <div className={`${cardBg} rounded-xl p-5 border ${borderColor} shadow-md hover:shadow-lg transition-shadow duration-300 h-80`}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          <div className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3 border ${borderColor} mt-2 mb-4`}>
            <p className={`text-sm ${textSecondaryColor}`}>
              Esta gráfica muestra la producción energética estimada mes a mes. La variación se debe a los diferentes niveles de radiación solar a lo largo del año. El cálculo del tamaño del sistema está basado en 4.2 horas pico de sol al día, garantizando un ahorro confiable durante todo el año.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className={`${cardBg} rounded-xl p-5 border ${borderColor} flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300`}>
              <p className={`text-sm ${textSecondaryColor} mb-1`}>Producción Anual</p>
              <p className={`text-3xl font-bold ${textMainColor} mb-1`}>
                {data.produccion.anual.toLocaleString()} kWh
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.financiero.porcentajeAhorro}% de tu consumo</p>
            </div>
            
            <div className={`${cardBg} rounded-xl p-5 border ${borderColor} flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300`}>
              <p className={`text-sm ${textSecondaryColor} mb-1`}>Ahorro a 30 Años</p>
              <p className="text-3xl font-bold text-green-500 mb-1">
                ${data.financiero.ahorro30Anos.toLocaleString()}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estimado en base a precios actuales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenTab;