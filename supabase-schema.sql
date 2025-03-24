-- Crear tabla de solicitudes
CREATE TABLE solicitudes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  consumo INTEGER NOT NULL,
  tipo_propiedad TEXT DEFAULT 'residencial',
  provincia TEXT DEFAULT 'Panamá',
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_vista_propuesta TIMESTAMP WITH TIME ZONE,
  fecha_ultimo_contacto TIMESTAMP WITH TIME ZONE,
  estado TEXT DEFAULT 'pendiente',
  notas TEXT,
  origen TEXT DEFAULT 'web',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para búsquedas comunes
CREATE INDEX idx_solicitudes_email ON solicitudes(email);
CREATE INDEX idx_solicitudes_telefono ON solicitudes(telefono);
CREATE INDEX idx_solicitudes_fecha ON solicitudes(fecha_creacion);
CREATE INDEX idx_solicitudes_estado ON solicitudes(estado);

-- Crear tabla de seguimientos
CREATE TABLE seguimientos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  solicitud_id UUID REFERENCES solicitudes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- email, whatsapp, sms, propuesta_vista, etc.
  notas TEXT,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  usuario TEXT, -- sistema, cliente, admin, etc.
  twilio_message_sid TEXT,
  twilio_status TEXT,
  canal TEXT -- sms, whatsapp, email, etc.
);

-- Crear índice para búsquedas por solicitud
CREATE INDEX idx_seguimientos_solicitud ON seguimientos(solicitud_id);

-- Crear tabla para seguimiento de estado de mensajes de Twilio
CREATE TABLE twilio_message_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_sid TEXT NOT NULL,
  seguimiento_id UUID REFERENCES seguimientos(id),
  status TEXT NOT NULL, -- 'queued', 'sent', 'delivered', 'failed', etc.
  error_code TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por SID
CREATE INDEX idx_twilio_message_status_sid ON twilio_message_status(message_sid);
