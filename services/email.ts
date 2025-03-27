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
const WHATSAPP = process.env.WHATSAPP || '50764143255';

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
    
    // HTML para el correo del cliente (diseño mejorado)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tu propuesta solar está lista</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body { 
            font-family: 'Poppins', Arial, sans-serif; 
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
            color: white;
            position: relative;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            animation: fadeInUp 1s ease-out;
          }
          .sun-icon {
            font-size: 42px;
            margin-bottom: 15px;
            display: inline-block;
            animation: pulse 2s infinite;
          }
          .content {
            padding: 35px 25px;
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 25px 0;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,119,182,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,119,182,0.3);
          }
          .footer {
            text-align: center;
            padding: 30px 20px;
            font-size: 14px;
            color: #666;
            background-color: #f1f1f1;
          }
          .benefits {
            background-color: #f1f9ff;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            box-shadow: 0 3px 6px rgba(0,0,0,0.05);
            border-left: 4px solid #0077B6;
          }
          .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .benefits li {
            margin-bottom: 12px;
            padding-left: 5px;
            position: relative;
          }
          .highlight {
            color: #0077B6;
            font-weight: bold;
          }
          .social-links {
            margin-top: 25px;
            text-align: center;
          }
          .social-button {
            display: inline-block;
            margin: 0 10px;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            color: white;
            font-weight: 600;
            text-align: center;
          }
          .whatsapp-button {
            background-color: #25D366;
            box-shadow: 0 4px 8px rgba(37, 211, 102, 0.2);
          }
          .instagram-link {
            display: inline-block;
            margin-top: 15px;
          }
          .instagram-icon {
            width: 32px;
            height: 32px;
            vertical-align: middle;
          }
          .savings-number {
            font-size: 24px;
            font-weight: 700;
            color: #0077B6;
            display: block;
            margin: 10px 0;
            text-align: center;
          }
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #0077B6, transparent);
            margin: 30px 0;
          }
          .header-wave {
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 20px;
          }
          .company-logo {
            margin-bottom: 15px;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="sun-icon">☀️</span>
            <h1>¡Tu propuesta solar está lista!</h1>
            <svg class="header-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
              <path d="M0,96L80,85.3C160,75,320,53,480,53.3C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
          <div class="content">
            <p>Hola <span class="highlight">${nombre}</span>,</p>
            
            <p>¡Tu camino hacia un futuro energético sostenible comienza ahora! Hemos creado una propuesta personalizada que transformará la manera en que consumes energía.</p>
            
            <div class="benefits">
              <p><strong>Esto es lo que está a punto de cambiar en tu vida:</strong></p>
              <ul>
                ${ahorroEstimado ? `<li>Ahorrarás <span class="savings-number">$${ahorroEstimado.toFixed(2)}</span> mensuales en tu factura eléctrica</li>` : ''}
                <li>Reducirás significativamente tu huella de carbono, contribuyendo a un planeta más verde</li>
                <li>Te independizarás de los constantes aumentos en las tarifas eléctricas</li>
                <li>Recuperarás tu inversión en aproximadamente 3-5 años, con beneficios por décadas</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <p>Tu propuesta solar personalizada está esperándote:</p>
              <a href="${propuestaUrl}" class="button">VER MI PROPUESTA SOLAR →</a>
            </div>
            
            <div class="divider"></div>
            
            <p>¿Tienes preguntas? Nuestro equipo de expertos está listo para ayudarte:</p>
            
            <div class="social-links">
              <a href="https://wa.me/${WHATSAPP}?text=Hola%20SolarMente,%20me%20interesa%20mi%20propuesta%20solar" class="social-button whatsapp-button">
                <img src="https://cdn.icon-icons.com/icons2/729/files/svg/729479.svg" alt="WhatsApp" width="20" height="20" style="vertical-align: middle; margin-right: 8px;">
                Hablar por WhatsApp
              </a>
            </div>
            
            <p style="text-align: center; margin-top: 25px;">¡Esperamos poder ayudarte en tu camino hacia la energía solar!</p>
            
            <p>Saludos,<br>
            El equipo de SolarMente</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SolarMente. Todos los derechos reservados.</p>
            <p>
              <a href="https://www.instagram.com/solarmente.io/" class="instagram-link">
                <img src="https://cdn.icon-icons.com/icons2/729/files/svg/729397.svg" alt="Instagram" class="instagram-icon">
                @solarmente.io
              </a>
            </p>
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
      
      ¡Tu camino hacia un futuro energético sostenible comienza ahora! Hemos creado una propuesta personalizada que transformará la manera en que consumes energía.
      
      Esto es lo que está a punto de cambiar en tu vida:
      ${ahorroEstimado ? `- Ahorrarás $${ahorroEstimado.toFixed(2)} mensuales en tu factura eléctrica` : ''}
      - Reducirás significativamente tu huella de carbono, contribuyendo a un planeta más verde
      - Te independizarás de los constantes aumentos en las tarifas eléctricas
      - Recuperarás tu inversión en aproximadamente 3-5 años, con beneficios por décadas
      
      Tu propuesta personalizada está esperándote:
      ${propuestaUrl}
      
      ¿Tienes preguntas? Nuestro equipo de expertos está listo para ayudarte.
      Escríbenos por WhatsApp: https://wa.me/${WHATSAPP}
      
      Síguenos en Instagram: @solarmente.io
      
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
        
        <p>
            <a href="${propuestaUrl}" style="background-color: #0077B6; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Ver propuesta generada</a>
            <a href="https://wa.me/${telefono.replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Contactar por WhatsApp</a>
        </p>
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
      Contactar por WhatsApp: https://wa.me/${telefono.replace(/[^0-9]/g, '')}
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