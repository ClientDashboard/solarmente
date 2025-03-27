/**
 * Actualiza los datos del usuario en Intercom
 */
export function updateIntercomUser(userData: {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}) {
  // Verificar si Intercom está disponible
  if (typeof window !== 'undefined' && window.Intercom) {
    // Extraer propiedades especiales
    const { name, email, phone, ...customData } = userData;
    
    // Crear el objeto de actualización
    const updateData: any = {};
    
    // Añadir propiedades básicas si existen
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    
    // Añadir datos personalizados si existen
    if (Object.keys(customData).length > 0) {
      updateData.custom_data = customData;
    }
    
    // Actualizar Intercom
    window.Intercom('update', updateData);
    return true;
  }
  
  return false;
}

/**
 * Registra un evento en Intercom
 */
export function trackIntercomEvent(eventName: string, metadata?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('trackEvent', eventName, metadata);
    return true;
  }
  
  return false;
}
