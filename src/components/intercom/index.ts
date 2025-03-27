import IntercomSDK from './IntercomSDK';
import { updateIntercomUser, trackIntercomEvent } from './IntercomHelper';

// Funciones helper adaptadas al SDK oficial
export function updateIntercomUser(userData: {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}) {
  if (typeof window === 'undefined') return false;
  
  const { name, email, phone, ...customData } = userData;
  const intercomData: any = {};
  
  if (name) intercomData.name = name;
  if (email) intercomData.email = email;
  if (phone) intercomData.phone = phone;
  
  // Intercom espera custom_data como un objeto separado
  if (Object.keys(customData).length > 0) {
    intercomData.custom_data = customData;
  }
  
  if (window.Intercom) {
    window.Intercom('update', intercomData);
    return true;
  }
  
  return false;
}

export function trackIntercomEvent(eventName: string, metadata?: Record<string, any>) {
  if (typeof window === 'undefined') return false;
  
  if (window.Intercom) {
    window.Intercom('trackEvent', eventName, metadata);
    return true;
  }
  
  return false;
}

export { IntercomSDK };

// Exportación por defecto
export default IntercomSDK;

// Exportar componentes adicionales
export * from './events';
export { IntercomButton } from './IntercomButton';
