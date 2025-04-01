'use client';

import Link from 'next/link';
import React, { useCallback } from 'react';

export default function ImprovedContactPage() {
  const abrirIntercom = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).Intercom) {
      (window as any).Intercom('show');
    } else {
      alert('Intercom no está disponible en este momento.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-[#1a1a2e] text-white overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-suramente-orange/10 via-black/20 to-transparent animate-slow-spin"></div>
      </div>

      {/* Main Container */}
      <div className="relative container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Contact Information */}
        <div className="space-y-8">
          {/* Logo and Tagline */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/images/LOGO SOLAR.svg" 
                alt="Logo SolarMente" 
                className="w-[300px] h-[100px] object-contain"
              />
              <div className="bg-suramente-orange/20 px-3 py-1 rounded-full text-sm text-suramente-orange">
                
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Solar<span className="text-suramente-orange">Mente</span>
              <span className="text-suramente-orange font-light">.AI</span>
            </h1>
            <p className="text-gray-300 mt-4">
              Primera empresa solar en Panamá impulsada por Inteligencia Artificial
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-suramente-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p className="text-gray-300">+507 6414 3255</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-suramente-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="font-semibold">Correo Electrónico</h3>
                <p className="text-gray-300">ventas@solarmente.io</p>

    
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Methods */}
        <div className="space-y-8">
          {/* Business Hours */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-suramente-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold">Horarios de Atención</h2>
            </div>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Lunes a Viernes</span>
                <span className="font-semibold">8:00am - 5:00pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span className="font-semibold">8:00am - 12:00pm</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span className="text-red-400">Cerrado</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              Responderemos mensajes entrantes fuera del horario de atencion al siguiente dia habil en horaria laboral.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/50764143255?text=Hola%20SolarMente%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n..."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.07 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.814 9.814 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.23 8.25-8.23zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.21.88 2.38 1 2.54.13.15 1.76 2.67 4.3 3.66.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.07.14-1.18s-.22-.14-.47-.23c-.25-.1-1.47-.72-1.69-.8-.22-.11-.43-.07-.61.2-.18.26-.72.8-.88.97-.16.17-.32.2-.57.06-.25-.13-1.06-.39-2.02-1.23-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.51.13-.13.25-.32.38-.48.12-.15.16-.26.23-.43.07-.17.04-.31-.02-.43-.06-.12-.54-1.33-.76-1.82-.2-.48-.4-.41-.57-.42z" />
              </svg>
              WhatsApp
            </a>
            <button
              onClick={abrirIntercom}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat en Vivo
            </button>
          </div>

          {/* Quick Inquiry Section */}
<div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-suramente-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    ¿Necesitas una Cotización Rápida?
  </h3>
  <p className="text-gray-300 mb-4">
    Cotiza aquí y obten una propuesta rápida en menos de 30 segundos.
  </p>
  <div className="space-y-3">
  <Link 
  href="/propuesta" 
  className="w-full bg-[#FF671F] hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
  Comenzar Cotización
</Link>
  </div>
</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} SolarMente. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}