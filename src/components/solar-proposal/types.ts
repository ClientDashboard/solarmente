// types.ts
// Interfaces y tipos para la propuesta solar

export interface ClienteData {
  nombre: string;
  telefono: string;
  email: string;
  consumo: number;
}

export interface SistemaData {
  tamano: number;
  paneles: number;
  espacioTecho: number;
  tamanoPanel: number;
  inversores: number;
  detalle_inversores: string;
  roi: number;
}

export interface FinancieroData {
  ahorro25Anos: number;
  ahorro30Anos: number;
  ahorroAnual: number;
  ahorroMensual: number;
  porcentajeAhorro: number;
  excedente: number;
}

export interface AmbientalData {
  petroleoReducido: number;
  co2Reducido: number;
}

export interface ProduccionData {
  mensual: number[];
  promedioMensual: number;
  anual: number;
}

export interface PlanPrecio {
  sistema: number;
  instalacion: number;
  tramites: number;
  total: number;
  precioWatt: number;
}

export interface Plan1Data extends PlanPrecio {
  abono1: number;
  abono2: number;
  abono3: number;
}

export interface Plan2Data extends PlanPrecio {
  abonoInicial: number;
  saldoPendiente: number;
  cuotaMensual: number;
}

export interface PreciosData {
  plan1: Plan1Data;
  plan2: Plan2Data;
}

export interface ProposalData {
  cliente: ClienteData;
  sistema: SistemaData;
  financiero: FinancieroData;
  ambiental: AmbientalData;
  produccion: ProduccionData;
  precios: PreciosData;
}

// Tipo para los cálculos sin incluir cliente
export type CalculosData = Omit<ProposalData, 'cliente'>;
