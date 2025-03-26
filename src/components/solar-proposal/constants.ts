// src/components/solar-proposal/constants.ts
// Archivo con todas las constantes del sistema solar

// Constantes del panel y sistema
export const PANEL_SIZE_WATTS = 585; // Actualizado a 585W
export const PANEL_SIZE_KW = PANEL_SIZE_WATTS / 1000;
export const PANEL_AREA = 2.2;
export const SUN_PEAK_HOURS = 4.2; // Horas pico de sol
export const SYSTEM_EFFICIENCY = 0.85;
export const ELECTRICITY_RATE = 0.26;
export const DAYS_YEAR = 364;

// Costos del sistema
export const SYSTEM_COST_PER_WATT = 0.50;
export const INSTALLATION_COST_PER_WATT = 0.08;
export const PLANS_PERMITS_COST_PER_WATT = 0.04;

// Márgenes de ganancia por plan
export const PLAN1_MARGIN = 0.70; // 70% para Plan 1
export const PLAN2_MARGIN = 1.00; // 100% para Plan 2

// Porcentajes de pago
export const PLAN1_PAYMENT1_PERCENT = 0.60;
export const PLAN1_PAYMENT2_PERCENT = 0.30;
export const PLAN1_PAYMENT3_PERCENT = 0.10;
export const PLAN2_INITIAL_PERCENT = 0.70;
export const PLAN2_REMAINDER_PERCENT = 0.30;
export const PLAN2_PAYMENT_MONTHS = 6;

// Irradiancia promedio mensual para cálculo de producción (kWh/m²/día)
export const MONTHLY_IRRADIANCE = [
  5.37, // Enero
  5.85, // Febrero
  6.22, // Marzo
  5.8,  // Abril
  4.71, // Mayo
  4.4,  // Junio
  4.24, // Julio
  4.43, // Agosto
  4.62, // Septiembre
  4.31, // Octubre
  3.95, // Noviembre
  4.39  // Diciembre
];

// Constantes para cálculos ambientales
export const OIL_REDUCTION_PER_KW = 63; // galones por kW
export const CO2_REDUCTION_PER_KW = 0.9;  // toneladas por kW

// Información del panel solar
export const PANEL_BRAND = "LONGi Solar";
export const PANEL_MODEL = "Hi-MO X6";
export const PANEL_EFFICIENCY = 22.6;
export const PANEL_DIMENSIONS = {
  length: 2.278, // metros
  width: 1.134,  // metros
  area: 2.583   // metros cuadrados
};

// Parámetros para dimensionamiento de inversores
export const PANEL_VOLTAGE = 52.36;       // Voltaje del panel (V)
export const MPPT_MAX_VOLTAGE = 520;        // Máximo voltaje permitido por el MPPT (V)
export const MPPT_MIN_VOLTAGE = 90;         // Voltaje mínimo para arrancar el MPPT

// INTERFAZ para inversores con información técnica adicional
export interface Inverter {
  model: string;
  power: number;          // kW nominal
  maxPanels: number;      // Calculado a partir de la potencia de entrada máxima recomendada
  maxInputPower?: number; // Potencia de entrada máxima recomendada (en watts)
  mpptRange?: [number, number];  // [mínimo, máximo] en volts
  mpptStrings?: number;   // Número máximo de cadenas (strings) de entrada
}

// Inversores monofásicos Solis (de 5 kW a 10 kW) con información extra tomada de los PDF:
export const SOLIS_MONOFASIC_INVERTERS: Inverter[] = [
  {
    model: "S6-GR1P5K",
    power: 5,
    maxPanels: Math.floor(5800 / PANEL_SIZE_WATTS), // 5800W → 9 paneles (aprox)
    maxInputPower: 5800,  // 5.8 kW recomendados en entrada (W)
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
  {
    model: "S6-GR1P6K",
    power: 6,
    maxPanels: Math.floor(6600 / PANEL_SIZE_WATTS),
    maxInputPower: 6600,
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
  {
    model: "S6-GR1P7K",
    power: 7,
    maxPanels: Math.floor(8000 / PANEL_SIZE_WATTS),
    maxInputPower: 8000,
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
  {
    model: "S6-GR1P8K",
    power: 8,
    maxPanels: Math.floor(9200 / PANEL_SIZE_WATTS),
    maxInputPower: 9200,
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
  {
    model: "S6-GR1P9K",
    power: 9,
    maxPanels: Math.floor(10800 / PANEL_SIZE_WATTS),
    maxInputPower: 10800,
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
  {
    model: "S6-GR1P10K",
    power: 10,
    maxPanels: Math.floor(11500 / PANEL_SIZE_WATTS), // 11500/585 ≈ 19
    maxInputPower: 11500,
    mpptRange: [MPPT_MIN_VOLTAGE, MPPT_MAX_VOLTAGE],
    mpptStrings: 2,
  },
];

// Inversores trifásicos Solis (sin información extra en este ejemplo)
export const SOLIS_TRIFASIC_INVERTERS = [
  { model: "Solis-3P5K-4G", power: 5, maxPanels: Math.floor(5000 / PANEL_SIZE_WATTS) },
  { model: "Solis-3P8K-4G", power: 8, maxPanels: Math.floor(8000 / PANEL_SIZE_WATTS) },
  { model: "Solis-3P10K-4G", power: 10, maxPanels: Math.floor(10000 / PANEL_SIZE_WATTS) },
  { model: "Solis-3P15K-4G", power: 15, maxPanels: Math.floor(15000 / PANEL_SIZE_WATTS) },
  { model: "Solis-3P20K-4G", power: 20, maxPanels: Math.floor(20000 / PANEL_SIZE_WATTS) },
  { model: "S5-GC25K", power: 25, maxPanels: Math.floor(25000 / PANEL_SIZE_WATTS) },
  { model: "S5-GC30K", power: 30, maxPanels: Math.floor(30000 / PANEL_SIZE_WATTS) },
  { model: "S5-GC40K", power: 40, maxPanels: Math.floor(40000 / PANEL_SIZE_WATTS) }
];

// Eficiencias de inversores
export const INVERTER_EFFICIENCY_MONO = 97.7;
export const INVERTER_EFFICIENCY_TRI = 98.7;
