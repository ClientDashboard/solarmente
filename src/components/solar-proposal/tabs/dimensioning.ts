// dimensioning.ts
import { PANEL_SIZE_WATTS, PANEL_VOLTAGE, MPPT_MAX_VOLTAGE } from "../constants";
import { Inverter } from "../constants";

/**
 * Representa la información de dimensionamiento calculada para un inversor.
 */
export interface InverterDimensioning {
  maxPanelsByPower: number;    // Número máximo de paneles según la potencia recomendada (maxInputPower)
  maxPanelsPerString: number;  // Número máximo de paneles en serie (sin exceder MPPT_MAX_VOLTAGE)
  distribution: number[];      // Distribución de paneles por cada cadena (string)
}

/**
 * Representa la elección de un inversor para una parte del sistema.
 */
export interface InverterChoice {
  model: string;
  panelsPerInverter: number[]; // Por ejemplo: [10, 9] para 10kW (total 19 paneles)
}

/**
 * Calcula el dimensionamiento de paneles para un inversor dado.
 * Usa maxInputPower para determinar cuántos paneles se pueden conectar (maxPanelsByPower)
 * y el límite de voltaje para determinar el máximo en serie (maxPanelsPerString).
 *
 * @param inverter Inversor con sus datos técnicos.
 * @returns La información de dimensionamiento.
 */
export function dimensionarInversor(inverter: Inverter): InverterDimensioning {
  const maxPanelsByPower = Math.floor(inverter.maxInputPower! / PANEL_SIZE_WATTS);
  // Usamos Math.ceil para permitir hasta 10 paneles por cadena (por ejemplo, 520/52.36 ≈ 9.94 → 10)
  const maxPanelsPerString = Math.ceil(MPPT_MAX_VOLTAGE / PANEL_VOLTAGE);
  const numStrings = inverter.mpptStrings || 1;

  const totalByVoltageLimit = maxPanelsPerString * numStrings;
  let distribution: number[] = [];
  if (maxPanelsByPower > totalByVoltageLimit) {
    distribution = new Array(numStrings).fill(maxPanelsPerString);
    let extra = maxPanelsByPower - totalByVoltageLimit;
    for (let i = 0; i < numStrings && extra > 0; i++) {
      distribution[i] += 1;
      extra--;
    }
  } else {
    let panelsLeft = maxPanelsByPower;
    for (let i = 0; i < numStrings; i++) {
      let panelsForThisString = Math.ceil(panelsLeft / (numStrings - i));
      panelsForThisString = Math.min(panelsForThisString, maxPanelsPerString);
      distribution.push(panelsForThisString);
      panelsLeft -= panelsForThisString;
    }
  }
  return {
    maxPanelsByPower,
    maxPanelsPerString,
    distribution,
  };
}

/**
 * Función para elegir la combinación óptima de inversores dada una lista de inversores disponibles
 * y el total de paneles del sistema. Por simplicidad, en este ejemplo se asume que se usa
 * el inversor de mayor potencia disponible (por ejemplo, S6-GR1P10K) para dimensionar la parte.
 *
 * @param totalPanels Número total de paneles en el sistema.
 * @param availableInverters Lista de inversores disponibles.
 * @returns Un arreglo de elecciones, donde cada elemento indica el modelo y la distribución de paneles.
 */
export function chooseInverters(
  totalPanels: number,
  availableInverters: Inverter[]
): InverterChoice[] {
  if (availableInverters.length === 0) return [];
  // Seleccionamos el inversor de mayor potencia (se puede ajustar según criterios de optimización)
  const candidate = availableInverters.reduce((prev, curr) =>
    curr.power > prev.power ? curr : prev
  );
  const candidateDimension = dimensionarInversor(candidate);
  const numInv = Math.ceil(totalPanels / candidateDimension.maxPanelsByPower);
  const choices: InverterChoice[] = [];
  for (let i = 0; i < numInv; i++) {
    choices.push({
      model: candidate.model,
      panelsPerInverter: candidateDimension.distribution,
    });
  }
  return choices;
}
