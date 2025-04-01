'use client';

// src/components/solar-proposal/ProposalResult.tsx
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Image from 'next/image';
import Link from 'next/link';

// Tab components
import ResumenTab from './tabs/ResumenTab';
import SistemaTab from './tabs/SistemaTab';
import FinancieroTab from './tabs/FinancieroTab';
import PlanesTab from './tabs/PlanesTab';
import EquiposTab from './tabs/EquiposTab';
// Types
import { ProposalData } from './types';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProposalResultProps {
  data: ProposalData;
}

function safeTrackEvent(eventName: string, metadata?: any) {
  if (typeof window !== 'undefined' && typeof window.Intercom === 'function') {
    try {
      window.Intercom('trackEvent', eventName, metadata);
      return true;
    } catch (e) {
      console.error('Error al rastrear evento:', e);
    }
  }
  return false;
}

function safeUpdateUser(userData: any) {
  if (typeof window !== 'undefined' && typeof window.Intercom === 'function') {
    try {
      window.Intercom('update', userData);
      return true;
    } catch (e) {
      console.error('Error al actualizar usuario:', e);
    }
  }
  return false;
}

export default function ProposalResult({ data }: ProposalResultProps) {
  const [activeTab, setActiveTab] = useState('resumen');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Intercom integration on mount
  useEffect(() => {
    if (!data) return;
    safeTrackEvent('proposal_viewed', {
      consumo: data.cliente.consumo,
      tamano_sistema: data.sistema?.tamano,
      ahorro_mensual: data.ahorro?.mensual,
      roi: data.sistema?.roi,
    });
    safeUpdateUser({
      name: data.cliente.nombre,
      email: data.cliente.email,
      phone: data.cliente.telefono,
      consumo_kwh: data.cliente.consumo,
      tamano_sistema: data.sistema?.tamano,
      ahorro_mensual: data.ahorro?.mensual,
      propuesta_generada: true,
      fecha_generacion: new Date().toISOString(),
    });
    const handleBeforeUnload = () => {
      safeTrackEvent('propuesta_abandonada', {
        tiempo_en_pagina: Math.floor((new Date().getTime() - performance.now()) / 1000),
      });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data]);

  // Track tab changes
  useEffect(() => {
    if (!data || !activeTab) return;
    safeTrackEvent('tab_changed', {
      tab: activeTab,
      consumo: data.cliente.consumo,
    });
  }, [activeTab, data]);

  const trackContactClick = () => {
    if (!data) return;
    safeTrackEvent('contact_button_clicked', {
      from: 'proposal_page',
      consumo: data.cliente.consumo,
      tamano_sistema: data.sistema?.tamano,
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Theme Toggle and PDF Export */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src={isDarkMode ? '/images/LOGO SOLAR.svg' : '/images/logo.png'}
                alt="SolarMente Logo"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 p-2 px-3 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-800 shadow'
                }`}
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDarkMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm">Modo Claro</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 11-18 0 9 9 0 0112 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-sm">Modo Oscuro</span>
                  </>
                )}
              </button>
            </div>
            <div className={`text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <h1 className="text-2xl font-bold">Propuesta Personalizada</h1>
              <p className="font-semibold">Generado para: {data.cliente.nombre}</p>
            </div>
          </div>

          {/* Main Content with Tabs */}
          <div className="max-w-full">
            <div className={`rounded-xl shadow-lg overflow-hidden mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} bg-white`}>
              <div className={`flex flex-wrap text-sm font-medium text-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'resumen' ? 'bg-solarmente-button text-white' : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                  onClick={() => setActiveTab('resumen')}
                  id="tab-resumen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Resumen</span>
                </button>
                <button
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'sistema' ? 'bg-sualmente-button text-white' : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                  onClick={() => setActiveTab('sistema')}
                  id="tab-sistema"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Sistema Solar</span>
                </button>
                <button
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'equipos' ? 'bg-sualmente-button text-white' : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                  onClick={() => setActiveTab('equipos')}
                  id="tab-equipos"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Equipos</span>
                </button>
                <button
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'financiero' ? 'bg-solarmente-button text-white' : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                  onClick={() => setActiveTab('financiero')}
                  id="tab-financiero"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Financiero</span>
                </button>
                <button
                  className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'planes' ? 'bg-solarmente-button text-white' : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                  onClick={() => setActiveTab('planes')}
                  id="tab-planes"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Planes de Pago</span>
                </button>
              </div>

              <div className="p-6" id="tab-content">
                {activeTab === 'resumen' && <ResumenTab data={data} isDarkMode={isDarkMode} />}
                {activeTab === 'sistema' && <SistemaTab data={data} isDarkMode={isDarkMode} />}
                {activeTab === 'equipos' && <EquiposTab data={data} isDarkMode={isDarkMode} />}
                {activeTab === 'financiero' && <FinancieroTab data={data} isDarkMode={isDarkMode} />}
                {activeTab === 'planes' && <PlanesTab data={data} isDarkMode={isDarkMode} />}
              </div>
            </div>

            <div className="bg-gradient-to-r from-solarmente-button to-solarmente-button/90 rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-grow text-white text-center md:text-left">
                  <h3 className="text-xl font-bold mb-1">¿Listo para dar el siguiente paso?</h3>
                  <p className="mb-0">
                    Nuestros asesores especializados están listos para responder todas tus preguntas.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={`https://wa.me/50764143255?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(data.cliente.nombre)}%20y%20acabo%20de%20revisar%20mi%20propuesta%20para%20un%20sistema%20de%20${data.sistema.tamano}kW.%20Me%20gustaría%20recibir%20más%20información.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-solarmente-button font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300"
                    onClick={trackContactClick}
                  >
                    Contactar Ahora
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            <p>
              © {new Date().getFullYear()} SolarMente | Esta propuesta es válida por 15 días |{' '}
              <Link
                href="/terminos-condiciones"
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} ml-1 underline transition-colors`}
              >
                Términos y Condiciones
              </Link>
            </p>
            <p>
              Los cálculos se basan en su consumo registrado en el formulario. De interesarle la propuesta se hace una visita técnica.
            </p>
            <p className="mt-1">
              Generada por SolarMente <span className="text-sualmente-button text-xs">(v.1.3.0)</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


