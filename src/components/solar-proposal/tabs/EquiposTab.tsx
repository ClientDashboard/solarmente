// src/components/solar-proposal/tabs/EquiposTab.tsx
import React from 'react';
import { ProposalData } from '../types';
import { SOLIS_MONOFASIC_INVERTERS } from '../constants';

interface EquiposTabProps {
  data: ProposalData;
  isDarkMode?: boolean;
}

const EquiposTab: React.FC<EquiposTabProps> = ({ data, isDarkMode = false }) => {
  // Estilos basados en el tema
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textMainColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const textSecondaryColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const sectionBg = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50';
  const highlightBg = isDarkMode ? 'bg-solarmente-button/20' : 'bg-solarmente-button/10';

  // Total de paneles
  const totalPanels = data.sistema.paneles;

  // Seleccionamos el inversor según el modelo indicado en la propuesta
  const selectedInverter = SOLIS_MONOFASIC_INVERTERS.find(
    inv => inv.model === data.sistema.modeloInversor
  );

  return (
    <div className="animate-fadeIn">
      {/* Título */}
      <h2 className={`text-xl font-bold ${textMainColor} mb-6 flex items-center gap-2`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-solarmente-button"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Equipos Premium
      </h2>

      {/* Contenedor: Panel Solar e Inversor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Panel Solar Card */}
        <div className={`${cardBg} rounded-xl border ${borderColor} shadow-lg overflow-hidden`}>
          {/* Ajustamos la altura a h-48, fondo negro y centramos la imagen */}
          <div className="h-48 bg-black flex justify-center items-center relative overflow-hidden">
            <img
              src="/images/longi logo.svg"
              alt="Panel Solar"
              className="h-1/2 object-contain p-3"
            />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 rounded-lg px-3 py-1.5 shadow-md">
              <span className="text-sm font-bold">{data.sistema.marcaPanel}</span>
            </div>
          </div>

          {/* Contenido del panel */}
          <div className="p-6">
            <h3 className={`text-xl font-bold ${textMainColor} mb-2`}>Panel Solar</h3>
            <h4 className={`text-lg font-semibold ${textSecondaryColor} mb-4`}>
              {data.sistema.modeloPanel}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Potencia</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.sistema.potenciaPanel || '450'}W
                </p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Cantidad</p>
                <p className={`text-xl font-bold ${textMainColor}`}>{totalPanels}</p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Eficiencia</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.sistema.eficienciaPanel || '21.5'}%
                </p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Garantía</p>
                <p className={`text-xl font-bold ${textMainColor}`}>30 años</p>
              </div>
            </div>
            <div className={`p-4 ${highlightBg} rounded-lg mb-4`}>
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-solarmente-button"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className={`text-md font-semibold ${textMainColor}`}>
                  Características Destacadas
                </h4>
              </div>
              <ul className={`list-disc pl-6 text-sm ${textSecondaryColor} space-y-1`}>
                <li>Tecnología PERC de alta eficiencia</li>
                <li>Resistente a condiciones climáticas extremas</li>
                <li>Menor degradación anual (&lt;0.5%)</li>
                <li>Certificaciones internacionales</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Inversor Card */}
        <div className={`${cardBg} rounded-xl border ${borderColor} shadow-lg overflow-hidden`}>
          {/* Cambiamos el fondo a blanco y centramos la imagen */}
          <div className="h-48 bg-white flex justify-center items-center relative overflow-hidden">
            <img
              src="/images/Solis_Logo_-_Orange_4_.png"
              alt="Inversor"
              className="h-1/2 object-contain p-3"
            />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 rounded-lg px-3 py-1.5 shadow-md">
              <span className="text-sm font-bold">{data.sistema.marcaInversor}</span>
            </div>
          </div>

          {/* Contenido del inversor */}
          <div className="p-6">
            <h3 className={`text-xl font-bold ${textMainColor} mb-2`}>Inversor</h3>
            <h4 className={`text-lg font-semibold ${textSecondaryColor} mb-4`}>
              {data.sistema.modeloInversor}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Potencia</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.sistema.potenciaInversor || data.sistema.tamano} kW
                </p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Tipo</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.sistema.tipoInversor || 'String'}
                </p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Eficiencia</p>
                <p className={`text-xl font-bold ${textMainColor}`}>
                  {data.sistema.eficienciaInversor || '98.2'}%
                </p>
              </div>
              <div className={`p-4 ${sectionBg} rounded-lg`}>
                <p className={`text-sm font-medium ${textSecondaryColor}`}>Garantía</p>
                <p className={`text-xl font-bold ${textMainColor}`}>10 años</p>
              </div>
              {selectedInverter && (
                <div className={`p-4 ${sectionBg} rounded-lg`}>
                  <p className={`text-sm font-medium ${textSecondaryColor}`}>Inversor Recomendado</p>
                  <p className={`text-xl font-bold ${textMainColor}`}>{selectedInverter.model}</p>
                </div>
              )}
            </div>
            <div className={`p-4 ${highlightBg} rounded-lg mb-4`}>
              <p className={`text-sm ${textSecondaryColor}`}>
                La opción de dimensionamiento detallado se implementará próximamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Especificaciones Técnicas */}
      <div className={`${cardBg} rounded-xl border ${borderColor} shadow-md p-6 mb-8`}>
        <h3 className={`text-lg font-semibold ${textMainColor} mb-4 flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-solarmente-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Especificaciones Técnicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 ${sectionBg} rounded-lg`}>
            <p className={`text-sm font-medium ${textSecondaryColor}`}>Potencia del Sistema</p>
            <p className={`text-xl font-bold ${textMainColor}`}>{data.sistema.tamano} kWp</p>
          </div>
          <div className={`p-4 ${sectionBg} rounded-lg`}>
            <p className={`text-sm font-medium ${textSecondaryColor}`}>Producción Anual Estimada</p>
            <p className={`text-xl font-bold ${textMainColor}`}>
              {Math.round(data.sistema.tamano * 1600)} kWh
            </p>
          </div>
          <div className={`p-4 ${sectionBg} rounded-lg`}>
            <p className={`text-sm font-medium ${textSecondaryColor}`}>Espacio Requerido</p>
            <p className={`text-xl font-bold ${textMainColor}`}>
              {Math.round(data.sistema.paneles * 2.2)} m²
            </p>
          </div>
        </div>
      </div>

      {/* Tecnología Avanzada del Panel Solar */}
      <div className={`${cardBg} rounded-xl border ${borderColor} shadow-md p-6 mb-8`}>
        <h3 className={`text-lg font-semibold ${textMainColor} mb-6 flex items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-solarmente-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Tecnología Avanzada {data.sistema.marcaPanel} {data.sistema.modeloPanel}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Columna Izquierda */}
          <div className="space-y-12">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="w-12 h-12 text-solarmente-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className={`text-base font-bold ${textMainColor} mb-2`}>Diseño Anti-Polvo</h4>
              <p className={`text-sm ${textSecondaryColor}`}>
                Permite que el polvo se deslice naturalmente del módulo bajo la influencia de la gravedad y la lluvia.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="w-12 h-12 text-solarmente-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h4 className={`text-base font-bold ${textMainColor} mb-2`}>Mejora de Rendimiento</h4>
              <p className={`text-sm ${textSecondaryColor}`}>
                Ganancia notable en generación de energía, reduciendo la frecuencia y costo de limpieza.
              </p>
            </div>
          </div>
          {/* Columna Central */}
          <div className="flex justify-center items-center">
            <img
              src="/images/Hi_MO_X6_b3c9786e94.png"
              alt="Panel Solar HiMO X6"
              className="h-96 object-contain bg-transparent"
            />
          </div>
          {/* Columna Derecha */}
          <div className="space-y-12">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="w-12 h-12 text-solarmente-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className={`text-base font-bold ${textMainColor} mb-2`}>Prevención de Sombras</h4>
              <p className={`text-sm ${textSecondaryColor}`}>
                Evita la obstrucción de luz incidente, garantizando un rendimiento óptimo de generación de energía.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <svg
                  className="w-12 h-12 text-solarmente-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className={`text-base font-bold ${textMainColor} mb-2`}>Fiabilidad Estructural</h4>
              <p className={`text-sm ${textSecondaryColor}`}>
                Marco patentado y técnicas avanzadas de sellado que garantizan durabilidad y capacidad de carga.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ventajas del Inversor Solis */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="/images/inversor solis.webp"
            alt="Inversor Solis"
            className="rounded-lg shadow-md mx-auto max-h-60 object-contain"
          />
        </div>
        <div className={`p-5 ${highlightBg} rounded-lg`}>
          <h4 className={`text-base font-bold ${textMainColor} mb-3`}>
            ¿Por qué elegimos {data.sistema.marcaInversor}?
          </h4>
          <ul className={`list-disc pl-6 text-sm ${textSecondaryColor} space-y-2`}>
            <li>Líder mundial en tecnología de inversores solares con más de 20 años de experiencia</li>
            <li>Calificado como el inversor más eficiente y confiable por institutos de pruebas independientes</li>
            <li>Soporte técnico local disponible 24/7 con técnicos certificados</li>
            <li>Diseño compacto y silencioso para una integración perfecta en cualquier espacio</li>
          </ul>
        </div>
      </div>

      {/* Certificaciones y Garantías */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${cardBg} p-5 rounded-lg border ${borderColor} flex items-center`}>
          <div className="mr-4 bg-solarmente-button/10 p-3 rounded-full">
            <svg
              className="h-8 w-8 text-solarmente-button"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-1`}>
              Certificaciones Internacionales
            </h3>
            <p className={`text-sm ${textSecondaryColor}`}>
              Todos nuestros equipos cumplen con los estándares IEC, UL, CE, MCS y CEC, garantizando la máxima calidad y seguridad.
            </p>
          </div>
        </div>
        <div className={`${cardBg} p-5 rounded-lg border ${borderColor} flex items-center`}>
          <div className="mr-4 bg-solarmente-button/10 p-3 rounded-full">
            <svg
              className="h-8 w-8 text-solarmente-button"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${textMainColor} mb-1`}>
              Garantías Extendidas
            </h3>
            <p className={`text-sm ${textSecondaryColor}`}>
              30 años en paneles solares, 10 años en inversores, soporte técnico dedicado durante toda la vida útil del sistema solar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquiposTab;
