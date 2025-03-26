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
    const { nombre, email, telefono, tipoInstalacion, consumo } = data;
    
    // Validar campos requeridos
    if (!nombre || !email || !telefono || !consumo) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Calcular ahorro estimado (ejemplo básico)
    const costoActualEstimado = consumo * 0.21; // $0.21 por kWh
    const ahorroEstimado = costoActualEstimado * 0.70; // 70% de ahorro
    
    // Guardar en base de datos
    const { data: solicitudData, error } = await supabase
      .from('solicitudes')
      .insert({
        nombre,
        email,
        telefono: telefono.startsWith('+') ? telefono : `+507${telefono}`,
        tipo_instalacion: tipoInstalacion || 'Residencial',
        consumo,
        ahorro_estimado: ahorroEstimado,
        estado: 'nueva'
      })
      .select();
      
    if (error) {
      console.error('Error al guardar solicitud:', error);
      return NextResponse.json(
        { error: 'Error al guardar la solicitud' },
        { status: 500 }
      );
    }
    
    const solicitudId = solicitudData[0].id;
    const propuestaUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/propuesta/${solicitudId}`;
    
    // Enviar email al cliente
    await sendClientProposalEmail({
      nombre,
      email,
      propuestaUrl,
      ahorroEstimado
    });
    
    // Enviar email al administrador
    await sendAdminNotificationEmail({
      nombre,
      email,
      telefono,
      tipoInstalacion: tipoInstalacion || 'Residencial',
      consumo,
      propuestaUrl,
      ahorroEstimado
    });
    
    // Registrar en seguimientos
    await supabase
      .from('seguimientos')
      .insert({
        solicitud_id: solicitudId,
        tipo: 'propuesta_creada',
        notas: 'Propuesta creada y notificaciones enviadas',
        usuario: 'sistema'
      });
    
    return NextResponse.json({
      success: true,
      message: 'Propuesta creada exitosamente',
      propuestaUrl,
      solicitudId
    });
    
  } catch (error) {
    console.error('Error al procesar solicitud:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
// Archivo corregido
