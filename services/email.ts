// src/services/email.ts
import nodemailer from 'nodemailer';

// Configurar el transporte de email usando Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // ventas@solarmente.io
    pass: process.env.EMAIL_PASSWORD,     // contraseña o app password
  },
});

// Usar las variables de entorno para definir el remitente y el email del admin
const FROM_EMAIL = process.env.EMAIL_FROM || 'ventas@solarmente.io';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@solarmente.io';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Envía un correo al cliente con la propuesta solar personalizada.
 */
export async function sendClientProposalEmail(options: {
  nombre: string;
  email: string;
  propuestaUrl: string;
  ahorroEstimado?: number;
}): Promise<any> {
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
          
          <p>Si tienes alguna pregunta o deseas hablar con uno de nuestros asesores, simplemente responde a este correo o llámanos al ${process.env.CONTACT_PHONE}.</p>
          
          <p>¡Esperamos poder ayudarte en tu camino hacia la energía solar!</p>
          
          <p>Saludos,<br>
          El equipo de SolarMente</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} SolarMente. Todos los derechos reservados.</p>
          <p>¿Preguntas? Contáctanos: ${FROM_EMAIL} | ${process.env.CONTACT_PHONE}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const info = await transporter.sendMail({
    from: `"SolarMente" <${FROM_EMAIL}>`,
    to: email,
    subject: "¡Tu propuesta solar personalizada está lista! 🌞",
    html: htmlContent,
  });
  
  console.log("Email enviado al cliente:", info.messageId);
  return info;
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
  const { nombre, email, telefono, tipoInstalacion, consumo, propuestaUrl, ahorroEstimado } = options;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Nueva solicitud de propuesta solar</h2>
      
      <p><strong>Datos del cliente:</strong></p>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${telefono}</li>
        <li><strong>Tipo de instalación:</strong> ${tipoInstalacion}</li>
        <li><strong>Consumo mensual:</strong> ${consumo} kWh</li>
        ${ahorroEstimado ? `<li><strong>Ahorro estimado:</strong> $${ahorroEstimado.toFixed(2)}/mes</li>` : ''}
      </ul>
      
      <p><a href="${propuestaUrl}">Ver propuesta generada</a></p>
    </div>
  `;
  
  const info = await transporter.sendMail({
    from: `"Sistema SolarMente" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: `Nueva propuesta solar: ${nombre}`,
    html: htmlContent,
  });
  
  console.log("Email de notificación enviado:", info.messageId);
  return info;
}
