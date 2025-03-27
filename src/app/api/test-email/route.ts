// src/app/api/test-sendgrid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendClientProposalEmail } from '../../../../services/email';

export async function GET(request: NextRequest) {
  try {
    // Enviar un correo de prueba a ti mismo
    const result = await sendClientProposalEmail({
      nombre: 'Prueba SendGrid',
      email: 'tu-email@gmail.com', // ¡Cambia esto a tu email!
      propuestaUrl: 'https://solarmente.io/propuesta/test',
      ahorroEstimado: 250
    });
    
    return NextResponse.json({
      success: true,
      message: 'Correo enviado correctamente',
      result
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error al enviar correo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}