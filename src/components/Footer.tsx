import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-solarmente-darkgray text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SolarMente</h3>
            <p className="text-gray-300">
              Soluciones de energía solar para residencias, comercios e industrias.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300">Email: info@solarmente.com</p>
            <p className="text-gray-300">Teléfono: (55) 1234-5678</p>
            <p className="text-gray-300">Dirección: Av. Solar 123, CDMX</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-solarmente-orange">Inicio</Link></li>
              <li><Link href="/proyectos" className="text-gray-300 hover:text-solarmente-orange">Proyectos</Link></li>
              <li><Link href="/propuesta" className="text-gray-300 hover:text-solarmente-orange">Cotización</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SolarMente. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
