import { Twilio } from 'twilio';
import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Twilio
const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

// Inicializar Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Envía el mensaje de confirmación después de que el cliente ve su propuesta
 * Incluye agradecimiento, URL de propuesta y opciones de contacto
 */
export async function sendProposalViewedMessage(options: {
  solicitudId: string;
  telefono: string;
  nombre: string;
  propuestaUrl: string;
  ahorroEstimado?: number;
}): Promise<any> {
  const { solicitudId, telefono, nombre, propuestaUrl, ahorroEstimado } = options;
  
  try {
    // Formatear el número según los requisitos de Twilio
    const formattedPhone = telefono.startsWith('+') ? telefono : `+507${telefono}`;
    
    // Preparar el mensaje
    const whatsappMessage = `
¡Gracias ${nombre} por utilizar nuestra calculadora solar! 🌞

Hemos generado tu propuesta personalizada que muestra cómo puedes ${ahorroEstimado ? `ahorrar aproximadamente $${ahorroEstimado.toFixed(2)} mensuales` : 'reducir significativamente tu factura eléctrica'} mediante energía solar.

📊 *Tu propuesta está disponible aquí:*
${propuestaUrl}

¿Qué te gustaría hacer a continuación?

- Responde con *1* para hablar con un asesor especializado
- Responde con *2* para agendar una visita técnica sin compromiso
- Responde con *3* para recibir más información sobre financiamiento

¡Estamos aquí para ayudarte a dar el paso hacia la energía limpia y el ahorro!

SolarMente
`;

    // Mensaje alternativo para SMS (más corto y sin formato)
    const smsMessage = `
Gracias ${nombre} por usar nuestra calculadora solar! Tu propuesta está lista: ${propuestaUrl}

Para hablar con un asesor: responde 1
Para agendar visita: responde 2
Para info sobre financiamiento: responde 3

SolarMente
`;

    // Intentar enviar por WhatsApp
    try {
      const whatsappResult = await twilioClient.messages.create({
        body: whatsappMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${formattedPhone}`
      });
      
      // Registrar en Supabase
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: solicitudId,
          tipo: 'propuesta_vista_whatsapp',
          notas: 'Mensaje post-visualización de propuesta enviado por WhatsApp',
          usuario: 'sistema',
          twilio_message_sid: whatsappResult.sid,
          twilio_status: whatsappResult.status,
          canal: 'whatsapp'
        });
        
      return whatsappResult;
    } catch (whatsappError) {
      console.error('Error al enviar mensaje por WhatsApp, intentando SMS:', whatsappError);
      
      // Si WhatsApp falla, intentar SMS como respaldo
      const smsResult = await twilioClient.messages.create({
        body: smsMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });
      
      // Registrar en Supabase
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: solicitudId,
          tipo: 'propuesta_vista_sms',
          notas: 'Mensaje post-visualización de propuesta enviado por SMS (respaldo)',
          usuario: 'sistema',
          twilio_message_sid: smsResult.sid,
          twilio_status: smsResult.status,
          canal: 'sms'
        });
        
      return smsResult;
    }
  } catch (error) {
    console.error('Error al enviar mensaje post-propuesta:', error);
    throw error;
  }
}

/**
 * Procesa respuestas a los mensajes de propuesta (1, 2, 3)
 * Esta función debe ser llamada desde el webhook de Twilio
 */
export async function handleProposalResponse(body: string, from: string): Promise<string> {
  // Normalizar la respuesta
  const responseText = body.trim().toLowerCase();
  const firstChar = responseText.charAt(0);
  
  // Buscar el número de teléfono en la base de datos
  let phoneNumber = from.replace('whatsapp:', '');
  if (phoneNumber.startsWith('+507')) {
    phoneNumber = phoneNumber.substring(4); // Eliminar "+507"
  } else if (phoneNumber.startsWith('+')) {
    phoneNumber = phoneNumber.substring(1); // Eliminar "+"
  }
  
  // Buscar cliente por número de teléfono
  const { data: clientData, error: clientError } = await supabase
    .from('solicitudes')
    .select('id, nombre, notas')
    .eq('telefono', phoneNumber)
    .order('fecha_creacion', { ascending: false })
    .limit(1);
    
  if (clientError || !clientData || clientData.length === 0) {
    return "Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto.";
  }
  
  const clientId = clientData[0].id;
  const clientName = clientData[0].nombre;
  
  // Según la respuesta, generar una respuesta diferente
  switch (firstChar) {
    case '1': // Hablar con asesor
      // Actualizar estado en base de datos
      await supabase
        .from('solicitudes')
        .update({
          estado: 'requiere_atencion',
          notas: (clientData[0].notas || '') + '\n' + new Date().toISOString() + ': Solicitó hablar con asesor'
        })
        .eq('id', clientId);
      
      // Registrar la solicitud
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: clientId,
          tipo: 'solicitud_asesor',
          notas: 'Cliente solicitó hablar con un asesor',
          usuario: 'cliente'
        });
      
      return `Gracias ${clientName}. Un asesor especializado se pondrá en contacto contigo a la brevedad. Si es urgente, puedes llamarnos directamente al ${process.env.CONTACT_PHONE}.`;
      
    case '2': // Agendar visita
      // Actualizar estado en base de datos
      await supabase
        .from('solicitudes')
        .update({
          estado: 'requiere_visita',
          notas: (clientData[0].notas || '') + '\n' + new Date().toISOString() + ': Solicitó agendar visita'
        })
        .eq('id', clientId);
      
      // Registrar la solicitud
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: clientId,
          tipo: 'solicitud_visita',
          notas: 'Cliente solicitó agendar una visita técnica',
          usuario: 'cliente'
        });
      
      return `Excelente decisión, ${clientName}. Para coordinar la visita técnica, necesitamos algunos detalles adicionales. Un asesor se comunicará contigo pronto para programar la fecha y hora que mejor te convenga. También puedes llamarnos al ${process.env.CONTACT_PHONE} para agendar inmediatamente.`;
      
    case '3': // Información de financiamiento
      // Registrar la solicitud
      await supabase
        .from('seguimientos')
        .insert({
          solicitud_id: clientId,
          tipo: 'solicitud_financiamiento',
          notas: 'Cliente solicitó información sobre financiamiento',
          usuario: 'cliente'
        });
      
      return `Claro ${clientName}, actualmente ofrecemos varias opciones de financiamiento:

1️⃣ Financiamiento directo con pagos desde $150/mes
2️⃣ Financiamiento bancario hasta 7 años
3️⃣ Leasing solar sin pago inicial

Un asesor te contactará con los detalles específicos para tu caso, incluyendo un análisis de retorno de inversión. ¿Te gustaría que te enviemos más información sobre alguna opción en particular?`;
      
    default:
      // Si no es una respuesta numérica esperada, dar una respuesta general
      return `Gracias por tu mensaje, ${clientName}. Si deseas hablar con un asesor, agendar una visita o conocer opciones de financiamiento, puedes responder con 1, 2 o 3 respectivamente. Estamos aquí para ayudarte con tu proyecto solar.`;
  }
}
