import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { proposalId: string } }
) {
  const proposalId = params.proposalId;
  
  // Redirigir al endpoint API que genera el PDF
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/api/proposal-pdf/${proposalId}`);
}