// src/app/propuesta/resultado/page.tsx
import { Suspense } from 'react';
import ProposalResult from '@/components/solar-proposal/ProposalResult';

export default function ResultadoPage() {
  return (
    <Suspense fallback={<div>Cargando propuesta...</div>}>
      <ProposalResult />
    </Suspense>
  );
}