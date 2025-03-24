// FinancieroTab.tsx
// Componente para la pestaña de análisis financiero

import React from 'react';
import { ProposalData } from '../types';

interface FinancieroTabProps {
  data: ProposalData;
}

const FinancieroTab: React.FC<FinancieroTabProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-solarmente-title mb-6">Análisis Financiero</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Ahorros</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Ahorro Mensual Estimado</p>
                <p className="text-2xl font-bold text-green-600">
                  ${data.financiero.ahorroMensual}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Ahorro Anual</p>
                <p className="text-2xl font-bold text-green-600">
                  ${data.financiero.ahorroAnual}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Ahorro a 30 Años</p>
                <p className="text-2xl font-bold text-green-600">
                  ${data.financiero.ahorro30Anos.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Valor del Sistema</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Inversión Total (Plan 1)</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  ${data.precios.plan1.total.toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Costo por Watt (Plan 1)</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  ${data.precios.plan1.precioWatt}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 mt-2">
                <p className="text-sm text-gray-500">Inversión Total (Plan 2)</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  ${data.precios.plan2.total.toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Costo por Watt (Plan 2)</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  ${data.precios.plan2.precioWatt}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Retorno de Inversión</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Tiempo de Recuperación</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  {data.sistema.roi} años
                </p>
              </div>
              
              <div className="pt-2 border-t border-gray-300">
                <p className="text-sm text-gray-500">Vida Útil del Sistema</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  30+ años
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-solarmente-title mb-4">Comparativo</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Costo Actual Mensual</p>
                <p className="text-2xl font-bold text-red-600">
                  ${Math.round(data.cliente.consumo * 0.26)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Nuevo Costo Mensual</p>
                <p className="text-2xl font-bold text-green-600">
                  $0
                </p>
                <p className="text-xs text-gray-400">Con autoproducción completa</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Aumento Valor de Propiedad</p>
                <p className="text-2xl font-bold text-solarmente-title">
                  ${Math.round(data.precios.plan1.total * 0.6).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Estimado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancieroTab;