// src/app/api/proposal/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log('API - Fetching proposal with ID:', id);
    
    // Verificar si es un ID temporal o real
    const isTempId = id.startsWith('temp-');
    
    if (isTempId) {
      console.log('API - Processing temporary ID request');
      // Para IDs temporales, buscar la propuesta más reciente creada en los últimos 5 minutos
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      
      const { data, error } = await supabase
        .from('solar_proposals')
        .select('*')
        .gt('created_at', fiveMinutesAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.error('API - Database error for temp ID:', error);
      }
        
      if (!data || data.length === 0) {
        console.log('API - No recent proposal found, using fallback data');
        // Devolver datos ficticios para propuestas temporales
        return NextResponse.json({
          id,
          nombre: "Cliente Nuevo",
          email: "cliente@ejemplo.com",
          telefono: "+507 6123-4567",
          consumo: 1500,
          tipo_propiedad: "residencial",
          fase_electrica: "monofasico",
          ahorro_estimado: 390,
          created_at: new Date().toISOString()
        });
      }
      
      console.log('API - Returning most recent proposal for temp ID');
      return NextResponse.json(data[0]);
    } else {
      console.log('API - Processing real ID request');
      // Para IDs reales, obtener la propuesta específica
      const { data, error } = await supabase
        .from('solar_proposals')
        .select('*')
        .eq('id', id)
        .maybeSingle();
        
      if (error) {
        console.error('API - Error fetching proposal:', error);
        return NextResponse.json(
          { error: 'Error al obtener la propuesta: ' + error.message },
          { status: 500 }
        );
      }
        
      if (!data) {
        console.log('API - No proposal found with ID:', id);
        return NextResponse.json(
          { error: 'Propuesta no encontrada' },
          { status: 404 }
        );
      }
      
      console.log('API - Successfully retrieved proposal');
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('API - Unexpected error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error desconocido';
      
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + errorMessage },
      { status: 500 }
    );
  }
}