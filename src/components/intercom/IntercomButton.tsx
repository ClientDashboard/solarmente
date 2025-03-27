'use client';

import React from 'react';

interface IntercomButtonProps {
  label?: string;
  className?: string;
}

export function IntercomButton({ 
  label = "Chatear con un experto", 
  className = "" 
}: IntercomButtonProps) {
  const openIntercom = () => {
    // Verificar si Intercom está disponible
    if (typeof window !== 'undefined' && window.Intercom) {
      window.Intercom('show');
    }
  };

  return (
    <button 
      onClick={openIntercom}
      className={`bg-[#FF671F] hover:bg-[#E55A10] text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
    >
      {label}
    </button>
  );
}
