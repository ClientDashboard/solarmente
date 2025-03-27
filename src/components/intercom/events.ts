import { trackIntercomEvent } from './index';

// Eventos pre-definidos para usar en la aplicación
export const IntercomEvents = {
  // Eventos de formulario
  FORM_STARTED: 'form_started',
  FORM_STEP_COMPLETED: 'form_step_completed',
  FORM_SUBMITTED: 'form_submitted',
  
  // Eventos de propuesta
  PROPOSAL_VIEWED: 'proposal_viewed',
  PROPOSAL_DOWNLOADED: 'proposal_downloaded',
  
  // Eventos de navegación
  PAGE_VIEWED: 'page_viewed',
  
  // Eventos de interacción
  BUTTON_CLICKED: 'button_clicked',
  CONTACT_REQUESTED: 'contact_requested'
};

// Función para registrar visualización de página
export function trackPageView(pageName: string, pageData?: Record<string, any>) {
  trackIntercomEvent(IntercomEvents.PAGE_VIEWED, {
    page_name: pageName,
    url: typeof window !== 'undefined' ? window.location.href : '',
    ...pageData
  });
}

// Función para registrar progreso del formulario
export function trackFormProgress(step: number, formData?: Record<string, any>) {
  trackIntercomEvent(IntercomEvents.FORM_STEP_COMPLETED, {
    step_number: step,
    step_name: getStepName(step),
    ...formData
  });
}

// Función auxiliar para obtener nombre del paso
function getStepName(step: number): string {
  switch (step) {
    case 1: return 'Información personal';
    case 2: return 'Contacto';
    case 3: return 'Detalles de propiedad';
    case 4: return 'Resumen';
    default: return `Paso ${step}`;
  }
}
