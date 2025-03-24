// constants.ts
// Archivo con todas las constantes del sistema solar

// Constantes del panel y sistema
export const PANEL_SIZE_WATTS = 585;
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
export const CO2_REDUCTION_PER_KW = 0.9; // toneladas por kW
