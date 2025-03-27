'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

interface User {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: number;
}

export default function IntercomSDK({ user }: { user?: User }) {
  useEffect(() => {
    const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || 'yo1ga1n2';
    
    // Inicialización básica si no hay usuario
    if (!user) {
      Intercom({
        app_id: APP_ID
      });
      return;
    }
    
    // Inicialización con datos de usuario
    Intercom({
      app_id: APP_ID,
      user_id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt
    });
    
    // Limpiar cuando el componente se desmonte
    return () => {
      Intercom('shutdown');
    };
  }, [user]);

  return null;
}
