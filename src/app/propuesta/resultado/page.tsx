// src/app/propuesta/resultado/page.tsx
import { Suspense } from 'react';
import ProposalResultWrapper from '@/components/solar-proposal/ProposalResultWrapper';

// Make this page dynamic to avoid build-time errors
export const dynamic = 'force-dynamic';

export default function ResultadoPage() {
  return (
    <Suspense fallback={<div>Cargando propuesta...</div>}>
      <ProposalResultWrapper />
    </Suspense>
  );
}