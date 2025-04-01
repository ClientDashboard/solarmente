// services/proposalService.ts
import { createClient } from '@supabase/supabase-js';
import { sendClientProposalEmail, sendAdminNotificationEmail } from './email';

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
    console.log('Processing proposal with data:', formData);

    // Calcular el ahorro estimado
    const ahorroEstimado = calculateEstimatedSavings(formData.consumo);
    console.log('Estimated Savings:', ahorroEstimado);

    // Preparar datos para Supabase usando los nombres de campo correctos
    const proposalData = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      consumo: formData.consumo,
      tipo_propiedad: formData.tipoPropiedad,  // Campo en Supabase
      provincia: formData.provincia,
      fase_electrica: formData.faseElectrica,    // Campo en Supabase
      ahorro_estimado: ahorroEstimado,
      created_at: new Date().toISOString()
    };

    console.log('Inserting proposal data into Supabase:', proposalData);

    // Insertar la propuesta en Supabase y obtener el registro insertado
    const { data, error } = await supabase
      .from('solar_proposals')
      .insert([proposalData])
      .select();

    if (error) {
      console.error('Error inserting proposal:', error);
      throw error;
    }
    if (!data || data.length === 0) {
      throw new Error('No se obtuvo el registro de la propuesta');
    }
    console.log('Proposal inserted:', data);

    // Generar la URL de la propuesta usando el ID obtenido
    const proposalId = data[0].id;
    const propuestaUrl = `https://solarmente.io/propuesta/${proposalId}`;
    console.log('Generated proposal URL:', propuestaUrl);

    // Actualizar el registro con la URL de la propuesta
    const { error: updateError } = await supabase
      .from('solar_proposals')
      .update({ propuesta_url: propuestaUrl })
      .eq('id', proposalId);
      
    if (updateError) {
      console.error('Error updating proposal URL:', updateError);
      throw updateError;
    }
    console.log('Proposal URL updated in Supabase.');

    // Enviar correos (usando SendGrid) en paralelo
    console.log('Sending emails to client and admin...');
    await Promise.all([
      sendClientProposalEmail(formData.email, formData.nombre, propuestaUrl, ahorroEstimado),
      sendAdminNotificationEmail(
        'ventas@solarmente.io',
        formData.nombre,
        formData.email,
        propuestaUrl,
        formData.telefono,
        formData.tipoPropiedad,
        formData.provincia, // <-- Add the provincia parameter here
        formData.consumo,   // <-- Now consumo is in the correct position
        ahorroEstimado
      )
    ]);
    console.log('Emails sent successfully.');

    return { ...data[0], propuesta_url: propuestaUrl };
  } catch (error) {
    console.error('Error processing proposal:', error);
    throw error;
  }
}

// Función utilitaria para calcular el ahorro estimado
function calculateEstimatedSavings(consumo: number): number {
  const tarifaPromedio = 0.26; // $0.26/kWh
  return Number((consumo * tarifaPromedio).toFixed(2));
}
