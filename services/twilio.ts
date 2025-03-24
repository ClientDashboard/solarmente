import { Twilio } from 'twilio';
import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Twilio
const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

// Inicializar Supabase para registro de seguimientos
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Envía un mensaje SMS usando Twilio
 */
export async function sendSMS(to: string, message: string): Promise<any> {
  try {
    // Formatear el número según los requisitos de Twilio
    // Debe incluir el código de país (+507 para Panamá)
    const formattedPhone = to.startsWith('+') ? to : `+507${to}`;
    
    // Enviar mensaje SMS usando Twilio
    const twilioMessage = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });
    
    console.log(`SMS enviado con SID: ${twilioMessage.sid}`);
    return twilioMessage;
  } catch (error) {
    console.error('Error al enviar SMS con Twilio:', error);
    throw error;
  }
}

/**
 * Envía un mensaje a través de WhatsApp usando Twilio
 */
export async function sendWhatsAppMessage(to: string, message: string): Promise<any> {
  try {
    // Formatear el número según los requisitos de Twilio
    const formattedPhone = to.startsWith('+') ? to : `+507${to}`;
    
    // Twilio requiere el prefijo "whatsapp:" para enviar mensajes a WhatsApp
    const twilioMessage = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`
    });
    
    console.log(`Mensaje de WhatsApp enviado con SID: ${twilioMessage.sid}`);
    return twilioMessage;
  } catch (error) {
    console.error('Error al enviar mensaje de WhatsApp con Twilio:', error);
    throw error;
  }
}

/**
 * Envía mensaje inicial de bienvenida después de que el cliente llena el formulario
 * Intenta WhatsApp primero, con SMS como respaldo
 */
export async function sendInitialMessage(options: {
  telefono: string;
  nombre: string;
  propuestaUrl: string;
  consumo: number;
  solicitudId: string;
}): Promise<void> {
  const { telefono, nombre, propuestaUrl, consumo, solicitudId } = options;
  
  try {
    // Calcular ahorro estimado (ejemplo básico)
    const costoActualEstimado = (consumo * 0.21); // $0.21 por kWh
    const ahorroEstimado = costoActualEstimado * 0.70; // 70% de ahorro
    
    // Generar mensajes
    const whatsappMessage = `
¡Hola ${nombre}! 👋

Gracias por solicitar tu propuesta solar personalizada con SolarMente. ✅

🔍 Tu propuesta ya está lista para ser revisada:
${propuestaUrl}

Algunos beneficios que te esperan:
🌞 Ahorro hasta del 70% en tu factura eléctrica ($${ahorroEstimado.toFixed(2)}/mes)
🌱 Reducción de tu huella de carbono
💰 Protección contra aumentos de tarifas eléctricas
⏱️ Retorno de inversión en 3-5 años en promedio

¿Tienes alguna pregunta? Puedes responder aquí o llamarnos al ${process.env.CONTACT_PHONE}.

¡Esperamos poder ayudarte en tu camino hacia la energía limpia! ☀️
`;

    // Mensaje SMS (más corto debido a las limitaciones de caracteres)
    const smsMessage = `Hola ${nombre}, tu propuesta solar está lista: ${propuestaUrl} - Podrías ahorrar ~$${ahorroEstimado.toFixed(2)}/mes en tu factura eléctrica. SolarMente`;

    let messageSent = false;
    
    // Intentar enviar por WhatsApp primero
    try {
      await sendWhatsAppMessage(telefono, whatsappMessage);
      messageSent = true;
      
      // Registrar en Supabase
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: solicitudId,
          tipo: 'whatsapp_twilio',
          notas: 'Mensaje inicial de WhatsApp enviado',
          usuario: 'sistema'
        });
        
    } catch (whatsappError) {
      console.error('Error al enviar WhatsApp, intentando SMS:', whatsappError);
    }
    
    // Si WhatsApp falló, enviar SMS como respaldo
    if (!messageSent) {
      await sendSMS(telefono, smsMessage);
      
      // Registrar en Supabase
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: solicitudId,
          tipo: 'sms',
          notas: 'Mensaje inicial de SMS enviado (respaldo)',
          usuario: 'sistema'
        });
    }
  } catch (error) {
    console.error('Error al enviar mensaje inicial:', error);
    throw error;
  }
}
