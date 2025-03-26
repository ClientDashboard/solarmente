// calculators.ts
// Funciones para realizar los cálculos del sistema solar

import { CalculosData } from './types';
import * as constants from './constants';

/**
 * Calcula el número de paneles necesarios para un consumo específico
 */
export function calcularPaneles(consumo: number): number {
  const consumoDiario = consumo / 30;
  const produccionRequerida = consumoDiario / constants.SYSTEM_EFFICIENCY;
  const systemSizeNeeded = produccionRequerida / constants.SUN_PEAK_HOURS;
  
  // Usamos Math.floor según la fórmula del Excel
  return Math.floor(systemSizeNeeded / constants.PANEL_SIZE_KW);
}

/**
 * Calcula el tamaño del sistema en kW
 */
export function calcularTamanoSistema(paneles: number): number {
  return paneles * constants.PANEL_SIZE_KW;
}

/**
 * Calcula el espacio requerido en el techo
 */
export function calcularEspacioTecho(paneles: number): number {
  return Math.ceil(paneles * constants.PANEL_AREA);
}

/**
 * Calcula la producción energética anual y mensual
 */
export function calcularProduccion(tamanoSistema: number): {
  anual: number;
  mensual: number;
  dataMensual: number[];
} {
  // Calculamos la producción diaria promedio por mes basada en la irradiancia de cada mes
  const produccionesDiarias = constants.MONTHLY_IRRADIANCE.map(irradiancia => 
    tamanoSistema * irradiancia * constants.SYSTEM_EFFICIENCY
  );
  
  // Calculamos la producción mensual (días de cada mes * producción diaria)
  const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const produccionesMensuales = produccionesDiarias.map((prod, i) => 
    Math.round(prod * diasPorMes[i])
  );
  
  // Calculamos la producción anual sumando los meses
  const produccionAnual = produccionesMensuales.reduce((sum, val) => sum + val, 0);
  
  // Producción mensual promedio
  const produccionMensual = Math.round(produccionAnual / 12);
  
  return {
    anual: produccionAnual,
    mensual: produccionMensual,
    dataMensual: produccionesMensuales
  };
}

/**
 * Calcula los ahorros financieros
 */
export function calcularAhorros(produccionAnual: number, consumo: number, produccionMensual: number): {
  ahorroAnual: number;
  ahorroMensual: number;
  ahorro25Anos: number;
  ahorro30Anos: number;
  porcentajeAhorro: number;
  excedente: number;
} {
  const ahorroAnual = Math.round(produccionAnual * constants.ELECTRICITY_RATE);
  const ahorroMensual = Math.round(ahorroAnual / 12);
  const ahorro25Anos = ahorroAnual * 25;
  const ahorro30Anos = ahorroAnual * 30;
  
  const porcentajeAhorro = Math.round((produccionMensual / consumo) * 100);
  const excedente = Math.max(0, porcentajeAhorro - 100);
  
  return {
    ahorroAnual,
    ahorroMensual,
    ahorro25Anos,
    ahorro30Anos,
    porcentajeAhorro,
    excedente
  };
}

/**
 * Calcula los precios del Plan 1
 */
export function calcularPlan1(tamanoSistemaWatts: number): Plan1Result {
  const baseCost = tamanoSistemaWatts * constants.SYSTEM_COST_PER_WATT;
  const totalProfit = baseCost * constants.PLAN1_MARGIN;
  const systemPrice = baseCost + totalProfit;
  const installationCost = tamanoSistemaWatts * constants.INSTALLATION_COST_PER_WATT;
  const plansCost = tamanoSistemaWatts * constants.PLANS_PERMITS_COST_PER_WATT;
  const totalPrice = systemPrice + installationCost + plansCost;
  const pricePerWatt = totalPrice / tamanoSistemaWatts;
  
  // Pagos
  const payment1 = totalPrice * constants.PLAN1_PAYMENT1_PERCENT;
  const payment2 = totalPrice * constants.PLAN1_PAYMENT2_PERCENT;
  const payment3 = totalPrice * constants.PLAN1_PAYMENT3_PERCENT;
  
  return {
    sistema: Math.round(systemPrice),
    instalacion: Math.round(installationCost),
    tramites: Math.round(plansCost),
    total: Math.round(totalPrice),
    precioWatt: Number(pricePerWatt.toFixed(2)),
    abono1: Math.round(payment1),
    abono2: Math.round(payment2),
    abono3: Math.round(payment3)
  };
}

/**
 * Calcula los precios del Plan 2
 */
export function calcularPlan2(tamanoSistemaWatts: number): Plan2Result {
  const baseCost = tamanoSistemaWatts * constants.SYSTEM_COST_PER_WATT;
  const totalProfit = baseCost * constants.PLAN2_MARGIN;
  const systemPrice = baseCost + totalProfit;
  const installationCost = tamanoSistemaWatts * constants.INSTALLATION_COST_PER_WATT;
  const plansCost = tamanoSistemaWatts * constants.PLANS_PERMITS_COST_PER_WATT;
  const totalPrice = systemPrice + installationCost + plansCost;
  const pricePerWatt = totalPrice / tamanoSistemaWatts;
  
  // Pagos
  const initialPayment = totalPrice * constants.PLAN2_INITIAL_PERCENT;
  const remainingBalance = totalPrice * constants.PLAN2_REMAINDER_PERCENT;
  const monthlyPayment = remainingBalance / constants.PLAN2_PAYMENT_MONTHS;
  
  return {
    sistema: Math.round(systemPrice),
    instalacion: Math.round(installationCost),
    tramites: Math.round(plansCost),
    total: Math.round(totalPrice),
    precioWatt: Number(pricePerWatt.toFixed(2)),
    abonoInicial: Math.round(initialPayment),
    saldoPendiente: Math.round(remainingBalance),
    cuotaMensual: Math.round(monthlyPayment)
  };
}

/**
 * Calcula el impacto ambiental
 */
export function calcularImpactoAmbiental(tamanoSistema: number): {
  petroleoReducido: number;
  co2Reducido: number;
} {
  return {
    petroleoReducido: Math.round(tamanoSistema * constants.OIL_REDUCTION_PER_KW),
    co2Reducido: Math.round(tamanoSistema * constants.CO2_REDUCTION_PER_KW)
  };
}

/**
 * Calcula el ROI (Retorno de Inversión)
 */
export function calcularROI(totalPrecio: number, ahorroAnual: number): number {
  return Math.round((totalPrecio / ahorroAnual) * 100) / 100;
}

/**
 * Obtiene información detallada sobre los paneles solares
 */
export function obtenerInfoPanel(): {
  marca: string;
  modelo: string;
  potencia: number;
  eficiencia: number;
  dimensiones: typeof constants.PANEL_DIMENSIONS;
} {
  return {
    marca: constants.PANEL_BRAND,
    modelo: constants.PANEL_MODEL,
    potencia: constants.PANEL_SIZE_WATTS,
    eficiencia: constants.PANEL_EFFICIENCY,
    dimensiones: constants.PANEL_DIMENSIONS
  };
}

/**
 * Selecciona el inversor apropiado basado en el tamaño del sistema y tipo de conexión
 */
export function seleccionarInversor(tamanoSistema: number, esMonofasico: boolean = true): {
  marca: string;
  modelo: string;
  potencia: number;
  eficiencia: number;
  cantidad: number;
} {
  // Convertir tamaño de sistema a Watts
  const potenciaSistemaWatts = tamanoSistema * 1000;
  
  // Seleccionar lista de inversores según tipo de conexión
  const inversores = esMonofasico ? constants.SOLIS_MONOFASIC_INVERTERS : constants.SOLIS_TRIFASIC_INVERTERS;
  
  // Encontrar el inversor adecuado o combinación de inversores
  let inversorSeleccionado;
  let cantidadInversores = 1;
  
  // Para sistemas pequeños, encontrar el inversor más cercano por encima de la potencia
  for (const inversor of inversores) {
    if (inversor.power >= tamanoSistema) {
      inversorSeleccionado = inversor;
      break;
    }
  }
  
  // Si no encontramos uno adecuado o es demasiado grande, usamos múltiples inversores
  if (!inversorSeleccionado || inversorSeleccionado.power > tamanoSistema * 1.5) {
    // Encontrar el inversor más grande en la lista
    inversorSeleccionado = inversores[inversores.length - 1];
    cantidadInversores = Math.ceil(tamanoSistema / inversorSeleccionado.power);
  }
  
  return {
    marca: "Solis",
    modelo: inversorSeleccionado.model,
    potencia: inversorSeleccionado.power,
    eficiencia: esMonofasico ? constants.INVERTER_EFFICIENCY_MONO : constants.INVERTER_EFFICIENCY_TRI,
    cantidad: cantidadInversores
  };
}

// Tipos específicos para los resultados de los planes
interface Plan1Result {
  sistema: number;
  instalacion: number;
  tramites: number;
  total: number;
  precioWatt: number;
  abono1: number;
  abono2: number;
  abono3: number;
}

interface Plan2Result {
  sistema: number;
  instalacion: number;
  tramites: number;
  total: number;
  precioWatt: number;
  abonoInicial: number;
  saldoPendiente: number;
  cuotaMensual: number;
}

/**
 * Función principal para calcular todos los datos de la propuesta
 */
export function calcularPropuesta(consumo: number, esMonofasico: boolean = true): CalculosData {
  // Cálculos del sistema
  const paneles = calcularPaneles(consumo);
  const tamanoSistema = calcularTamanoSistema(paneles);
  const espacioTecho = calcularEspacioTecho(paneles);
  
  // Cálculos de producción
  const { anual: produccionAnual, mensual: produccionMensual, dataMensual } = 
    calcularProduccion(tamanoSistema);
  
  // Cálculos financieros
  const {
    ahorroAnual,
    ahorroMensual,
    ahorro25Anos,
    ahorro30Anos,
    porcentajeAhorro,
    excedente
  } = calcularAhorros(produccionAnual, consumo, produccionMensual);
  
  // Tamaño del sistema en Watts
  const tamanoSistemaWatts = tamanoSistema * 1000;
  
  // Planes de pago
  const plan1 = calcularPlan1(tamanoSistemaWatts);
  const plan2 = calcularPlan2(tamanoSistemaWatts);
  
  // Impacto ambiental
  const impactoAmbiental = calcularImpactoAmbiental(tamanoSistema);
  
  // ROI
  const roi = calcularROI(plan1.total, ahorroAnual);
  
  // NUEVO: Información sobre los equipos
  const infoPanel = obtenerInfoPanel();
  const infoInversor = seleccionarInversor(tamanoSistema, esMonofasico);
  
  return {
    sistema: {
      tamano: Number(tamanoSistema.toFixed(2)),
      paneles: paneles,
      espacioTecho: espacioTecho,
      tamanoPanel: constants.PANEL_SIZE_WATTS,
      inversores: infoInversor.cantidad,
      detalle_inversores: `${infoInversor.cantidad}x ${infoInversor.marca} ${infoInversor.modelo}`,
      roi: roi,
      // NUEVOS CAMPOS para el EquiposTab
      marcaPanel: infoPanel.marca,
      modeloPanel: infoPanel.modelo,
      potenciaPanel: infoPanel.potencia,
      eficienciaPanel: infoPanel.eficiencia,
      marcaInversor: infoInversor.marca,
      modeloInversor: infoInversor.modelo,
      potenciaInversor: infoInversor.potencia,
      tipoInversor: esMonofasico ? "Monofásico" : "Trifásico",
      eficienciaInversor: infoInversor.eficiencia,
      cantidadInversores: infoInversor.cantidad,
      esMonofasico: esMonofasico
    },
    financiero: {
      ahorro25Anos: ahorro25Anos,
      ahorro30Anos: ahorro30Anos,
      ahorroAnual: ahorroAnual,
      ahorroMensual: ahorroMensual,
      porcentajeAhorro: porcentajeAhorro,
      excedente: excedente
    },
    ambiental: impactoAmbiental,
    produccion: {
      mensual: dataMensual,
      promedioMensual: produccionMensual,
      anual: produccionAnual
    },
    precios: {
      plan1: plan1,
      plan2: plan2
    }
  };
}