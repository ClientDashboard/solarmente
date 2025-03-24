// Create a types directory first with mkdir -p types

export interface ClientData {
    nombre: string;
    telefono: string;
    email: string;
    consumo: number;
  }
  
  export interface ProposalData {
    cliente: ClientData;
    // We can add more calculated fields here later
  }
  
  export interface CalculatedValues {
    ahorroMensual: number;
    capacidadSistema: number;
    numeroPaneles: number;
    inversionTotal: number;
    retornoInversion: number;
  }