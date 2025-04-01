'use client';

// src/components/solar-proposal/ClientProposalPage.tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { calcularPropuesta } from '@/components/solar-proposal/calculators';
import ProposalResult from '@/components/solar-proposal/ProposalResult';
import Image from 'next/image';
import Link from 'next/link';
import { ProposalData } from '@/components/solar-proposal/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Default fallback values
const DEFAULT_CONSUMPTION = 3000;
const DEFAULT_USER = {
  nombre: 'Usuario',
  telefono: '+507 XXXXXXXX',
  email: 'usuario@ejemplo.com'
};

export default function ClientProposalPage({ proposalId }: { proposalId: string }) {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProposal() {
      if (!proposalId) {
        setError('No se encontró el ID de la propuesta');
        setIsLoading(false);
        return;
      }
      
      console.log('Intentando cargar propuesta con ID:', proposalId);
      
      try {
        // Extract consumption value from URL if available
        // This will provide data even if API/Supabase fails
        const params = new URLSearchParams(window.location.search);
        const consumoParam = params.get('consumo');
        const nombreParam = params.get('nombre');
        const emailParam = params.get('email');
        const telefonoParam = params.get('telefono');
        const faseParam = params.get('fase');
        
        // Log URL parameters if any
        if (consumoParam) {
          console.log('Parámetros encontrados en URL:', { 
            consumo: consumoParam,
            nombre: nombreParam,
            email: emailParam,
            telefono: telefonoParam,
            fase: faseParam
          });
        }
        
        // Determine if this is a temporary ID
        const isTempId = proposalId.startsWith('temp-');
        let fetchedData = null;
        
        // First attempt: Try API for temp IDs, or Supabase for regular IDs
        if (isTempId) {
          fetchedData = await fetchFromApi(proposalId);
        } else {
          fetchedData = await fetchFromSupabase(proposalId);
          
          // If no data found in Supabase, try API as fallback
          if (!fetchedData) {
            console.log('No se encontró en Supabase, intentando con API');
            fetchedData = await fetchFromApi(proposalId);
          }
        }

        // If we still don't have data, use URL parameters or fallback
        if (!fetchedData) {
          if (consumoParam) {
            console.log('Usando datos de URL para la propuesta');
            const consumoNumerico = ensureNumericValue(consumoParam);
            const esMonofasico = faseParam ? faseParam !== 'trifasico' : true;
            
            // Calculate proposal with URL parameters
            const calculosResultado = calcularPropuesta(consumoNumerico, esMonofasico);
            
            fetchedData = {
              cliente: {
                nombre: nombreParam || DEFAULT_USER.nombre,
                telefono: telefonoParam || DEFAULT_USER.telefono,
                email: emailParam || DEFAULT_USER.email,
                consumo: consumoNumerico
              },
              ...calculosResultado
            };
          } else {
            console.log('No se pudo obtener datos, usando fallback');
            fetchedData = createFallbackData(DEFAULT_CONSUMPTION);
          }
        }
        
        setProposalData(fetchedData);
      } catch (err: any) {
        console.error('Error general al cargar la propuesta:', err);
        setError(err.message || 'Error desconocido al cargar la propuesta');
        
        // Use fallback data in case of error
        const errorFallbackData = createFallbackData(DEFAULT_CONSUMPTION);
        setProposalData(errorFallbackData);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProposal();
  }, [proposalId]);

  // Helper function to fetch from API
  async function fetchFromApi(id: string) {
    console.log(`Intentando fetch a API: /api/proposal/${id}`);
    
    // We'll always try the API call, even in development
    try {
      const apiResponse = await fetch(`/api/proposal/${id}`);
      
      // Check if response is OK
      if (!apiResponse.ok) {
        const statusText = apiResponse.statusText;
        console.error(`Error en respuesta API: ${apiResponse.status} ${statusText}`);
        
        // Try to get more error details if possible
        try {
          const errorContent = await apiResponse.text();
          console.error('Contenido de error (primeros 100 caracteres):', 
                       errorContent.substring(0, 100));
        } catch (e) {
          console.error('No se pudo leer el contenido del error');
        }
        
        // Return null to trigger fallback
        return null;
      }
      
      // Verify content type
      const contentType = apiResponse.headers.get('content-type');
      console.log('Tipo de contenido de respuesta:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await apiResponse.text();
        console.error('Respuesta no-JSON recibida (primeros 100 caracteres):', 
                     textResponse.substring(0, 100));
        return null;
      }
      
      // Parse JSON
      const apiData = await apiResponse.json();
      
      if (apiData.error) {
        console.error('Error retornado por la API:', apiData.error);
        return null;
      }
      
      console.log('Datos recibidos de la API:', apiData);
      
      // Convert consumption to number and validate
      const consumoNumerico = ensureNumericValue(apiData.consumo);
      
      // Get phase type
      const esMonofasico = apiData.fase_electrica ? 
        apiData.fase_electrica !== 'trifasico' : true;
        
      // Calculate proposal
      const calculosResultado = calcularPropuesta(consumoNumerico, esMonofasico);
      
      // Create final data structure
      return {
        cliente: {
          nombre: apiData.nombre || DEFAULT_USER.nombre,
          telefono: apiData.telefono || DEFAULT_USER.telefono,
          email: apiData.email || DEFAULT_USER.email,
          consumo: consumoNumerico
        },
        ...calculosResultado
      };
    } catch (apiError: any) {
      console.error('Error al consultar la API:', apiError);
      return null; // Return null to signal failure
    }
  }

  // Helper function to fetch from Supabase
  async function fetchFromSupabase(id: string) {
    console.log('Consultando Supabase para ID:', id);
    try {
      const { data, error: supabaseError } = await supabase
        .from('solar_proposals')
        .select('*')
        .eq('id', id)
        .maybeSingle();
        
      console.log('Respuesta de Supabase:', {
        success: !supabaseError,
        dataFound: data ? 'Sí' : 'No',
        error: supabaseError ? supabaseError.message : 'Sin error'
      });
      
      // If no data or error, return null
      if (supabaseError || !data) {
        return null;
      }
      
      // Process data from Supabase
      const proposalInfo = data;
      console.log('Propuesta encontrada en Supabase:', proposalInfo);
      
      // Ensure consumption is numeric
      const consumoNumerico = ensureNumericValue(proposalInfo.consumo);
      
      // Get phase type
      const esMonofasico = proposalInfo.fase_electrica ? 
        proposalInfo.fase_electrica !== 'trifasico' : true;
        
      // Calculate proposal
      const calculosResultado = calcularPropuesta(consumoNumerico, esMonofasico);
      
      // Create final data structure
      return {
        cliente: {
          nombre: proposalInfo.nombre || DEFAULT_USER.nombre,
          telefono: proposalInfo.telefono || DEFAULT_USER.telefono,
          email: proposalInfo.email || DEFAULT_USER.email,
          consumo: consumoNumerico
        },
        ...calculosResultado
      };
    } catch (dbError: any) {
      console.error('Error al consultar Supabase:', dbError);
      return null; // Return null to signal failure
    }
  }

  // Helper function to create fallback data
  function createFallbackData(consumo: number) {
    console.log(`Creando datos de fallback con consumo: ${consumo}`);
    const calculosResultado = calcularPropuesta(consumo, true);
    
    return {
      cliente: {
        ...DEFAULT_USER,
        consumo: consumo
      },
      ...calculosResultado
    };
  }

  // Helper function to ensure numeric values
  function ensureNumericValue(value: any, defaultValue = DEFAULT_CONSUMPTION): number {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="relative flex justify-center mb-6">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-solarmente-button/20 rounded-full animate-ping"></div>
            <div className="w-16 h-16 border-4 border-solarmente-button border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Cargando propuesta...</p>
        </div>
      </div>
    );
  }

  // Show error message if there's an error and no data
  if (error && !proposalData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar la propuesta</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link href="/" className="px-4 py-2 bg-solarmente-button text-white rounded hover:bg-solarmente-button/80">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // If we still don't have data (which shouldn't happen due to fallbacks), use final fallback
  if (!proposalData) {
    console.log('DIAGNÓSTICO - No hay proposalData después de todos los intentos, usando fallback final');
    return <ProposalResult data={createFallbackData(DEFAULT_CONSUMPTION)} />;
  }

  // Show proposal with data
  console.log('DIAGNÓSTICO - Enviando datos finales a ProposalResult:', proposalData);
  return <ProposalResult data={proposalData} />;
}