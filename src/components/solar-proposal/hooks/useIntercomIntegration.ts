'use client';

import { useEffect } from 'react';
import { updateIntercomUser, trackIntercomEvent } from '../../intercom';

export function useIntercomIntegration(proposalData: any, activeTab: string) {
  // Seguimiento de vista de propuesta
  useEffect(() => {
    if (!proposalData) return;

    // Rastrear vista de propuesta
    trackIntercomEvent('proposal_viewed', {
      consumo: proposalData.cliente.consumo,
      tamano_sistema: proposalData.sistema?.tamano,
      ahorro_mensual: proposalData.ahorro?.mensual,
      roi: proposalData.financiero?.roi
    });

    // Actualizar datos del usuario en Intercom
    updateIntercomUser({
      name: proposalData.cliente.nombre,
      email: proposalData.cliente.email,
      phone: proposalData.cliente.telefono,
      // Datos personalizados
      consumo_kwh: proposalData.cliente.consumo,
      tamano_sistema: proposalData.sistema?.tamano,
      ahorro_mensual: proposalData.ahorro?.mensual,
      propuesta_generada: true,
      fecha_generacion: new Date().toISOString()
    });

    // Registrar abandono de página
    const handleBeforeUnload = () => {
      trackIntercomEvent('propuesta_abandonada', {
        tiempo_en_pagina: Math.floor((new Date().getTime() - performance.now()) / 1000)
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [proposalData]);

  // Seguimiento de cambios de pestaña
  useEffect(() => {
    if (!proposalData || !activeTab) return;
    
    trackIntercomEvent('tab_changed', {
      tab: activeTab,
      consumo: proposalData.cliente.consumo
    });
  }, [activeTab, proposalData]);

  // Función para rastrear clic en botón de contacto
  const trackContactClick = () => {
    trackIntercomEvent('contact_button_clicked', {
      from: 'proposal_page',
      consumo: proposalData?.cliente.consumo,
      tamano_sistema: proposalData?.sistema?.tamano
    });
  };

  return { trackContactClick };
}