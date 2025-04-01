// src/app/propuesta/[proposalId]/page.tsx (Server Component)
export default async function ProposalPage({ params }: { params: { proposalId: string } }) {
  const { proposalId } = await params;
  
  // Pasamos el ID de la propuesta al componente cliente
  return <ClientProposalPage proposalId={proposalId} />;
}

// Importación del componente cliente
import ClientProposalPage from '@/components/solar-proposal/ClientProposalPage';