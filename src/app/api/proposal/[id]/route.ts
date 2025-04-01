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
    // Asegurarse de que params se resuelva (en caso de ser una promesa)
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    console.log('API - Fetching proposal with ID:', id);
    
    // Consultar la propuesta en Supabase
    const { data, error } = await supabase
      .from('solar_proposals')
      .select('*')
      .eq('id', id)
      .single();
    
    console.log('Supabase response:', { data, error });
    
    if (error) throw new Error(error.message);
    if (!data) {
      console.error('No proposal found for ID:', id);
      return NextResponse.json({ error: 'No se encontró la propuesta' }, { status: 404 });
    }
    
    console.log('API - Successfully retrieved proposal:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in GET /api/proposal/[id]:', error);
    return NextResponse.json({ error: error.message || 'Error desconocido' }, { status: 500 });
  }
}
