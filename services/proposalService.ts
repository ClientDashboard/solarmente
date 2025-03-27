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
    // Calculate estimated savings
    const ahorroEstimado = calculateEstimatedSavings(formData.consumo);

    // Prepare data for Supabase
    const proposalData = {
      ...formData,
      ahorro_estimado: ahorroEstimado,
      created_at: new Date().toISOString()
    };

    // Save to Supabase and get the ID
    const { data, error } = await supabase
      .from('solar_proposals')
      .insert([proposalData])
      .select();

    if (error) throw error;
    
    // Generate proposal URL with ID instead of query params
    // Esta es una forma más segura y limpia de generar URLs
    const proposalId = data[0].id;
    const propuestaUrl = `https://solarmente.io/propuesta/${proposalId}`;
    
    // Update the record with the URL
    const { error: updateError } = await supabase
      .from('solar_proposals')
      .update({ propuesta_url: propuestaUrl })
      .eq('id', proposalId);
      
    if (updateError) throw updateError;

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

    return { ...data[0], propuesta_url: propuestaUrl };
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