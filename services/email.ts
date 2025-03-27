// Alternativa: Usando SendGrid en vez de nodemailer
// 1. Instala SendGrid: npm install @sendgrid/mail
// 2. Reemplaza el archivo email.ts con esto:

// src/services/email.ts
import sgMail from '@sendgrid/mail';

// Configurar SendGrid API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('✓ SendGrid configurado correctamente');
} else {
  console.error('✗ SENDGRID_API_KEY no configurado');
}

// Usar las variables de entorno para definir el remitente y el email del admin
const FROM_EMAIL = process.env.EMAIL_FROM || 'ventas@solarmente.io';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@solarmente.io';
const CONTACT_PHONE = process.env.CONTACT_PHONE || '+507 123-4567';

export async function sendClientProposalEmail(options: {
  nombre: string;
  email: string;
  propuestaUrl: string;
  ahorroEstimado?: number;
}): Promise<any> {
  if (!SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY no configurado');
    return { error: 'SENDGRID_API_KEY not configured' };
  }

  try {
    const { nombre, email, propuestaUrl, ahorroEstimado } = options;
    
    // HTML para el correo del cliente
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tu propuesta solar está lista</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
          }
          .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 30px 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
            background-color: #f1f1f1;
            border-radius: 0 0 8px 8px;
          }
          .benefits {
            background-color: #f1f9ff;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
          .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .highlight {
            color: #0077B6;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Tu propuesta solar está lista! ☀️</h1>
          </div>
          <div class="content">
            <p>Hola <span class="highlight">${nombre}</span>,</p>
            
            <p>¡Gracias por utilizar nuestra calculadora solar! Hemos generado tu propuesta personalizada para ayudarte a dar el paso hacia la energía limpia y el ahorro.</p>
            
            <div class="benefits">
              <p><strong>Esto es lo que puedes esperar:</strong></p>
              <ul>
                ${ahorroEstimado ? `<li>Ahorrar aproximadamente <span class="highlight">$${ahorroEstimado.toFixed(2)}</span> mensuales en tu factura eléctrica</li>` : ''}
                <li>Reducir tu huella de carbono y contribuir a un futuro más sostenible</li>
                <li>Protegerte contra los aumentos en las tarifas eléctricas</li>
                <li>Recuperar tu inversión en aproximadamente 3-5 años</li>
              </ul>
            </div>
            
            <p>Tu propuesta personalizada está lista para ser revisada. Haz clic en el botón a continuación para ver todos los detalles:</p>
            
            <div style="text-align: center;">
              <a href="${propuestaUrl}" class="button">Ver Mi Propuesta Solar</a>
            </div>
            
            <p>Si tienes alguna pregunta o deseas hablar con uno de nuestros asesores, simplemente responde a este correo o llámanos al ${CONTACT_PHONE}.</p>
            
            <p>¡Esperamos poder ayudarte en tu camino hacia la energía solar!</p>
            
            <p>Saludos,<br>
            El equipo de SolarMente</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SolarMente. Todos los derechos reservados.</p>
            <p>¿Preguntas? Contáctanos: ${FROM_EMAIL} | ${CONTACT_PHONE}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Texto plano como alternativa
    const textContent = `
      ¡Tu propuesta solar está lista! ☀️
      
      Hola ${nombre},
      
      ¡Gracias por utilizar nuestra calculadora solar! Hemos generado tu propuesta personalizada para ayudarte a dar el paso hacia la energía limpia y el ahorro.
      
      Esto es lo que puedes esperar:
      ${ahorroEstimado ? `- Ahorrar aproximadamente $${ahorroEstimado.toFixed(2)} mensuales en tu factura eléctrica` : ''}
      - Reducir tu huella de carbono y contribuir a un futuro más sostenible
      - Protegerte contra los aumentos en las tarifas eléctricas
      - Recuperar tu inversión en aproximadamente 3-5 años
      
      Tu propuesta personalizada está lista para ser revisada. Visita este enlace para ver todos los detalles:
      ${propuestaUrl}
      
      Si tienes alguna pregunta o deseas hablar con uno de nuestros asesores, simplemente responde a este correo o llámanos al ${CONTACT_PHONE}.
      
      ¡Esperamos poder ayudarte en tu camino hacia la energía solar!
      
      Saludos,
      El equipo de SolarMente
    `;
    
    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: '¡Tu propuesta solar personalizada está lista! 🌞',
      text: textContent,
      html: htmlContent,
    };
    
    const response = await sgMail.send(msg);
    console.log('Email enviado al cliente:', response[0].statusCode);
    return response;
  } catch (error) {
    console.error('Error al enviar email al cliente:', error);
    throw error;
  }
}

export async function sendAdminNotificationEmail(options: {
  nombre: string;
  email: string;
  telefono: string;
  tipoInstalacion: string;
  consumo: number;
  propuestaUrl: string;
  ahorroEstimado?: number;
}): Promise<any> {
  if (!SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY no configurado');
    return { error: 'SENDGRID_API_KEY not configured' };
  }

  try {
    const { nombre, email, telefono, tipoInstalacion, consumo, propuestaUrl, ahorroEstimado } = options;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #0077B6;">Nueva solicitud de propuesta solar</h2>
        
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
        
        <p><strong>Datos del cliente:</strong></p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:${telefono}">${telefono}</a></li>
          <li><strong>Tipo de instalación:</strong> ${tipoInstalacion}</li>
          <li><strong>Consumo mensual:</strong> ${consumo} kWh</li>
          ${ahorroEstimado ? `<li><strong>Ahorro estimado:</strong> $${ahorroEstimado.toFixed(2)}/mes</li>` : ''}
        </ul>
        
        <p><a href="${propuestaUrl}" style="background-color: #0077B6; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Ver propuesta generada</a></p>
      </div>
    `;
    
    // Texto plano como alternativa
    const textContent = `
      Nueva solicitud de propuesta solar
      
      Fecha: ${new Date().toLocaleString()}
      
      Datos del cliente:
      - Nombre: ${nombre}
      - Email: ${email}
      - Teléfono: ${telefono}
      - Tipo de instalación: ${tipoInstalacion}
      - Consumo mensual: ${consumo} kWh
      ${ahorroEstimado ? `- Ahorro estimado: $${ahorroEstimado.toFixed(2)}/mes` : ''}
      
      Ver propuesta generada: ${propuestaUrl}
    `;
    
    const msg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `Nueva propuesta solar: ${nombre}`,
      text: textContent,
      html: htmlContent,
    };
    
    const response = await sgMail.send(msg);
    console.log('Email enviado al administrador:', response[0].statusCode);
    return response;
  } catch (error) {
    console.error('Error al enviar email al administrador:', error);
    throw error;
  }
}

export async function verifyEmailConfig(): Promise<{isValid: boolean, details: string}> {
  if (!SENDGRID_API_KEY) {
    return {
      isValid: false,
      details: 'SENDGRID_API_KEY no configurado'
    };
  }
  
  return {
    isValid: true,
    details: 'Configuración válida'
  };
}