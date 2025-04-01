// services/email.ts
import sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import path from 'path';

// Set the SendGrid API key from your environment variable
const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set. Email functionality will not work.');
} else {
  sgMail.setApiKey(apiKey);
  console.log('SendGrid API key configured successfully');
}

// ---------------------------
// Load Client Email Template
// ---------------------------
let clientTemplate = '';
try {
  const clientTemplatePath = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'email-templates',
    'transactional.html'
  );
  clientTemplate = readFileSync(clientTemplatePath, 'utf8');
  console.log(`Client template loaded successfully from: ${clientTemplatePath}`);
  // Optional: log a snippet to verify content
  console.log('Client template snippet:', clientTemplate.slice(0, 100));
} catch (error) {
  console.error(`Error reading client template:`, error);
  // Fallback template in case of error
  clientTemplate = `<html><body><h1>¡Tu propuesta solar está lista!</h1><p>Hola, hemos preparado tu propuesta solar personalizada.</p><p>Visita <a href="{{proposalUrl}}">este enlace</a> para verla.</p></body></html>`;
  console.log('Using fallback client template');
}

// ---------------------------
// Load Admin Email Template
// ---------------------------
let adminTemplate = '';
try {
  const adminTemplatePath = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'email-templates',
    'admin.html'
  );
  adminTemplate = readFileSync(adminTemplatePath, 'utf8');
  console.log(`Admin template loaded successfully from: ${adminTemplatePath}`);
  console.log('Admin template snippet:', adminTemplate.slice(0, 100));
} catch (error) {
  console.error(`Error reading admin template:`, error);
  adminTemplate = `<html><body><h1>Nueva propuesta generada</h1><p>Cliente: {{clienteNombre}}</p><p>Email: {{clienteEmail}}</p><p>Ver propuesta: <a href="{{proposalUrl}}">enlace</a></p></body></html>`;
  console.log('Using fallback admin template');
}

/**
 * Sends an email to the client with proposal details.
 * @param clientEmail - Client's email address.
 * @param clientName - Client's name.
 * @param proposalUrl - URL of the proposal.
 * @param savings - Estimated savings (optional).
 */
export async function sendClientProposalEmail(
  clientEmail: string,
  clientName: string,
  proposalUrl: string,
  savings?: number
) {
  if (!apiKey) {
    console.error('Cannot send client email: SENDGRID_API_KEY is not set');
    throw new Error('SendGrid API key not configured');
  }

  try {
    let htmlContent = clientTemplate
      .replace(/{{\s*clienteNombre\s*}}/g, clientName)
      .replace(/{{\s*proposalUrl\s*}}/g, proposalUrl)
      .replace(/{{\s*ahorroEstimado\s*}}/g, savings !== undefined ? savings.toString() : '0');
    
    const msg = {
      to: clientEmail,
      from: {
        email: process.env.EMAIL_FROM || 'ventas@solarmente.io',
        name: 'SolarMente.AI'
      },
      subject: '¡Tu propuesta solar está lista!',
      html: htmlContent,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    };

    console.log('Sending client email with data:', {
      to: msg.to,
      subject: msg.subject,
      proposalUrl,
      savings,
    });

    const result = await sgMail.send(msg);
    console.log(`Client email sent to: ${clientEmail}, Status: ${result[0].statusCode}`);
    return result;
  } catch (error: any) {
    console.error('Error sending client email:', error);
    console.error('SendGrid Response:', error.response?.body || 'No response body');
    throw error;
  }
}

/**
 * Sends an email notification to the admin about a new proposal.
 * @param adminEmail - Admin's email address.
 * @param clientName - Client's name.
 * @param clientEmail - Client's email address.
 * @param proposalUrl - URL of the proposal.
 * @param telefono - Client's phone (optional).
 * @param tipoPropiedad - Type of property (optional).
 * @param consumo - Consumption in kWh (optional).
 * @param savings - Estimated savings (optional).
 */
export async function sendAdminNotificationEmail(
  adminEmail: string,
  clientName: string,
  clientEmail: string,
  proposalUrl: string,
  telefono?: string,
  tipoPropiedad?: string,
  provincia?: string,
  consumo?: number,
  savings?: number
) {
  if (!apiKey) {
    console.error('Cannot send admin email: SENDGRID_API_KEY is not set');
    throw new Error('SendGrid API key not configured');
  }

  try {
    // Prepare phone number digits for WhatsApp link
    const clienteTelefonoDigits = telefono ? telefono.replace(/\D/g, '') : '';
    
    let htmlContent = adminTemplate
      .replace(/{{\s*clienteNombre\s*}}/g, clientName)
      .replace(/{{\s*clienteEmail\s*}}/g, clientEmail)
      .replace(/{{\s*clienteTelefono\s*}}/g, telefono || '')
      .replace(/{{\s*clienteTelefonoDigits\s*}}/g, clienteTelefonoDigits)
      .replace(/{{\s*tipoPropiedad\s*}}/g, tipoPropiedad || '')
      .replace(/{{\s*provincia\s*}}/g, provincia || '')
      .replace(/{{\s*consumo\s*}}/g, consumo !== undefined ? consumo.toString() : '')
      .replace(/{{\s*ahorroEstimado\s*}}/g, savings !== undefined ? savings.toString() : '')
      .replace(/{{\s*proposalUrl\s*}}/g, proposalUrl);
    
    const msg = {
      to: adminEmail,
      from: {
        email: process.env.EMAIL_FROM || 'ventas@solarmente.io',
        name: 'SolarMente.AI - Notificaciones'
      },
      subject: `Nueva propuesta generada para ${clientName}`,
      html: htmlContent,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    };

    console.log('Sending admin email with data:', {
      to: msg.to,
      subject: msg.subject,
      proposalUrl,
      telefono,
      tipoPropiedad,
      consumo,
      savings,
    });

    const result = await sgMail.send(msg);
    console.log(`Admin email sent to: ${adminEmail}, Status: ${result[0].statusCode}`);
    return result;
  } catch (error: any) {
    console.error('Error sending admin email:', error);
    console.error('SendGrid Response:', error.response?.body || 'No response body');
    throw error;
  }
}