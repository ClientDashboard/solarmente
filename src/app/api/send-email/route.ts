// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendClientProposalEmail, sendAdminNotificationEmail } from '../../../../services/email';

export async function POST(request: NextRequest) {
  try {
    console.log('send-email endpoint: Received request');
    
    const data = await request.json();
    console.log('send-email endpoint: Parsed request data:', data);

    // Destructure required fields
    const {
      email,           // Client's email
      nombre,          // Client's name
      propuestaUrl,    // URL of the proposal
      ahorroEstimado,  // Estimated savings
      telefono,        // Client's phone (optional)
      tipoPropiedad,   // Type of property (optional)
      provincia,       // Province (optional)
      consumo,         // Consumption in kWh (optional)
      adminEmail       // Admin email, if provided (optional)
    } = data;

    // Validate required fields
    if (!email || !nombre || !propuestaUrl) {
      console.error('send-email endpoint: Missing required fields.');
      return NextResponse.json(
        { error: 'Missing required fields: email, nombre, or propuestaUrl.' },
        { status: 400 }
      );
    }

    console.log('send-email endpoint: Sending emails...');
    // Send both emails concurrently
    const results = await Promise.all([
      sendClientProposalEmail(email, nombre, propuestaUrl, ahorroEstimado),
      sendAdminNotificationEmail(
        adminEmail || 'ventas@solarmente.io',
        nombre,
        email,
        propuestaUrl,
        telefono,
        tipoPropiedad,
        consumo,
        ahorroEstimado
      )
    ]);

    console.log('send-email endpoint: Emails sent successfully.', results);
    return NextResponse.json({
      success: true,
      emailStatus: { clienteEnviado: true, adminEnviado: true }
    });
  } catch (error: any) {
    console.error('send-email endpoint: Error sending emails:', error);
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}