'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Componentes de pestañas
import ResumenTab from './tabs/ResumenTab';
import SistemaTab from './tabs/SistemaTab';
import FinancieroTab from './tabs/FinancieroTab';
import PlanesTab from './tabs/PlanesTab';

// Tipos y funciones de cálculo
import { ProposalData } from './types';
import { calcularPropuesta } from './calculators';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProposalResult() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('resumen');
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Obtener parámetros del query
      const nombre = searchParams.get('nombre') || 'Usuario';
      const telefono = searchParams.get('telefono') || '+507 XXXXXXXX';
      const email = searchParams.get('email') || 'usuario@ejemplo.com';
      const consumo = Number(searchParams.get('consumo')) || 2000;
      
      console.log("Datos recibidos:", { nombre, telefono, email, consumo });

      // Usar la función de cálculo modularizada
      const calculosResultado = calcularPropuesta(consumo);
      
      // Establecer los datos calculados
      setProposalData({
        cliente: {
          nombre,
          telefono,
          email,
          consumo
        },
        ...calculosResultado
      });
    } catch (error) {
      console.error("Error al calcular los datos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading || !proposalData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-solarmente-button"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <Link href="/" className="mb-4 sm:mb-0">
              <Image 
                src="/images/logo.png" 
                alt="SolarMente Logo" 
                width={180} 
                height={50} 
                className="h-12 w-auto" 
              />
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-solarmente-title">Propuesta Personalizada</h1>
              <p className="text-solarmente-text">
                Generado para: <span className="font-semibold">{proposalData.cliente.nombre}</span>
              </p>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-gray-200">
            <div className="flex flex-wrap text-sm font-medium text-center border-b">
              <button 
                className={`flex-1 py-3 px-4 ${activeTab === 'resumen' 
                  ? 'bg-solarmente-button text-white' 
                  : 'text-solarmente-text hover:bg-gray-100'}`}
                onClick={() => setActiveTab('resumen')}
              >
                Resumen
              </button>
              <button 
                className={`flex-1 py-3 px-4 ${activeTab === 'sistema' 
                  ? 'bg-solarmente-button text-white' 
                  : 'text-solarmente-text hover:bg-gray-100'}`}
                onClick={() => setActiveTab('sistema')}
              >
                Sistema Solar
              </button>
              <button 
                className={`flex-1 py-3 px-4 ${activeTab === 'financiero' 
                  ? 'bg-solarmente-button text-white' 
                  : 'text-solarmente-text hover:bg-gray-100'}`}
                onClick={() => setActiveTab('financiero')}
              >
                Financiero
              </button>
              <button 
                className={`flex-1 py-3 px-4 ${activeTab === 'planes' 
                  ? 'bg-solarmente-button text-white' 
                  : 'text-solarmente-text hover:bg-gray-100'}`}
                onClick={() => setActiveTab('planes')}
              >
                Planes de Pago
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'resumen' && <ResumenTab data={proposalData} />}
              {activeTab === 'sistema' && <SistemaTab data={proposalData} />}
              {activeTab === 'financiero' && <FinancieroTab data={proposalData} />}
              {activeTab === 'planes' && <PlanesTab data={proposalData} />}
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} SolarMente | Esta propuesta es válida por 30 días</p>
          </div>
        </div>
      </div>
    </main>
  );
}
