// src/app/api/proposal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendClientProposalEmail, sendAdminNotificationEmail } from '../../../../services/email';

// Inicializar Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    // Parsear los datos del formulario
    const data = await request.json();
    const { 
      nombre, 
      email, 
      telefono, 
      consumo, 
      tipoPropiedad,  // En el formulario es tipoPropiedad
      provincia, 
      faseElectrica    // En el formulario es faseElectrica
    } = data;
    
    // Validar campos requeridos
    if (!nombre || !email || !telefono || !consumo) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Calcular ahorro estimado
    const tarifaPromedio = 0.26; // $0.26 por kWh
    const ahorroEstimado = Number((consumo * tarifaPromedio).toFixed(2));
    
    // Formatear el teléfono para asegurar consistencia
    const telefonoFormatted = telefono.startsWith('+') ? telefono : `+507${telefono.replace(/\s+/g, '')}`;
    
    // Crear URL para la propuesta (temporal hasta que tengamos el ID)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarmente.io';
    const tempId = `temp-${Date.now()}`;
    let propuestaUrl = `${baseUrl}/propuesta/${tempId}`;
    
    // Preparar datos para insertar en solar_proposals
    // Usamos la estructura exacta de la tabla que has compartido
    const proposalData = {
      nombre,
      email,
      telefono: telefonoFormatted,
      consumo,
      tipo_propiedad: tipoPropiedad, // Mapeo a la columna correcta
      provincia,
      fase_electrica: faseElectrica, // Mapeo a la columna correcta
      ahorro_estimado: ahorroEstimado,
      created_at: new Date().toISOString()
    };
    
    console.log('Guardando en solar_proposals:', proposalData);
    
    // Guardar en solar_proposals
    const { data: proposalResult, error } = await supabase
      .from('solar_proposals')
      .insert(proposalData)
      .select();
      
    if (error) {
      console.error('Error al guardar propuesta:', error);
      return NextResponse.json(
        { error: 'Error al guardar la propuesta en la base de datos: ' + error.message },
        { status: 500 }
      );
    }
    
    if (!proposalResult || proposalResult.length === 0) {
      return NextResponse.json(
        { error: 'No se pudo crear la propuesta' },
        { status: 500 }
      );
    }
    
    // Obtener el ID de la propuesta creada
    const proposalId = proposalResult[0].id;
    
    // Actualizar la URL de la propuesta con el ID real
    propuestaUrl = `${baseUrl}/propuesta/${proposalId}`;
    
    // Actualizar el registro con la URL de la propuesta
    await supabase
      .from('solar_proposals')
      .update({ propuesta_url: propuestaUrl })
      .eq('id', proposalId);
    
    // Registrar el seguimiento
    try {
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: proposalId, // Usamos el ID de la propuesta como solicitud_id
          tipo: 'propuesta_creada',
          notas: 'Propuesta solar creada automáticamente',
          fecha: new Date().toISOString(),
          usuario: 'sistema'
        });
    } catch (seguimientoError) {
      console.error('Error al registrar seguimiento (no crítico):', seguimientoError);
      // No detenemos el proceso por este error
    }
    
    // Iniciar las operaciones de envío de correo en paralelo
    let emailStatus = { clienteEnviado: false, adminEnviado: false };
    
    try {
      // Enviar email al cliente
      const clienteInfo = await sendClientProposalEmail({
        nombre,
        email,
        propuestaUrl,
        ahorroEstimado
      });
      
      emailStatus.clienteEnviado = true;
      console.log('Email cliente enviado:', clienteInfo?.messageId);
      
      // Enviar email al administrador
      const adminInfo = await sendAdminNotificationEmail({
        nombre,
        email,
        telefono: telefonoFormatted,
        tipoInstalacion: tipoPropiedad,
        consumo,
        propuestaUrl,
        ahorroEstimado
      });
      
      emailStatus.adminEnviado = true;
      console.log('Email admin enviado:', adminInfo?.messageId);
      
      // Registrar el seguimiento de emails enviados
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: proposalId,
          tipo: 'emails_enviados',
          notas: `Emails enviados correctamente: cliente=${email}, admin=${process.env.ADMIN_EMAIL}`,
          fecha: new Date().toISOString(),
          usuario: 'sistema'
        });
        
    } catch (error) {
      // Manejo correcto del error desconocido en TypeScript
      console.error('Error al enviar correos:', error);
      
      // Extraer el mensaje del error de manera segura para TypeScript
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido';
      
      // Registrar el error en seguimientos
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
      solicitudId: proposalId, // Devolvemos el ID como solicitudId para mantener compatibilidad
      emailsEnviados: emailStatus
    });
    
  } catch (error) {
    // Manejo correcto del error en TypeScript
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error desconocido';
      
    console.error('Error al procesar solicitud:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + errorMessage },
      { status: 500 }
    );
  }
}