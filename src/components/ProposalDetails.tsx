'use client';

import { useState } from 'react';

interface ClientData {
  nombre: string;
  telefono: string;
  email: string;
  consumo: number;
}

interface ProposalData {
  cliente: ClientData;
  // We'll add more calculated fields here once we know the formulas
}

interface ProposalDetailsProps {
  data: ProposalData;
}

export default function ProposalDetails({ data }: ProposalDetailsProps) {
  const [activeTab, setActiveTab] = useState('resumen');
  
  // We'll need the formulas to calculate these values
  const calculatedValues = {
    // These are placeholder values
    ahorroMensual: calculateSavings(data.cliente.consumo),
    capacidadSistema: calculateSystemSize(data.cliente.consumo),
    numeroPaneles: calculateNumberOfPanels(data.cliente.consumo),
    inversionTotal: calculateTotalInvestment(data.cliente.consumo),
    retornoInversion: calculateROI(data.cliente.consumo),
  };
  
  // Placeholder calculation functions - we'll replace these with the actual formulas
  function calculateSavings(consumo: number): number {
    // Example formula: $0.05 savings per kWh
    return consumo * 0.05;
  }
  
  function calculateSystemSize(consumo: number): number {
    // Example formula: 1kW system for every 4000 kWh annual consumption
    // Assuming monthly consumption, multiply by 12 for annual
    return Math.ceil((consumo * 12) / 4000);
  }
  
  function calculateNumberOfPanels(consumo: number): number {
    // Example formula: Each panel is 400W, so system size in W / 400W per panel
    const systemSizeW = calculateSystemSize(consumo) * 1000; // Convert kW to W
    return Math.ceil(systemSizeW / 400);
  }
  
  function calculateTotalInvestment(consumo: number): number {
    // Example formula: $1000 per kW of system size
    return calculateSystemSize(consumo) * 1000;
  }
  
  function calculateROI(consumo: number): number {
    // Example formula: Total investment / (monthly savings * 12)
    const totalInvestment = calculateTotalInvestment(consumo);
    const annualSavings = calculateSavings(consumo) * 12;
    return Math.round((totalInvestment / annualSavings) * 10) / 10; // Years, rounded to 1 decimal
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with client info */}
      <div className="bg-blue-600 p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Propuesta Personalizada para {data.cliente.nombre}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-medium">Email:</span> {data.cliente.email}</p>
            <p><span className="font-medium">Teléfono:</span> {data.cliente.telefono}</p>
          </div>
          <div>
            <p><span className="font-medium">Consumo Promedio:</span> {data.cliente.consumo.toLocaleString()} kWh</p>
            <p><span className="font-medium">Fecha:</span> {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-sm font-medium">Ahorro Mensual Estimado</h3>
          <p className="text-2xl font-bold text-green-600">${calculatedValues.ahorroMensual.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-sm font-medium">Capacidad del Sistema</h3>
          <p className="text-2xl font-bold text-blue-600">{calculatedValues.capacidadSistema} kW</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500 text-sm font-medium">Retorno de Inversión</h3>
          <p className="text-2xl font-bold text-purple-600">{calculatedValues.retornoInversion} años</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'resumen'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('detalles')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'detalles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Detalles Técnicos
          </button>
          <button
            onClick={() => setActiveTab('financiero')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'financiero'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Análisis Financiero
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'resumen' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Resumen de la Propuesta</h2>
            <p className="mb-4">
              Basado en su consumo promedio de <span className="font-medium">{data.cliente.consumo.toLocaleString()} kWh</span>,
              le recomendamos un sistema fotovoltaico con las siguientes características:
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Detalles del Sistema</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Capacidad:</span>
                    <span className="font-medium">{calculatedValues.capacidadSistema} kW</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Número de Paneles:</span>
                    <span className="font-medium">{calculatedValues.numeroPaneles}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Área Aproximada:</span>
                    <span className="font-medium">{calculatedValues.numeroPaneles * 2} m²</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Análisis Financiero</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Inversión Total:</span>
                    <span className="font-medium">${calculatedValues.inversionTotal.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Ahorro Mensual:</span>
                    <span className="font-medium">${calculatedValues.ahorroMensual.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Retorno de Inversión:</span>
                    <span className="font-medium">{calculatedValues.retornoInversion} años</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200">
                Solicitar Instalación
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'detalles' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Detalles Técnicos</h2>
            {/* Technical details content will go here */}
            <p>Esta sección mostrará información técnica detallada sobre los equipos, especificaciones y proceso de instalación.</p>
          </div>
        )}
        
        {activeTab === 'financiero' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Análisis Financiero</h2>
            {/* Financial analysis content will go here */}
            <p>Esta sección mostrará un análisis financiero detallado, incluyendo gráficos de retorno de inversión, comparación de costos, y opciones de financiamiento.</p>
          </div>
        )}
      </div>
    </div>
  );
}