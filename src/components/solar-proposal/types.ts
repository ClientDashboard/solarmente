// types.ts
export interface CalculosData {
  sistema: {
    tamano: number;
    paneles: number;
    espacioTecho: number;
    tamanoPanel: number;
    inversores: number;
    detalle_inversores: string;
    roi: number;
    // NUEVOS CAMPOS para el EquiposTab
    marcaPanel: string;
    modeloPanel: string;
    potenciaPanel: number;
    eficienciaPanel: number;
    marcaInversor: string;
    modeloInversor: string;
    potenciaInversor: number;
    tipoInversor: string;
    eficienciaInversor: number;
    cantidadInversores: number;
    esMonofasico: boolean;
  };
  financiero: {
    ahorro25Anos: number;
    ahorro30Anos: number;
    ahorroAnual: number;
    ahorroMensual: number;
    porcentajeAhorro: number;
    excedente: number;
  };
  ambiental: {
    petroleoReducido: number;
    co2Reducido: number;
  };
  produccion: {
    mensual: number[];
    promedioMensual: number;
    anual: number;
  };
  precios: {
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
  };
}

export interface ProposalData {
  cliente: {
    nombre: string;
    telefono: string;
    email: string;
    consumo: number;
  };
  sistema: {
    tamano: number;
    paneles: number;
    espacioTecho: number;
    tamanoPanel: number;
    inversores: number;
    detalle_inversores: string;
    roi: number;
    // NUEVOS CAMPOS para el EquiposTab
    marcaPanel: string;
    modeloPanel: string;
    potenciaPanel: number;
    eficienciaPanel: number;
    marcaInversor: string;
    modeloInversor: string;
    potenciaInversor: number;
    tipoInversor: string;
    eficienciaInversor: number;
    cantidadInversores: number;
    esMonofasico: boolean;
  };
  financiero: {
    ahorro25Anos: number;
    ahorro30Anos: number;
    ahorroAnual: number;
    ahorroMensual: number;
    porcentajeAhorro: number;
    excedente: number;
  };
  ambiental: {
    petroleoReducido: number;
    co2Reducido: number;
  };
  produccion: {
    mensual: number[];
    promedioMensual: number;
    anual: number;
  };
  precios: {
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
  };
}