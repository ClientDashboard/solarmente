'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Definir las interfaces para los datos de la propuesta
interface ClienteData {
  nombre: string;
  telefono: string;
  email: string;
  consumo: number;
}

interface SistemaData {
  tamano: number;
  paneles: number;
  espacioTecho: number;
  tamanoPanel: number;
  inversores: number;
  detalle_inversores: string;
  roi: number;
}

interface FinancieroData {
  ahorro25Anos: number;
  ahorro30Anos: number;
  ahorroAnual: number;
  ahorroMensual: number;
  porcentajeAhorro: number;
  excedente: number;
}

interface AmbientalData {
  petroleoReducido: number;
  co2Reducido: number;
}

interface ProduccionData {
  mensual: number[];
  promedioMensual: number;
  anual: number;
}

interface PreciosData {
  plan1: {
    sistema: number;
    instalacion: number;
    tramites: number;
    total: number;
    precioWatt: number;
    abono1: number;
    abono2: number;
    abono3: number;
  };
  plan2: {
    sistema: number;
    instalacion: number;
    tramites: number;
    total: number;
    precioWatt: number;
    abonoInicial: number;
    saldoPendiente: number;
    cuotaMensual: number;
  };
}

interface ProposalData {
  cliente: ClienteData;
  sistema: SistemaData;
  financiero: FinancieroData;
  ambiental: AmbientalData;
  produccion: ProduccionData;
  precios: PreciosData;
}

export default function ProposalResult() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('resumen');
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Constantes para cálculos (basadas en el Excel compartido)
  const PANEL_SIZE_WATTS = 585; // Tamaño del panel en Watts
  const PANEL_SIZE_KW = PANEL_SIZE_WATTS / 1000; // Tamaño del panel en kW
  const PANEL_AREA = 2.2; // Área por panel en m²
  const SUN_PEAK_HOURS = 4.4; // Horas pico de sol por día
  const SYSTEM_EFFICIENCY = 0.85; // Eficiencia del sistema (factor de pérdida)
  const ELECTRICITY_RATE = 0.26; // Tarifa de luz por kWh
  const DAYS_YEAR = 364; // Días en un año para cálculos

  // Precios y costos
  const SYSTEM_COST_PER_WATT = 0.50; // Costo del sistema por Watt
  const INSTALLATION_COST_PER_WATT = 0.08; // Costo de instalación por Watt
  const PLANS_PERMITS_COST_PER_WATT = 0.04; // Costo de planos y trámites por Watt
  const PLAN1_MARGIN = 1.00; // Margen para Plan 1 (100%)
  const PLAN2_MARGIN = 0.60; // Margen para Plan 2 (60%)

  // Porcentajes de pagos
  const PLAN1_PAYMENT1_PERCENT = 0.60; // Primer pago Plan 1 (60%)
  const PLAN1_PAYMENT2_PERCENT = 0.30; // Segundo pago Plan 1 (30%)
  const PLAN1_PAYMENT3_PERCENT = 0.10; // Tercer pago Plan 1 (10%)
  const PLAN2_INITIAL_PERCENT = 0.70; // Pago inicial Plan 2 (70%)
  const PLAN2_REMAINDER_PERCENT = 0.30; // Saldo pendiente Plan 2 (30%)
  const PLAN2_PAYMENT_MONTHS = 6; // Número de meses para pagos del Plan 2
  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Obtener parámetros del query
      const nombre = searchParams.get('nombre') || 'Usuario';
      const telefono = searchParams.get('telefono') || '+507 XXXXXXXX';
      const email = searchParams.get('email') || 'usuario@ejemplo.com';
      
      // Usar el consumo del formulario o un valor predeterminado
      const consumo = Number(searchParams.get('consumo')) || 2000;
      
      console.log("Datos recibidos:", { nombre, telefono, email, consumo });

      // Cálculos según las fórmulas del Excel
      const consumoAnual = consumo * 12;
      const consumoDiario = consumo / 30;
      const produccionRequerida = consumoDiario / SYSTEM_EFFICIENCY;
      
      // Tamaño del sistema y paneles
      const systemSizeNeeded = produccionRequerida / SUN_PEAK_HOURS;
      const panelCount = Math.ceil(systemSizeNeeded / PANEL_SIZE_KW);
      const systemSizeActual = panelCount * PANEL_SIZE_KW;
      const roofSpace = Math.ceil(panelCount * PANEL_AREA);
      
      // Producción energética
      const annualProduction = Math.round(systemSizeActual * SUN_PEAK_HOURS * SYSTEM_EFFICIENCY * DAYS_YEAR);
      const monthlyProduction = Math.round(annualProduction / 12);
      const savingsPercentage = Math.round((monthlyProduction / consumo) * 100);
      const excessPercentage = Math.max(0, savingsPercentage - 100);
      
      // Generación mensual (con variaciones estacionales)
      const monthlyFactors = [1.1, 1.2, 1.3, 1.2, 1.0, 0.9, 0.9, 1.0, 1.1, 1.0, 0.9, 1.0];
      const monthlyData = monthlyFactors.map(factor => 
        Math.round(monthlyProduction * factor)
      );
      
      // Cálculos financieros
      const annualSavings = Math.round(annualProduction * ELECTRICITY_RATE);
      const monthlySavings = Math.round(annualSavings / 12);
      const savings25Years = annualSavings * 25;
      const savings30Years = annualSavings * 30;
      
      // Precios para el sistema
      const systemCostWatts = systemSizeActual * 1000;
      const baseCost = systemCostWatts * SYSTEM_COST_PER_WATT;
      
      // Plan 1 (margen 100%)
      const totalProfitPlan1 = baseCost * PLAN1_MARGIN;
      const systemPricePlan1 = baseCost + totalProfitPlan1;
      const installationCostPlan1 = systemCostWatts * INSTALLATION_COST_PER_WATT;
      const plansCostPlan1 = systemCostWatts * PLANS_PERMITS_COST_PER_WATT;
      const totalPricePlan1 = systemPricePlan1 + installationCostPlan1 + plansCostPlan1;
      const pricePerWattPlan1 = totalPricePlan1 / systemCostWatts;
      
      // Pagos Plan 1
      const payment1Plan1 = totalPricePlan1 * PLAN1_PAYMENT1_PERCENT;
      const payment2Plan1 = totalPricePlan1 * PLAN1_PAYMENT2_PERCENT;
      const payment3Plan1 = totalPricePlan1 * PLAN1_PAYMENT3_PERCENT;
      
      // Plan 2 (margen 60%)
      const totalProfitPlan2 = baseCost * PLAN2_MARGIN;
      const systemPricePlan2 = baseCost + totalProfitPlan2;
      const installationCostPlan2 = systemCostWatts * INSTALLATION_COST_PER_WATT;
      const plansCostPlan2 = systemCostWatts * PLANS_PERMITS_COST_PER_WATT;
      const totalPricePlan2 = systemPricePlan2 + installationCostPlan2 + plansCostPlan2;
      const pricePerWattPlan2 = totalPricePlan2 / systemCostWatts;
      
      // Pagos Plan 2
      const initialPaymentPlan2 = totalPricePlan2 * PLAN2_INITIAL_PERCENT;
      const remainingBalancePlan2 = totalPricePlan2 * PLAN2_REMAINDER_PERCENT;
      const monthlyPaymentPlan2 = remainingBalancePlan2 / PLAN2_PAYMENT_MONTHS;
      
      // ROI - Retorno de inversión en años
      const roi = Math.round((totalPricePlan1 / annualSavings) * 100) / 100;
      
      // Cálculos de impacto ambiental (estimados)
      const oilReductionGallons = Math.round(systemSizeActual * 63); // 63 galones por kW
      const co2ReductionTons = Math.round(systemSizeActual * 0.9); // 0.9 toneladas por kW
      // Establecer todos los datos calculados
      const data: ProposalData = {
        cliente: {
          nombre,
          telefono,
          email,
          consumo
        },
        sistema: {
          tamano: Number(systemSizeActual.toFixed(2)),
          paneles: panelCount,
          espacioTecho: roofSpace,
          tamanoPanel: PANEL_SIZE_WATTS,
          inversores: Math.max(1, Math.ceil(systemSizeActual / 23)),
          detalle_inversores: `Inversores trifásicos SOLIS`,
          roi: roi
        },
        financiero: {
          ahorro25Anos: savings25Years,
          ahorro30Anos: savings30Years,
          ahorroAnual: annualSavings,
          ahorroMensual: monthlySavings,
          porcentajeAhorro: savingsPercentage,
          excedente: excessPercentage
        },
        ambiental: {
          petroleoReducido: oilReductionGallons,
          co2Reducido: co2ReductionTons
        },
        produccion: {
          mensual: monthlyData,
          promedioMensual: monthlyProduction,
          anual: annualProduction
        },
        precios: {
          plan1: {
            sistema: Math.round(systemPricePlan1),
            instalacion: Math.round(installationCostPlan1),
            tramites: Math.round(plansCostPlan1),
            total: Math.round(totalPricePlan1),
            precioWatt: Number(pricePerWattPlan1.toFixed(2)),
            abono1: Math.round(payment1Plan1),
            abono2: Math.round(payment2Plan1),
            abono3: Math.round(payment3Plan1)
          },
          plan2: {
            sistema: Math.round(systemPricePlan2),
            instalacion: Math.round(installationCostPlan2),
            tramites: Math.round(plansCostPlan2),
            total: Math.round(totalPricePlan2),
            precioWatt: Number(pricePerWattPlan2.toFixed(2)),
            abonoInicial: Math.round(initialPaymentPlan2),
            saldoPendiente: Math.round(remainingBalancePlan2),
            cuotaMensual: Math.round(monthlyPaymentPlan2)
          }
        }
      };
      
      setProposalData(data);
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

  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Generación kWh',
        data: proposalData.produccion.mensual,
        backgroundColor: '#FF371E',
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'kWh',
          color: '#323131',
        },
        ticks: {
          color: '#323131',
        }
      },
      x: {
        ticks: {
          color: '#323131',
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#060100',
        bodyColor: '#323131',
        borderColor: '#EEEEEE',
        borderWidth: 1,
      }
    },
  };
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
              {/* Resumen Tab */}
              {activeTab === 'resumen' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-bold text-solarmente-title mb-4">Resumen del Sistema</h2>
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Consumo Mensual</p>
                            <p className="text-2xl font-bold text-solarmente-title">{proposalData.cliente.consumo} kWh</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tamaño del Sistema</p>
                            <p className="text-2xl font-bold text-solarmente-title">{proposalData.sistema.tamano} kW</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Paneles Solares</p>
                            <p className="text-2xl font-bold text-solarmente-title">{proposalData.sistema.paneles}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Espacio Requerido</p>
                            <p className="text-2xl font-bold text-solarmente-title">{proposalData.sistema.espacioTecho} m²</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Ahorro Mensual</p>
                            <p className="text-2xl font-bold text-solarmente-title">${proposalData.financiero.ahorroMensual}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Retorno de Inversión</p>
                            <p className="text-2xl font-bold text-solarmente-title">{proposalData.sistema.roi} años</p>
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-bold text-solarmente-title mt-8 mb-4">Impacto Ambiental</h2>
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Reducción de CO₂</p>
                            <p className="text-2xl font-bold text-green-600">{proposalData.ambiental.co2Reducido} toneladas</p>
                            <p className="text-xs text-gray-400">Anual</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Petróleo Evitado</p>
                            <p className="text-2xl font-bold text-green-600">{proposalData.ambiental.petroleoReducido} galones</p>
                            <p className="text-xs text-gray-400">Anual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold text-solarmente-title mb-4">Generación Mensual Estimada</h2>
                      <div className="bg-white rounded-lg p-5 border border-gray-200 h-80">
                        <Bar data={chartData} options={chartOptions} />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 flex flex-col items-center justify-center">
                          <p className="text-sm text-gray-500 mb-1">Producción Anual</p>

                          <p className="text-3xl font-bold text-solarmente-title mb-1">
                            {proposalData.produccion.anual.toLocaleString()} kWh
                          </p>
                          <p className="text-xs text-gray-400">{proposalData.financiero.porcentajeAhorro}% de tu consumo</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 flex flex-col items-center justify-center">
                          <p className="text-sm text-gray-500 mb-1">Ahorro a 30 Años</p>
                          <p className="text-3xl font-bold text-solarmente-title mb-1">
                            ${proposalData.financiero.ahorro30Anos.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">Estimado en base a precios actuales</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-lg mb-4">
                      ¿Listo para dar el siguiente paso hacia la energía solar?
                    </p>
                    <a 
                      href={`https://wa.me/50765657575?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(proposalData.cliente.nombre)}%20y%20acabo%20de%20generar%20una%20propuesta%20en%20su%20sitio%20web.%20Me%20gustaría%20más%20información.`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
                    >
                      Contáctanos por WhatsApp
                    </a>
                  </div>
                </div>
              )}
              {/* Sistema Tab */}
              {activeTab === 'sistema' && (
                <div>
                  <h2 className="text-xl font-bold text-solarmente-title mb-6">Detalles del Sistema Solar</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
                        <h3 className="text-lg font-semibold text-solarmente-title mb-4">Componentes</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Tamaño del Sistema</p>
                            <p className="text-xl font-bold text-solarmente-title">{proposalData.sistema.tamano} kW</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Paneles Solares</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {proposalData.sistema.paneles} x {proposalData.sistema.tamanoPanel}W Paneles Monocristalinos
                            </p>
                            <p className="text-xs text-gray-400">Garantía de 30 años</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Inversores</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {proposalData.sistema.detalle_inversores}
                            </p>
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
                            <p className="text-xl font-bold text-solarmente-title">{proposalData.sistema.espacioTecho} m²</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Dimensiones Aproximadas</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {Math.ceil(Math.sqrt(proposalData.sistema.espacioTecho))}m x {Math.ceil(Math.sqrt(proposalData.sistema.espacioTecho))}m
                            </p>
                            <p className="text-xs text-gray-400">La configuración exacta dependerá de su techo</p>
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
                              {Math.round(proposalData.produccion.promedioMensual / 30)} kWh
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Producción Mensual Promedio</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {proposalData.produccion.promedioMensual} kWh
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Producción Anual Estimada</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {proposalData.produccion.anual} kWh
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Eficiencia del Sistema</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {SYSTEM_EFFICIENCY * 100}%
                            </p>
                            <p className="text-xs text-gray-400">Considerando factor de pérdida</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h3 className="text-lg font-semibold text-solarmente-title mb-4">Instalación y Garantías</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Tiempo de Instalación</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              {Math.max(3, Math.ceil(proposalData.sistema.tamano / 10))} días
                            </p>
                          </div>
                          
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
                            <p className="text-sm text-gray-500">Garantía de Instalación</p>
                            <p className="text-xl font-bold text-solarmente-title">
                              5 años
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Financiero Tab */}
              {activeTab === 'financiero' && (
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
                              ${proposalData.financiero.ahorroMensual}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Ahorro Anual</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${proposalData.financiero.ahorroAnual}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Ahorro a 30 Años</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${proposalData.financiero.ahorro30Anos.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="pt-2 border-t border-gray-300">
                            <p className="text-sm text-gray-500">Reducción de Factura</p>
                            <p className="text-2xl font-bold text-solarmente-title">
                              {proposalData.financiero.porcentajeAhorro}%
                            </p>
                            {proposalData.financiero.excedente > 0 && (
                              <p className="text-sm text-green-600">
                                Con {proposalData.financiero.excedente}% de excedente
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h3 className="text-lg font-semibold text-solarmente-title mb-4">Valor del Sistema</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Inversión Total (Plan 1)</p>
                            <p className="text-2xl font-bold text-solarmente-title">
                              ${proposalData.precios.plan1.total.toLocaleString()}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Costo por Watt</p>
                            <p className="text-2xl font-bold text-solarmente-title">
                              ${proposalData.precios.plan1.precioWatt}
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
                              {proposalData.sistema.roi} años
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Tasa de Retorno Anual</p>
                            <p className="text-2xl font-bold text-solarmente-title">
                              {Math.round(100 / proposalData.sistema.roi)}%
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
                              ${Math.round(proposalData.cliente.consumo * ELECTRICITY_RATE)}
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
                              ${Math.round(proposalData.precios.plan1.total * 0.6).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">Estimado</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Planes de Pago Tab */}
              {activeTab === 'planes' && (
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
                          ${proposalData.precios.plan1.total.toLocaleString()}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Mejor Precio
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Sistema Solar</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.sistema.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Instalación</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.instalacion.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Planos y Trámites</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.tramites.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                          <span className="text-sm text-gray-700">Total</span>
                          <span className="text-sm text-gray-900">
                            ${proposalData.precios.plan1.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="text-md font-semibold text-solarmente-title mb-3">Etapas de Pago</h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">1er Abono (Inicio)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.abono1.toLocaleString()} (60%)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">2do Abono (Entrega materiales)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.abono2.toLocaleString()} (30%)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">3er Abono (Finalización)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan1.abono3.toLocaleString()} (10%)
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        
                          href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%201%20para%20mi%20sistema%20solar%20de%20${proposalData.sistema.tamano}kW.`}
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
                          ${proposalData.precios.plan2.total.toLocaleString()}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Financiamiento
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Sistema Solar</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.sistema.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Instalación</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.instalacion.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Planos y Trámites</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.tramites.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                          <span className="text-sm text-gray-700">Total</span>
                          <span className="text-sm text-gray-900">
                            ${proposalData.precios.plan2.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="text-md font-semibold text-solarmente-title mb-3">Plan de Financiamiento</h4>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Abono Inicial (70%)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.abonoInicial.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Saldo a Financiar (30%)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.saldoPendiente.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Cuota Mensual (6 meses)</span>
                          <span className="text-sm font-medium text-gray-700">
                            ${proposalData.precios.plan2.cuotaMensual.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6">
                        
                          href={`https://wa.me/50765657575?text=Hola,%20estoy%20interesado/a%20en%20el%20plan%202%20con%20financiamiento%20para%20mi%20sistema%20solar%20de%20${proposalData.sistema.tamano}kW.`}
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
                      <li>Te ahorrará ${proposalData.financiero.ahorroAnual.toLocaleString()} cada año en facturas de electricidad</li>
                      <li>Protegerá tu hogar de los aumentos en las tarifas eléctricas</li>
                      <li>Aumentará el valor de tu propiedad</li>
                      <li>Reducirá tu huella de carbono</li>
                    </ul>
                    <p className="text-sm text-green-700">
                      Contacta a nuestro equipo hoy mismo para iniciar tu proyecto solar.
                    </p>
                  </div>
                </div>
              )}
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