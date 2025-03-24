// SistemaTab.tsx
// Componente para la pestaña de Sistema Solar

import React from 'react';
import { ProposalData } from '../types';
import Image from 'next/image';

interface SistemaTabProps {
  data: ProposalData;
}

const SistemaTab: React.FC<SistemaTabProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-solarmente-title mb-6">Detalles del Sistema Solar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Componentes</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Tamaño del Sistema</p>
                <p className="text-xl font-bold text-solarmente-title">{data.sistema.tamano} kW</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Paneles Solares</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold text-solarmente-title">
                    {data.sistema.paneles} x {data.sistema.tamanoPanel}W Paneles Monocristalinos
                  </p>
                  <Image 
                    src="/images/longi logo.svg" 
                    alt="LONGi Logo" 
                    width={50} 
                    height={20}
                    className="h-5 w-auto" 
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Marca LONGi o similar</p>
                <p className="text-xs text-gray-400">Garantía de 30 años</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Inversores</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold text-solarmente-title">
                    Inversores marca SOLIS
                  </p>
                  <Image 
                    src="/images/solis logo.webp" 
                    alt="SOLIS Logo" 
                    width={50} 
                    height={20}
                    className="h-5 w-auto" 
                  />
                </div>
                <p className="text-xs text-gray-400">Garantía de 10 años</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Estructura de Montaje</p>
                <p className="text-xl font-bold text-solarmente-title">
                  Racking de Aluminio
                </p>
                <p className="text-xs text-gray-400">Incluye tornillería inoxidable y sellado a prueba de agua</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Espacio Requerido</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Área Total</p>
                <p className="text-xl font-bold text-solarmente-title">{data.sistema.espacioTecho} m²</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Producción Energética</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Producción Diaria Promedio</p>
                <p className="text-xl font-bold text-solarmente-title">
                  {Math.round(data.produccion.promedioMensual / 30)} kWh
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Producción Mensual Promedio</p>
                <p className="text-xl font-bold text-solarmente-title">
                  {data.produccion.promedioMensual} kWh
                </p>
                <p className="text-xs text-gray-400">Varía según la radiación solar de cada mes</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Producción Anual Estimada</p>
                <p className="text-xl font-bold text-solarmente-title">
                  {data.produccion.anual} kWh
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Garantías</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Garantía de Paneles</p>
                <p className="text-xl font-bold text-solarmente-title">
                  30 años
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Garantía de Inversores</p>
                <p className="text-xl font-bold text-solarmente-title">
                  10 años
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Garantía de Estructura</p>
                <p className="text-xl font-bold text-solarmente-title">
                  15 años
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Garantía de Instalación</p>
                <p className="text-xl font-bold text-solarmente-title">
                  1 año
                </p>
                <p className="text-xs text-gray-400">(por goteras)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SistemaTab;