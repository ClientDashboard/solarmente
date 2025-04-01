// src/app/api/proposal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    // Log initial headers for diagnosis
    console.log('POST Request received:', {
      contentType: request.headers.get('content-type'),
      contentLength: request.headers.get('content-length')
    });

    // Parse the form data
    const data = await request.json();
    console.log('Received Proposal Data:', {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      consumo: data.consumo,
      tipoPropiedad: data.tipoPropiedad,
      provincia: data.provincia,
      faseElectrica: data.faseElectrica
    });

    const { 
      nombre, 
      email, 
      telefono, 
      consumo, 
      tipoPropiedad, // from form data
      provincia, 
      faseElectrica // from form data
    } = data;

    // Validate required fields
    const missingFields = [];
    if (!nombre) missingFields.push('nombre');
    if (!email) missingFields.push('email');
    if (!telefono) missingFields.push('telefono');
    if (!consumo) missingFields.push('consumo');

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: 'Faltan campos requeridos', missingFields },
        { status: 400 }
      );
    }

    // Calculate estimated savings
    const tarifaPromedio = 0.26; // $0.26 per kWh
    const ahorroEstimado = Number((consumo * tarifaPromedio).toFixed(2));
    console.log('Estimated Savings:', ahorroEstimado);

    // Format phone number
    const telefonoFormatted = telefono.startsWith('+') ? telefono : `+507${telefono.replace(/\s+/g, '')}`;

    // Generate a UUID for the proposal
    const proposalId = uuidv4();

    // Determine environment and base URL
    const isLocalDev = process.env.NODE_ENV === 'development';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (isLocalDev ? 'http://localhost:3007' : 'https://solarmente.io');
    const propuestaUrl = `${baseUrl}/propuesta/${proposalId}`;
    console.log(`Generando URL: ${propuestaUrl} (Entorno: ${isLocalDev ? 'desarrollo' : 'producción'})`);

    // Prepare data for insertion into 'solar_proposals'
    const proposalData = {
      id: proposalId,
      nombre,
      email,
      telefono: telefonoFormatted,
      consumo,
      tipo_propiedad: tipoPropiedad,
      provincia,
      fase_electrica: faseElectrica,
      propuesta_url: propuestaUrl,
      ahorro_estimado: ahorroEstimado,
      created_at: new Date().toISOString()
    };
    console.log('Guardando en solar_proposals:', proposalData);
    console.log('Attempting Supabase insert with prepared data:', {
      id: proposalData.id,
      fields: Object.keys(proposalData)
    });

    // Insert into Supabase
    const { data: proposalResult, error: insertError } = await supabase
      .from('solar_proposals')
      .insert(proposalData)
      .select();

    console.log('Supabase insert complete:', {
      success: !insertError,
      hasData: !!proposalResult && proposalResult.length > 0,
      error: insertError ? `${insertError.code || 'unknown'}: ${insertError.message || 'No message'}` : null
    });

    if (insertError) {
      console.error('Error inserting proposal:', insertError);
      return NextResponse.json(
        { error: 'Error al guardar la propuesta en la base de datos: ' + insertError.message },
        { status: 500 }
      );
    }
    if (!proposalResult || proposalResult.length === 0) {
      return NextResponse.json(
        { error: 'No se pudo crear la propuesta' },
        { status: 500 }
      );
    }

    // Register tracking for proposal creation
    try {
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: proposalId,
          tipo: 'propuesta_creada',
          notas: 'Propuesta solar creada automáticamente',
          fecha: new Date().toISOString(),
          usuario: 'sistema'
        });
      console.log('Tracking for proposal creation recorded.');
    } catch (seguimientoError) {
      console.error('Error recording tracking (non-critical):', seguimientoError);
    }

    // Force sending emails even in development (for testing)
    let emailStatus = { clienteEnviado: false, adminEnviado: false };
    try {
      // Fix: Use a more reliable URL construction for the email API
      // Make sure the API endpoint is correctly formed
      const emailApiUrl = `${baseUrl}/api/send-email`;
      console.log(`Sending emails via API endpoint: ${emailApiUrl}`);
      
      const emailResponse = await fetch(emailApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nombre,
          propuestaUrl,
          ahorroEstimado,
          telefono: telefonoFormatted,
          tipoPropiedad,
          provincia,
          consumo,
          adminEmail: process.env.ADMIN_EMAIL || 'ventas@solarmente.io'
        }),
      });
      
      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        emailStatus = emailResult.emailStatus || { clienteEnviado: true, adminEnviado: true };
        console.log('Emails enviados exitosamente:', emailStatus);
      } else {
        console.error('Error sending emails via endpoint:', await emailResponse.text());
      }
      
      // Record tracking for email sending
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: proposalId,
          tipo: 'emails_enviados',
          notas: `Emails enviados: cliente=${email}, admin=${process.env.ADMIN_EMAIL || 'ventas@solarmente.io'}`,
          fecha: new Date().toISOString(),
          usuario: 'sistema'
        });
      console.log('Tracking for email sending recorded.');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : 'Error desconocido';
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: proposalId,
          tipo: 'error_emails',
          notas: `Error al enviar emails: ${errorMessage}. Estado: ${JSON.stringify(emailStatus)}`,
          fecha: new Date().toISOString(),
          usuario: 'sistema'
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Propuesta creada exitosamente',
      propuestaUrl,
      solicitudId: proposalId,
      emailsEnviados: emailStatus
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error processing proposal:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + errorMessage },
      { status: 500 }
    );
  }
}