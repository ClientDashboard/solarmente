// src/app/api/debug/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyEmailConfig } from '../../../../services/email';

export async function GET(request: NextRequest) {
  try {
    // Verificar variables de entorno (sin mostrar valores sensibles)
    const envStatus = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL
    };

    // Verificar conexión a Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    let supabaseStatus = "Desconocido";
    try {
      const { data, error } = await supabase.from('solar_proposals').select('count', { count: 'exact' }).limit(1);
      supabaseStatus = error ? `Error: ${error.message}` : "Conectado correctamente";
    } catch (error: any) {
      supabaseStatus = `Error: ${error.message}`;
    }

    // Verificar configuración de email
    const emailStatus = await verifyEmailConfig();

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environmentVariables: envStatus,
      supabaseConnection: supabaseStatus,
      emailConfiguration: emailStatus
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}