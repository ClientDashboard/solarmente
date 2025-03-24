// ResumenTab.tsx
// Componente para la pestaña de Resumen

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ProposalData } from '../types';
import Image from 'next/image';

interface ResumenTabProps {
  data: ProposalData;
}

const ResumenTab: React.FC<ResumenTabProps> = ({ data }) => {
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

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
        title: {
          display: true,
          text: 'kWh',
          color: '#323131',
        },
        ticks: {
          color: '#323131',
        }
      },
      x: {
        ticks: {
          color: '#323131',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#060100',
        bodyColor: '#323131',
        borderColor: '#EEEEEE',
        borderWidth: 1,
      }
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-solarmente-title mb-4">Resumen del Sistema</h2>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Consumo Mensual</p>
                <p className="text-2xl font-bold text-solarmente-title">{data.cliente.consumo} kWh</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tamaño del Sistema</p>
                <p className="text-2xl font-bold text-solarmente-title">{data.sistema.tamano} kW</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Paneles Solares</p>
                <p className="text-2xl font-bold text-solarmente-title">{data.sistema.paneles}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Espacio Requerido</p>
                <p className="text-2xl font-bold text-solarmente-title">{data.sistema.espacioTecho} m²</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Ahorro Mensual</p>
                <p className="text-2xl font-bold text-solarmente-title">${data.financiero.ahorroMensual}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Retorno de Inversión</p>
                <p className="text-2xl font-bold text-solarmente-title">{data.sistema.roi} años</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-2">
              <p className="text-sm text-gray-500">Reducción de Factura</p>
              <p className="text-2xl font-bold text-solarmente-title">
                {data.financiero.porcentajeAhorro}%
              </p>
              {data.financiero.excedente > 0 && (
                <p className="text-sm text-green-600">
                  Con {data.financiero.excedente}% de excedente
                </p>
              )}
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-solarmente-title mt-8 mb-4">Impacto Ambiental</h2>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Reducción de CO₂</p>
                <p className="text-2xl font-bold text-green-600">{data.ambiental.co2Reducido} toneladas</p>
                <p className="text-xs text-gray-400">Anual</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Petróleo Evitado</p>
                <p className="text-2xl font-bold text-green-600">{data.ambiental.petroleoReducido} galones</p>
                <p className="text-xs text-gray-400">Anual</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-solarmente-title mb-4">Generación Mensual Estimada</h2>
          <div className="bg-white rounded-lg p-5 border border-gray-200 h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mt-2 mb-4">
            <p className="text-sm text-gray-600">
              Esta gráfica muestra la producción energética estimada mes a mes. La variación se debe a los diferentes niveles de radiación solar a lo largo del año. El cálculo está basado en 4.2 horas pico de sol al día, garantizando un ahorro confiable durante todo el año.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-1">Producción Anual</p>
              <p className="text-3xl font-bold text-solarmente-title mb-1">
                {data.produccion.anual.toLocaleString()} kWh
              </p>
              <p className="text-xs text-gray-400">{data.financiero.porcentajeAhorro}% de tu consumo</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-1">Ahorro a 30 Años</p>
              <p className="text-3xl font-bold text-solarmente-title mb-1">
                ${data.financiero.ahorro30Anos.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Estimado en base a precios actuales</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-lg mb-4">
          ¿Listo para dar el siguiente paso hacia la energía solar?
        </p>
        <a 
          href={`https://wa.me/50765657575?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(data.cliente.nombre)}%20y%20acabo%20de%20generar%20una%20propuesta%20en%20su%20sitio%20web.%20Me%20gustaría%20más%20información.`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Contáctanos por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ResumenTab;