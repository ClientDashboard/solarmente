import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // No hacemos nada especial, solo dejamos que la solicitud continúe
  // Podríamos añadir lógica para enviar datos de página a Intercom Server API si fuera necesario
  return NextResponse.next();
}
