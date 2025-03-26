// services/proposalService.ts
import { createClient } from '@supabase/supabase-js';
import { 
  sendClientProposalEmail, 
  sendAdminNotificationEmail 
} from './email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function processProposal(formData: {
  nombre: string;
  email: string;
  telefono: string;
  consumo: number;
  tipoPropiedad: string;
  provincia: string;
  faseElectrica: string;
}) {
  try {
    // Generate proposal URL
    const queryParams = new URLSearchParams({
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      consumo: formData.consumo.toString(),
      tipoPropiedad: formData.tipoPropiedad,
      provincia: formData.provincia,
      faseElectrica: formData.faseElectrica
    });
    const propuestaUrl = `https://solarmente.io/propuesta/resultado?${queryParams.toString()}`;
    
    // Calculate estimated savings
    const ahorroEstimado = calculateEstimatedSavings(formData.consumo);

    // Prepare data for Supabase
    const proposalData = {
      ...formData,
      propuesta_url: propuestaUrl,
      ahorro_estimado: ahorroEstimado,
      created_at: new Date().toISOString()
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('solar_proposals')
      .insert([proposalData])
      .select();

    if (error) throw error;

    // Send emails
    await Promise.all([
      sendClientProposalEmail({
        nombre: formData.nombre,
        email: formData.email,
        propuestaUrl,
        ahorroEstimado
      }),
      sendAdminNotificationEmail({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipoInstalacion: formData.tipoPropiedad,
        consumo: formData.consumo,
        propuestaUrl,
        ahorroEstimado
      })
    ]);

    return data;
  } catch (error) {
    console.error('Error procesando propuesta:', error);
    throw error;
  }
}

// Utility function to calculate estimated savings
function calculateEstimatedSavings(consumo: number): number {
  const tarifaPromedio = 0.26; // $0.26/kWh
  return Number((consumo * tarifaPromedio).toFixed(2));
}