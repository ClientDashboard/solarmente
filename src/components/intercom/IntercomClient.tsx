'use client';

import { useEffect } from 'react';

// Definición de tipos para Intercom
declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
  }
}

export default function IntercomClient() {
  useEffect(() => {
    // El App ID de Intercom desde variables de entorno
    const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || '';
    
    if (!INTERCOM_APP_ID) {
      console.warn('Intercom App ID no configurado');
      return;
    }

    // Configurar Intercom
    window.intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: INTERCOM_APP_ID,
    };

    // Función para inicializar Intercom
    const initializeIntercom = () => {
      const intercomScript = (function(){
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
          ic('reattach_activator');
          ic('update', w.intercomSettings);
        } else {
          var d = document;
          var i = function() {
            i.c(arguments);
          };
          i.q = [];
          i.c = function(args) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function() {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/' + INTERCOM_APP_ID;
            var x = d.getElementsByTagName('script')[0];
            if (x?.parentNode) {
              x.parentNode.insertBefore(s, x);
            } else {
              d.head.appendChild(s);
            }
          };
          if (document.readyState === 'complete') {
            l();
          } else if (w.attachEvent) {
            w.attachEvent('onload', l);
          } else {
            w.addEventListener('load', l, false);
          }
        }
      })();
    };

    // Inicializar Intercom
    initializeIntercom();

    // Limpiar al desmontar
    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
