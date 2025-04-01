// src/components/solar-proposal/types.ts

// Client information
export interface ClientData {
  nombre: string;
  telefono: string;
  email: string;
  consumo: number;
}

// System information
export interface SistemaData {
  tamano: number;
  paneles: number;
  tamanoPanel: number;
  espacioTecho: number;
  potenciaPanel?: number;
  eficienciaPanel?: string;
  roi: number;
  inversores: number;
  detalle_inversores?: string;
  marcaPanel?: string;
  modeloPanel?: string;
  marcaInversor?: string;
  modeloInversor?: string;
  potenciaInversor?: number;
  tipoInversor?: string;
  eficienciaInversor?: string;
}

// Financial information
export interface FinancieroData {
  ahorroMensual: number;
  ahorroAnual: number;
  ahorro30Anos: number;
  porcentajeAhorro: number;
  excedente?: number;
}

// Production data
export interface ProduccionData {
  mensual: number[];
  anual: number;
  promedioMensual: number;
}

// Environmental impact
export interface AmbientalData {
  co2Reducido: number;
  petroleoReducido: number;
}

// Prices for different plans
export interface PreciosPlan {
  total: number;
  sistema: number;
  instalacion: number;
  tramites: number;
  precioWatt: number;
  abono1?: number;
  abono2?: number;
  abono3?: number;
  abonoInicial?: number;
  saldoPendiente?: number;
  cuotaMensual?: number;
}

// All pricing plans
export interface PreciosData {
  plan1: PreciosPlan;
  plan2: PreciosPlan;
}

// Savings information
export interface AhorroData {
  mensual: number;
  anual: number;
}

// Complete proposal data structure
export interface ProposalData {
  cliente: ClientData;
  sistema: SistemaData;
  financiero: FinancieroData;
  produccion: ProduccionData;
  ambiental: AmbientalData;
  precios: PreciosData;
  ahorro: AhorroData;
}

// Define the file reader interface
declare global {
  interface Window {
    fs: {
      readFile: (
        path: string, 
        options?: { encoding?: string }
      ) => Promise<string | Uint8Array>;
    };
  }
}

// Note: No need to define Intercom here, it's already defined in @intercom/messenger-js-sdk