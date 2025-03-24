// PlanesTab.tsx
// Componente para la pestaña de planes de pago

import React from 'react';
import { ProposalData } from '../types';

interface PlanesTabProps {
  data: ProposalData;
}

const PlanesTab: React.FC<PlanesTabProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-solarmente-title mb-6">Planes de Pago</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-solarmente-title mb-2">Plan 1</h3>
          <p className="text-sm text-gray-600 mb-4">
            Mejor precio con pago distribuido durante la instalación
          </p>
          
          <div className="mb-6 flex justify-between items-center">
            <span className="text-3xl font-bold text-solarmente-title">
              ${data.precios.plan1.total.toLocaleString()}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Mejor Precio
            </span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sistema Solar</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan1.sistema.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Instalación</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan1.instalacion.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Planos y Trámites</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan1.tramites.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
              <span className="text-sm text-gray-700">Total</span>
              <span className="text-sm text-gray-900">
                ${data.precios.plan1.total.toLocaleString()}
              </span>
            </div>
          </div>
          
          <h4 className="text-md font-semibold text-solarmente-title mb-3">Etapas de Pago</h4>
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">1er Abono (Inicio)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan1.abono1.toLocaleString()} (60%)
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Al recibir el primer abono y firma del contrato damos inicio a la instalacion del sistema solar en un maximo de 10 dias habiles. Tambien se da inicio a los tramites.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">2do Abono (Entrega materiales)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan1.abono2.toLocaleString()} (30%)
                </span>
              </div>
              <p className="text-xs text-gray-600">
                El segundo abono se cancela al terminar la instalacion de todos los equipos y dejar el sistema en funcionamiento con inyeccion cero para obtener un ahorro mientras se hacen los tramites.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">3er Abono (Finalización)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan1.abono3.toLocaleString()} (10%)
                </span>
              </div>
              <p className="text-xs text-gray-600">
                El tercer abono y ultimo abono se cancela al tener el nuevo medidor por la compañia de luz.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a 
              href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%201%20para%20mi%20sistema%20solar%20de%20${data.sistema.tamano}kW.`}
              target="_blank"
              rel="noopener noreferrer" 
              className="block w-full bg-solarmente-button hover:bg-opacity-90 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Consultar Plan 1
            </a>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-solarmente-title mb-2">Plan 2</h3>
          <p className="text-sm text-gray-600 mb-4">
            Pago inicial más pequeño con financiamiento a 6 meses
          </p>
          
          <div className="mb-6 flex justify-between items-center">
            <span className="text-3xl font-bold text-solarmente-title">
              ${data.precios.plan2.total.toLocaleString()}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Financiamiento
            </span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Sistema Solar</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan2.sistema.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Instalación</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan2.instalacion.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Planos y Trámites</span>
              <span className="text-sm font-medium text-gray-700">
                ${data.precios.plan2.tramites.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
              <span className="text-sm text-gray-700">Total</span>
              <span className="text-sm text-gray-900">
                ${data.precios.plan2.total.toLocaleString()}
              </span>
            </div>
          </div>
          
          <h4 className="text-md font-semibold text-solarmente-title mb-3">Plan de Financiamiento</h4>
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Abono Inicial (70%)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan2.abonoInicial.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Al recibir el primer abono damos inicio a la instalacion del sistema solar en un maximo de 10 dias habiles. Tambien se da inicio a los tramites.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Saldo a Financiar (30%)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan2.saldoPendiente.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                El saldo pendiente se paga en 6 cuotas mensuales. La primera cuota se paga al terminar la instalación del sistema.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Cuota Mensual (6 meses)</span>
                <span className="text-sm font-medium text-gray-700">
                  ${data.precios.plan2.cuotaMensual.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a 
              href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%202%20con%20financiamiento%20para%20mi%20sistema%20solar%20de%20${data.sistema.tamano}kW.`}
              target="_blank"
              rel="noopener noreferrer" 
              className="block w-full bg-solarmente-button hover:bg-opacity-90 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Consultar Plan 2
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-green-50 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">El momento es ahora</h3>
        <p className="text-sm text-green-700 mb-3">
          Recuerda que este sistema solar:
        </p>
        <ul className="list-disc pl-5 text-sm text-green-700 mb-4 space-y-1">
          <li>Te ahorrará ${data.financiero.ahorroAnual.toLocaleString()} cada año en facturas de electricidad</li>
          <li>Protegerá tu hogar de los aumentos en las tarifas eléctricas</li>
          <li>Aumentará el valor de tu propiedad</li>
          <li>Reducirá tu huella de carbono</li>
        </ul>
        <p className="text-sm text-green-700">
          Contacta a nuestro equipo hoy mismo para iniciar tu proyecto solar.
        </p>
      </div>
    </div>
  );
};

export default PlanesTab;
