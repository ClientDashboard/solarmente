// src/components/solar-proposal/ProposalResultWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProposalResult from './ProposalResult';
import { ProposalData } from './types';

export default function ProposalResultWrapper() {
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    async function fetchProposal() {
      try {
        // Adjust the API endpoint as needed
        const response = await fetch(`/api/proposal/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch proposal');
        }
        const data = await response.json();
        setProposalData(data);
      } catch (error) {
        console.error('Error fetching proposal:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProposal();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solarmente-button mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propuesta...</p>
        </div>
      </div>
    );
  }

  if (!proposalData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Propuesta no encontrada</h2>
          <p className="text-gray-600 mb-6">No pudimos encontrar la propuesta solicitada o ha ocurrido un error al cargarla.</p>
          <a href="/" className="inline-block bg-solarmente-button text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return <ProposalResult data={proposalData} />;
}