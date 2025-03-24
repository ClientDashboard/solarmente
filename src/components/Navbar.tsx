'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="SolarMente Logo" 
              width={180} 
              height={50} 
              className="h-10 w-auto" 
            />
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className={`font-medium ${
                pathname === '/' 
                  ? 'text-solarmente-button' 
                  : 'text-solarmente-text hover:text-solarmente-button'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/proyectos" 
              className={`font-medium ${
                pathname === '/proyectos' 
                  ? 'text-solarmente-button' 
                  : 'text-solarmente-text hover:text-solarmente-button'
              }`}
            >
              Proyectos
            </Link>
            <Link 
              href="/propuesta" 
              className={`font-medium ${
                pathname === '/propuesta' 
                  ? 'text-solarmente-button' 
                  : 'text-solarmente-text hover:text-solarmente-button'
              }`}
            >
              Cotización
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
