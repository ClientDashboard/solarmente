// src/lib/utils/proposalCalculations.ts
import { ProposalData } from '../../components/solar-proposal/types';
import { calcularPropuesta } from '../../components/solar-proposal/calculators';

/**
 * Retrieves proposal data from Supabase and generates the complete proposal
 * using the calculation functions.
 */
export async function getProposalData(proposalId: string, supabase: any): Promise<ProposalData | null> {
  try {
    // Fetch proposal data from Supabase
    const { data, error } = await supabase
      .from('solar_proposals')
      .select('*')
      .eq('id', proposalId)
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    // Determine if the installation is monophasic (default to true if not specified)
    const esMonofasico = data.faseElectrica ? data.faseElectrica !== 'trifasico' : true;
    
    // Calculate proposal details using the existing function
    const calculosResultado = calcularPropuesta(data.consumo, esMonofasico);
    
    // Set all proposal data
    return {
      cliente: {
        nombre: data.nombre,
        telefono: data.telefono || '+507 XXXXXXXX',
        email: data.email,
        consumo: data.consumo
      },
      ...calculosResultado
    };
  } catch (error) {
    console.error("Error fetching proposal data:", error);
    return null;
  }
}