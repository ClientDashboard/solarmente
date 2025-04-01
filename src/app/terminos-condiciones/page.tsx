'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Componente de flecha de regreso
const ArrowLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function TerminosCondiciones() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Función para alternar secciones
  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Lista de todas las secciones para el índice
  const sections = [
    { id: 'general', label: 'Términos Generales' },
    { id: 'license', label: 'Licencia' },
    { id: 'definitions', label: 'Definiciones' },
    { id: 'restrictions', label: 'Restricciones' },
    { id: 'refund', label: 'Política de Reembolso' },
    { id: 'suggestions', label: 'Sugerencias' },
    { id: 'consent', label: 'Consentimiento' },
    { id: 'links', label: 'Enlaces a Otros Sitios' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'changes', label: 'Cambios a Términos' },
    { id: 'modifications', label: 'Modificaciones al Sitio' },
    { id: 'updates', label: 'Actualizaciones' },
    { id: 'thirdparty', label: 'Servicios de Terceros' },
    { id: 'termination', label: 'Terminación' },
    { id: 'copyright', label: 'Infracción de Derechos' },
    { id: 'indemnification', label: 'Indemnización' },
    { id: 'warranties', label: 'Sin Garantías' },
    { id: 'liability', label: 'Limitación de Responsabilidad' },
    { id: 'severability', label: 'Divisibilidad' },
    { id: 'waiver', label: 'Renuncia' },
    { id: 'amendments', label: 'Enmiendas' },
    { id: 'entire', label: 'Acuerdo Completo' },
    { id: 'intellectual', label: 'Propiedad Intelectual' },
    { id: 'arbitrate', label: 'Arbitraje' },
    { id: 'dispute', label: 'Aviso de Disputa' },
    { id: 'binding', label: 'Arbitraje Vinculante' },
    { id: 'submissions', label: 'Envíos y Privacidad' },
    { id: 'promotions', label: 'Promociones' },
    { id: 'errors', label: 'Errores Tipográficos' },
    { id: 'misc', label: 'Varios' },
    { id: 'disclaimer', label: 'Descargo de Responsabilidad' },
    { id: 'contact', label: 'Contáctenos' }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white font-[Mulish,sans-serif]">
      {/* Encabezado */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-solarmente-orange hover:text-solarmente-orange/80 transition-colors"
          >
            <ArrowLeftIcon />
            <span className="ml-2">Volver</span>
          </button>
          
          <Link href="/" className="text-xl font-bold">
            Solar<span className="text-solarmente-orange">Mente</span>
            <span className="text-solarmente-orange font-light">.AI</span>
          </Link>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-gray-400">
            Actualizado: 20 de marzo de 2025
          </p>
        </div>
        
        {/* Índice de secciones */}
        <div className="mb-12 bg-gray-900/40 rounded-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Índice de Contenidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  toggleSection(section.id);
                  // Desplazar la página a la sección
                  const element = document.getElementById(section.id);
                  if (element) {
                    const offset = 100; // Ajustar offset para el encabezado sticky
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="text-left text-sm text-solarmente-orange hover:text-solarmente-orange/80 transition-colors py-1"
              >
                {index + 1}. {section.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contenido de Términos */}
        <div className="space-y-8">
          <section id="general">
            <button 
              onClick={() => toggleSection('general')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Términos Generales</h2>
              <span className="transform transition-transform duration-300">
                {activeSection === 'general' ? '−' : '+'}
              </span>
            </button>
            
            {activeSection === 'general' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Al acceder y realizar un pedido con SolarMente, confirmas que estás de acuerdo y obligado por los términos de servicio contenidos en los Términos y Condiciones que se describen a continuación. Estos términos se aplican a todo el sitio web y a cualquier correo electrónico u otro tipo de comunicación entre tú y SolarMente.</p>
                
                <p>En ningún caso el equipo de SolarMente será responsable de ningún daño directo, indirecto, especial, incidental o consecuente, incluyendo, pero no limitado a, pérdida de datos o ganancias, derivados del uso, o la imposibilidad de usar, los materiales en este sitio, incluso si el equipo de SolarMente o un representante autorizado ha sido advertido de la posibilidad de tales daños. Si tu uso de los materiales de este sitio resulta en la necesidad de servicio, reparación o corrección de equipo o datos, tú asumes cualquier costo de los mismos.</p>
                
                <p>SolarMente no será responsable de ningún resultado que pueda ocurrir durante el curso del uso de nuestros recursos. Nos reservamos el derecho de cambiar los precios y revisar la política de uso de los recursos en cualquier momento.</p>
              </div>
            )}
          </section>
          
          <section id="license">
            <button 
              onClick={() => toggleSection('license')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Licencia</h2>
              <span>{activeSection === 'license' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'license' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente te otorga una licencia revocable, no exclusiva, no transferible y limitada para descargar, instalar y usar el sitio web estrictamente de acuerdo con los términos de este Acuerdo.</p>
                
                <p>Estos Términos y Condiciones son un contrato entre tú y SolarMente (referido en estos Términos y Condiciones como "SolarMente", "nosotros", "nuestro" o "nuestros"), el proveedor del sitio web SolarMente y los servicios accesibles desde el sitio web SolarMente (que se denominan colectivamente en estos Términos y Condiciones como el "Servicio SolarMente").</p>
                
                <p>Estás de acuerdo en estar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con estos Términos y Condiciones, por favor no uses el Servicio SolarMente. En estos Términos y Condiciones, "tú" se refiere tanto a ti como individuo como a la entidad que representas. Si violas cualquiera de estos Términos y Condiciones, nos reservamos el derecho de cancelar tu cuenta o bloquear el acceso a tu cuenta sin previo aviso.</p>
              </div>
            )}
          </section>
          
          <section id="definitions">
            <button 
              onClick={() => toggleSection('definitions')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Definiciones y términos clave</h2>
              <span>{activeSection === 'definitions' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'definitions' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Para ayudar a explicar las cosas de la manera más clara posible en estos Términos y Condiciones, cada vez que se hace referencia a cualquiera de estos términos, se definen estrictamente como:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookie:</strong> pequeña cantidad de datos generados por un sitio web y guardados por tu navegador web. Se utiliza para identificar tu navegador, proporcionar análisis, recordar información sobre ti como tu preferencia de idioma o información de inicio de sesión.</li>
                  
                  <li><strong>Compañía:</strong> cuando esta política menciona "Compañía", "nosotros", "nos" o "nuestro", se refiere a SOLARMENTE, S.A., Panamá, Bella Vista, Calle 50 y 55 este, Edificio P.H. Torre Dresdner, Piso 11, que es responsable de tu información bajo estos Términos y Condiciones.</li>
                  
                  <li><strong>País:</strong> donde SolarMente o los propietarios/fundadores de SolarMente están basados, en este caso es Panamá.</li>
                  
                  <li><strong>Dispositivo:</strong> cualquier dispositivo conectado a internet como un teléfono, tablet, computadora o cualquier otro dispositivo que se pueda usar para visitar SolarMente y usar los servicios.</li>
                  
                  <li><strong>Servicio:</strong> se refiere al servicio proporcionado por SolarMente como se describe en los términos relativos (si están disponibles) y en esta plataforma.</li>
                  
                  <li><strong>Servicio de terceros:</strong> se refiere a anunciantes, patrocinadores de concursos, socios promocionales y de marketing, y otros que proporcionan nuestro contenido o cuyos productos o servicios creemos que pueden interesarte.</li>
                  
                  <li><strong>Sitio web:</strong> El sitio de SolarMente, al que se puede acceder a través de esta URL: solarmente.io</li>
                  
                  <li><strong>Tú:</strong> una persona o entidad que está registrada con SolarMente para usar los Servicios.</li>
                </ul>
              </div>
            )}
          </section>
          
          <section id="restrictions">
            <button 
              onClick={() => toggleSection('restrictions')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Restricciones</h2>
              <span>{activeSection === 'restrictions' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'restrictions' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Estás de acuerdo en no hacer, y no permitirás que otros hagan:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Licenciar, vender, alquilar, arrendar, asignar, distribuir, transmitir, hospedar, subcontratar, divulgar o explotar comercialmente el sitio web o hacer que la plataforma esté disponible para terceros.</li>
                  
                  <li>Modificar, hacer trabajos derivados, desensamblar, descifrar, recompilar o aplicar ingeniería inversa a cualquier parte del sitio web.</li>
                  
                  <li>Eliminar, alterar u oscurecer cualquier aviso de propiedad (incluyendo cualquier aviso de derechos de autor o marca registrada) de SolarMente o sus afiliados, socios, proveedores o los licenciantes del sitio web.</li>
                </ul>
              </div>
            )}
          </section>
          
          <section id="refund">
            <button 
              onClick={() => toggleSection('refund')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Política de Devolución y Reembolso</h2>
              <span>{activeSection === 'refund' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'refund' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Gracias por comprar en SolarMente. Apreciamos el hecho de que te guste comprar los productos que construimos. También queremos asegurarnos de que tengas una experiencia gratificante mientras exploras, evalúas y compras nuestros productos.</p>
                
                <p>Como con cualquier experiencia de compra, hay términos y condiciones que se aplican a las transacciones en SolarMente. Seremos tan breves como nuestros abogados nos permitan. Lo principal a recordar es que al hacer un pedido o realizar una compra en SolarMente, estás de acuerdo con los términos junto con la Política de Privacidad de SolarMente.</p>
                
                <p>Si, por cualquier motivo, no estás completamente satisfecho con cualquier bien o servicio que proporcionamos, no dudes en contactarnos y discutiremos cualquiera de los problemas que estés atravesando con nuestro producto.</p>
              </div>
            )}
          </section>
          
          <section id="suggestions">
            <button 
              onClick={() => toggleSection('suggestions')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Tus Sugerencias</h2>
              <span>{activeSection === 'suggestions' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'suggestions' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Cualquier retroalimentación, comentarios, ideas, mejoras o sugerencias (colectivamente, "Sugerencias") proporcionadas por ti a SolarMente con respecto al sitio web seguirán siendo propiedad única y exclusiva de SolarMente.</p>
                
                <p>SolarMente será libre de usar, copiar, modificar, publicar o redistribuir las Sugerencias para cualquier propósito y de cualquier manera sin ningún crédito o compensación para ti.</p>
              </div>
            )}
          </section>
          
          <section id="consent">
            <button 
              onClick={() => toggleSection('consent')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Tu Consentimiento</h2>
              <span>{activeSection === 'consent' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'consent' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Hemos actualizado nuestros Términos y Condiciones para proporcionarte una transparencia completa sobre lo que se establece cuando visitas nuestro sitio y cómo se utiliza. Al usar nuestro sitio web, registrar una cuenta o realizar una compra, por la presente consientes a nuestros Términos y Condiciones.</p>
              </div>
            )}
          </section>
          
          <section id="links">
            <button 
              onClick={() => toggleSection('links')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Enlaces a Otros Sitios Web</h2>
              <span>{activeSection === 'links' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'links' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Estos Términos y Condiciones se aplican solo a los Servicios. Los Servicios pueden contener enlaces a otros sitios web no operados o controlados por SolarMente. No somos responsables del contenido, la precisión o las opiniones expresadas en dichos sitios web, y dichos sitios web no son investigados, monitoreados o verificados por nosotros en cuanto a su precisión o integridad. Recuerda que cuando utilizas un enlace para ir de los Servicios a otro sitio web, nuestros Términos y Condiciones ya no están en vigor. Tu navegación e interacción en cualquier otro sitio web, incluidos aquellos que tienen un enlace en nuestra plataforma, están sujetos a las propias reglas y políticas de ese sitio web. Dichos terceros pueden usar sus propias cookies u otros métodos para recopilar información sobre ti.</p>
              </div>
            )}
          </section>
          
          <section id="cookies">
            <button 
              onClick={() => toggleSection('cookies')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Cookies</h2>
              <span>{activeSection === 'cookies' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'cookies' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente utiliza "Cookies" para identificar las áreas de nuestro sitio web que has visitado. Una Cookie es una pequeña pieza de datos almacenada en tu computadora o dispositivo móvil por tu navegador web. Utilizamos Cookies para mejorar el rendimiento y la funcionalidad de nuestro sitio web, pero no son esenciales para su uso. Sin embargo, sin estas cookies, ciertas funcionalidades como los videos pueden volverse inaccesibles o tendrías que introducir tus datos de inicio de sesión cada vez que visites el sitio web, ya que no podríamos recordar que ya habías iniciado sesión previamente. La mayoría de los navegadores web se pueden configurar para desactivar el uso de Cookies. Sin embargo, si desactivas las Cookies, es posible que no puedas acceder correctamente o en absoluto a la funcionalidad de nuestro sitio web. Nunca colocamos Información de Identificación Personal en Cookies.</p>
              </div>
            )}
          </section>
          
          <section id="changes">
            <button 
              onClick={() => toggleSection('changes')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Cambios a Nuestros Términos y Condiciones</h2>
              <span>{activeSection === 'changes' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'changes' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Reconoces y aceptas que SolarMente puede dejar de proporcionar (permanente o temporalmente) el Servicio (o cualquier característica dentro del Servicio) a ti o a los usuarios en general, a su entera discreción, sin previo aviso. Puedes dejar de usar el Servicio en cualquier momento. No necesitas informar específicamente a SolarMente cuando dejes de usar el Servicio. Reconoces y aceptas que si SolarMente deshabilita el acceso a tu cuenta, es posible que no puedas acceder al Servicio, a los detalles de tu cuenta o a cualquier archivo u otro material que esté contenido en tu cuenta.</p>
                <p>Si decidimos cambiar nuestros Términos y Condiciones, publicaremos esos cambios en esta página y/o actualizaremos la fecha de modificación de los Términos y Condiciones a continuación.</p>
              </div>
            )}
          </section>
          
          <section id="modifications">
            <button 
              onClick={() => toggleSection('modifications')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Modificaciones a Nuestro sitio web</h2>
              <span>{activeSection === 'modifications' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'modifications' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente se reserva el derecho de modificar, suspender o descontinuar, temporal o permanentemente, el sitio web o cualquier servicio al que se conecte, con o sin previo aviso y sin responsabilidad hacia ti.</p>
              </div>
            )}
          </section>
          
          <section id="updates">
            <button 
              onClick={() => toggleSection('updates')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Actualizaciones a Nuestro sitio web</h2>
              <span>{activeSection === 'updates' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'updates' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente puede de vez en cuando proporcionar mejoras o mejoras a las características/funcionalidades del sitio web, que pueden incluir parches, correcciones de errores, actualizaciones, mejoras y otras modificaciones ("Actualizaciones").</p>
                <p>Las Actualizaciones pueden modificar o eliminar ciertas características y/o funcionalidades del sitio web. Aceptas que SolarMente no tiene ninguna obligación de (i) proporcionar ninguna Actualización, o (ii) continuar proporcionando o habilitando cualquier característica y/o funcionalidad particular del sitio web para ti.</p>
                <p>Además, aceptas que todas las Actualizaciones (i) se considerarán como una parte integral del sitio web, y (ii) estarán sujetas a los términos y condiciones de este Acuerdo.</p>
              </div>
            )}
          </section>
          
          <section id="thirdparty">
            <button 
              onClick={() => toggleSection('thirdparty')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Servicios de Terceros</h2>
              <span>{activeSection === 'thirdparty' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'thirdparty' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Podemos mostrar, incluir o poner a disposición contenido de terceros (incluidos datos, información, aplicaciones y otros servicios de productos) o proporcionar enlaces a sitios web o servicios de terceros ("Servicios de Terceros").</p>
                <p>Reconoces y aceptas que SolarMente no será responsable de ningún Servicio de Terceros, incluida su precisión, integridad, puntualidad, validez, cumplimiento de derechos de autor, legalidad, decencia, calidad o cualquier otro aspecto de los mismos. SolarMente no asume ni tendrá ninguna obligación o responsabilidad ante ti o cualquier otra persona o entidad por los Servicios de Terceros.</p>
                <p>Los Servicios de Terceros y los enlaces a los mismos se proporcionan únicamente como una conveniencia para ti y accedes y los utilizas completamente bajo tu propio riesgo y sujeto a los términos y condiciones de dichos terceros.</p>
              </div>
            )}
          </section>
          
          <section id="termination">
            <button 
              onClick={() => toggleSection('termination')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Plazo y Terminación</h2>
              <span>{activeSection === 'termination' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'termination' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Este Acuerdo permanecerá en efecto hasta que sea terminado por ti o SolarMente.</p>
                <p>SolarMente puede, a su sola discreción, en cualquier momento y por cualquier razón o sin razón, suspender o terminar este Acuerdo con o sin previo aviso.</p>
                <p>Este Acuerdo terminará inmediatamente, sin previo aviso de SolarMente, en caso de que no cumplas con alguna disposición de este Acuerdo. También puedes terminar este Acuerdo eliminando el sitio web y todas sus copias de tu computadora.</p>
                <p>Al terminar este Acuerdo, deberás cesar todo uso del sitio web y eliminar todas las copias del sitio web de tu computadora.</p>
                <p>La terminación de este Acuerdo no limitará ninguno de los derechos o recursos de SolarMente en ley o en equidad en caso de incumplimiento por tu parte (durante el plazo de este Acuerdo) de cualquiera de tus obligaciones bajo el presente Acuerdo.</p>
              </div>
            )}
          </section>
          
          <section id="copyright">
            <button 
              onClick={() => toggleSection('copyright')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Aviso de Infracción de Derechos de Autor</h2>
              <span>{activeSection === 'copyright' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'copyright' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Si eres propietario de derechos de autor o agente de dicho propietario y crees que cualquier material en nuestro sitio web constituye una infracción de tus derechos de autor, ponte en contacto con nosotros proporcionando la siguiente información: (a) una firma física o electrónica del propietario de los derechos de autor o una persona autorizada para actuar en su nombre; (b) identificación del material que se alega que infringe; (c) tu información de contacto, incluyendo tu dirección, número de teléfono y un correo electrónico; (d) una declaración tuya de que tienes una creencia de buena fe de que el uso del material no está autorizado por los propietarios de los derechos de autor; y (e) una declaración de que la información en la notificación es precisa, y, bajo pena de perjurio, estás autorizado para actuar en nombre del propietario.</p>
              </div>
            )}
          </section>
          
          <section id="indemnification">
            <button 
              onClick={() => toggleSection('indemnification')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Indemnización</h2>
              <span>{activeSection === 'indemnification' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'indemnification' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Aceptas indemnizar y mantener a SolarMente y a sus padres, subsidiarias, afiliados, funcionarios, empleados, agentes, socios y licenciantes (si los hubiera) indemnes de cualquier reclamo o demanda, incluyendo honorarios razonables de abogados, debido a o que surjan de: (a) tu uso del sitio web; (b) tu violación de este Acuerdo o cualquier ley o regulación; o (c) tu violación de cualquier derecho de un tercero.</p>
              </div>
            )}
          </section>
          
          <section id="warranties">
            <button 
              onClick={() => toggleSection('warranties')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Sin Garantías</h2>
              <span>{activeSection === 'warranties' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'warranties' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>El sitio web se te proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD" y con todos los fallos y defectos sin garantía de ningún tipo. En la medida máxima permitida por la ley aplicable, SolarMente, en su propio nombre y en nombre de sus afiliados y sus respectivos licenciantes y proveedores de servicios, renuncia expresamente a todas las garantías, ya sean expresas, implícitas, estatutarias o de otro tipo, con respecto al sitio web, incluyendo todas las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, título y no infracción, y garantías que puedan surgir en el curso del trato, curso de rendimiento, uso o práctica comercial. Sin limitación a lo anterior, SolarMente no proporciona ninguna garantía o compromiso, y no hace ninguna representación de ningún tipo de que el sitio web cumplirá con tus requisitos, logrará los resultados previstos, será compatible o funcionará con cualquier otro software, sistemas o servicios, operará sin interrupciones, cumplirá con cualquier estándar de rendimiento o confiabilidad o estará libre de errores o que cualquier error o defecto puede o será corregido.</p>
                <p>Sin limitar lo anterior, ni SolarMente ni ningún proveedor de SolarMente hace ninguna representación o garantía de ningún tipo, expresa o implícita: (i) en cuanto al funcionamiento o disponibilidad del sitio web, o la información, contenido y materiales o productos incluidos en el mismo; (ii) que el sitio web será ininterrumpido o libre de errores; (iii) en cuanto a la precisión, confiabilidad o actualidad de cualquier información o contenido proporcionado a través del sitio web; o (iv) que el sitio web, sus servidores, el contenido o los correos electrónicos enviados desde o en nombre de SolarMente están libres de virus, scripts, troyanos, gusanos, malware, bombas de tiempo u otros componentes dañinos.</p>
                <p>Algunas jurisdicciones no permiten la exclusión o limitaciones de garantías implícitas o las limitaciones de los derechos legales aplicables de un consumidor, por lo que algunas o todas las exclusiones y limitaciones anteriores pueden no aplicarse a ti.</p>
              </div>
            )}
          </section>
          
          <section id="liability">
            <button 
              onClick={() => toggleSection('liability')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Limitación de Responsabilidad</h2>
              <span>{activeSection === 'liability' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'liability' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>No obstante cualquier daño en el que puedas incurrir, la responsabilidad total de SolarMente y cualquiera de sus proveedores bajo cualquier disposición de este Acuerdo y tu recurso exclusivo para todo lo anterior se limitará al monto realmente pagado por ti por el sitio web.</p>
                <p>En la medida máxima permitida por la ley aplicable, en ningún caso SolarMente o sus proveedores serán responsables de ningún daño especial, incidental, indirecto o consecuente de ningún tipo (incluyendo, pero no limitado a, daños por pérdida de beneficios, por pérdida de datos u otra información, por interrupción del negocio, por lesiones personales, por pérdida de privacidad que surja de o esté relacionada de alguna manera con el uso o la imposibilidad de usar el sitio web, software de terceros y/o hardware de terceros utilizado con el sitio web, o de otra manera en conexión con cualquier disposición de este Acuerdo), incluso si SolarMente o cualquier proveedor ha sido advertido de la posibilidad de tales daños e incluso si el remedio falla en su propósito esencial.</p>
                <p>Algunos estados/jurisdicciones no permiten la exclusión o limitación de daños incidentales o consecuentes, por lo que la limitación o exclusión anterior puede no aplicarse a ti.</p>
              </div>
            )}
          </section>
          
          <section id="severability">
            <button 
              onClick={() => toggleSection('severability')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Divisibilidad</h2>
              <span>{activeSection === 'severability' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'severability' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Si alguna disposición de este Acuerdo se considera inaplicable o inválida, dicha disposición será cambiada e interpretada para lograr los objetivos de dicha disposición en la mayor medida posible bajo la ley aplicable y las disposiciones restantes continuarán en pleno vigor y efecto.</p>
                <p>Este Acuerdo, junto con la Política de Privacidad y cualquier otro aviso legal publicado por SolarMente en los Servicios, constituirá el acuerdo completo entre tú y SolarMente con respecto a los Servicios. Si alguna disposición de este Acuerdo es considerada inválida por un tribunal de jurisdicción competente, la invalidez de dicha disposición no afectará la validez de las disposiciones restantes de este Acuerdo, que permanecerán en pleno vigor y efecto. Ninguna renuncia a cualquier término de este Acuerdo se considerará una renuncia adicional o continua de dicho término o cualquier otro término, y el hecho de que SolarMente no haga valer cualquier derecho o disposición bajo este Acuerdo no constituirá una renuncia a dicho derecho o disposición. TÚ Y SOLARMENTE ACUERDAN QUE CUALQUIER CAUSA DE ACCIÓN QUE SURJA DE O ESTÉ RELACIONADA CON LOS SERVICIOS DEBE COMENZAR DENTRO DE UN (1) AÑO DESPUÉS DE QUE LA CAUSA DE ACCIÓN SE ACUMULE. DE LO CONTRARIO, DICHA CAUSA DE ACCIÓN ESTÁ PERMANENTEMENTE PROHIBIDA.</p>
              </div>
            )}
          </section>
          
          <section id="waiver">
            <button 
              onClick={() => toggleSection('waiver')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Renuncia</h2>
              <span>{activeSection === 'waiver' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'waiver' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Excepto según lo dispuesto en este documento, el hecho de no ejercer un derecho o exigir el cumplimiento de una obligación bajo este Acuerdo no afectará la capacidad de una parte para ejercer dicho derecho o exigir dicho cumplimiento en cualquier momento posterior, ni la renuncia a un incumplimiento constituirá una renuncia a cualquier incumplimiento posterior.</p>
                <p>Ningún fallo en el ejercicio, y ningún retraso en el ejercicio, por parte de cualquiera de las partes, de cualquier derecho o poder bajo este Acuerdo operará como una renuncia a ese derecho o poder. Ni el ejercicio único o parcial de cualquier derecho o poder bajo este Acuerdo impedirá el ejercicio adicional de ese o cualquier otro derecho otorgado en este documento. En caso de conflicto entre este Acuerdo y cualquier término de compra aplicable u otros términos, los términos de este Acuerdo prevalecerán.</p>
              </div>
            )}
          </section>
          
          <section id="amendments">
            <button 
              onClick={() => toggleSection('amendments')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Enmiendas a este Acuerdo</h2>
              <span>{activeSection === 'amendments' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'amendments' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente se reserva el derecho, a su sola discreción, de modificar o reemplazar este Acuerdo en cualquier momento. Si una revisión es material, proporcionaremos al menos 30 días de aviso antes de que cualquier nuevo término entre en vigor. Lo que constituye un cambio material será determinado a nuestra sola discreción.</p>
                <p>Al continuar accediendo o utilizando nuestro sitio web después de que cualquier revisión entre en vigor, aceptas estar obligado por los términos revisados. Si no estás de acuerdo con los nuevos términos, ya no estás autorizado a usar SolarMente.</p>
              </div>
            )}
          </section>
          
          <section id="entire">
            <button 
              onClick={() => toggleSection('entire')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Acuerdo Completo</h2>
              <span>{activeSection === 'entire' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'entire' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>El Acuerdo constituye el acuerdo completo entre tú y SolarMente con respecto a tu uso del sitio web y reemplaza todos los acuerdos previos y contemporáneos escritos u orales entre tú y SolarMente.</p>
                <p>Puedes estar sujeto a términos y condiciones adicionales que se aplican cuando utilizas o compras otros servicios de SolarMente, que SolarMente te proporcionará en el momento de dicho uso o compra.</p>
              </div>
            )}
          </section>
          
          <section id="intellectual">
            <button 
              onClick={() => toggleSection('intellectual')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Propiedad Intelectual</h2>
              <span>{activeSection === 'intellectual' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'intellectual' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>El sitio web y todo su contenido, características y funcionalidad (incluyendo pero no limitado a toda la información, software, texto, pantallas, imágenes, video y audio, y el diseño, selección y disposición de los mismos), son propiedad de SolarMente, sus licenciantes u otros proveedores de dicho material y están protegidos por derechos de autor internacional, marca registrada, patente, secreto comercial y otras leyes de propiedad intelectual o derechos de propiedad. El material no puede ser copiado, modificado, reproducido, descargado o distribuido de ninguna manera, en su totalidad o en parte, sin el permiso previo por escrito expreso de SolarMente, a menos que y excepto que se proporcione expresamente en estos Términos y Condiciones. Cualquier uso no autorizado del material está prohibido.</p>
              </div>
            )}
          </section>
          
          <section id="arbitrate">
            <button 
              onClick={() => toggleSection('arbitrate')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Acuerdo de Arbitraje</h2>
              <span>{activeSection === 'arbitrate' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'arbitrate' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Esta sección se aplica a cualquier disputa EXCEPTO QUE NO INCLUYE UNA DISPUTA RELACIONADA CON RECLAMACIONES DE MEDIDAS CAUTELARES O EQUITATIVAS RELATIVAS A LA APLICACIÓN O VALIDEZ DE TUS DERECHOS DE PROPIEDAD INTELECTUAL O LOS DE SOLARMENTE. El término "disputa" significa cualquier disputa, acción u otra controversia entre tú y SolarMente con respecto a los Servicios o este acuerdo, ya sea en contrato, garantía, agravio, estatuto, regulación, ordenanza o cualquier otra base legal o equitativa. A "Disputa" se le dará el significado más amplio posible permitido por la ley.</p>
              </div>
            )}
          </section>
          
          <section id="dispute">
            <button 
              onClick={() => toggleSection('dispute')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Aviso de Disputa</h2>
              <span>{activeSection === 'dispute' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'dispute' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>En caso de disputa, tú o SolarMente deben dar al otro un Aviso de Disputa, que es una declaración escrita que establece el nombre, la dirección y la información de contacto de la parte que lo da, los hechos que dan lugar a la disputa y la reparación solicitada. Debes enviar cualquier Aviso de Disputa por correo electrónico a: info@solarmente.io. SolarMente enviará cualquier Aviso de Disputa a ti por correo a tu dirección si la tenemos, o de lo contrario a tu dirección de correo electrónico. Tú y SolarMente intentarán resolver cualquier disputa a través de una negociación informal dentro de los sesenta (60) días a partir de la fecha en que se envíe el Aviso de Disputa. Después de sesenta (60) días, tú o SolarMente pueden comenzar el arbitraje.</p>
              </div>
            )}
          </section>
          
          <section id="binding">
            <button 
              onClick={() => toggleSection('binding')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Arbitraje Vinculante</h2>
              <span>{activeSection === 'binding' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'binding' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Si tú y SolarMente no resuelven ninguna disputa mediante negociación informal, cualquier otro esfuerzo para resolver la disputa se llevará a cabo exclusivamente mediante arbitraje vinculante como se describe en esta sección. Estás renunciando al derecho de litigar (o participar como parte o miembro de clase) todas las disputas en la corte ante un juez o jurado. La disputa se resolverá mediante arbitraje vinculante de acuerdo con las reglas de arbitraje comercial de la Asociación Americana de Arbitraje. Cualquiera de las partes puede buscar cualquier alivio interino o preliminar de cualquier tribunal de jurisdicción competente, según sea necesario para proteger los derechos o la propiedad de la parte pendiente de la finalización del arbitraje. Todos y cada uno de los costos, honorarios y gastos legales, contables y otros incurridos por la parte prevaleciente serán asumidos por la parte no prevaleciente.</p>
              </div>
            )}
          </section>
          
          <section id="submissions">
            <button 
              onClick={() => toggleSection('submissions')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Envíos y Privacidad</h2>
              <span>{activeSection === 'submissions' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'submissions' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>En el caso de que envíes o publiques cualquier idea, sugerencia creativa, diseños, fotografías, información, anuncios, datos o propuestas, incluyendo ideas para nuevos o mejorados productos, servicios, características, tecnologías o promociones, aceptas expresamente que dichos envíos serán tratados automáticamente como no confidenciales y no propietarios y se convertirán en propiedad exclusiva de SolarMente sin ninguna compensación o crédito para ti. SolarMente y sus afiliados no tendrán obligaciones con respecto a dichos envíos o publicaciones y podrán usar las ideas contenidas en dichos envíos o publicaciones para cualquier propósito en cualquier medio a perpetuidad, incluyendo, pero no limitado a, desarrollar, fabricar y comercializar productos y servicios utilizando dichas ideas.</p>
              </div>
            )}
          </section>
          
          <section id="promotions">
            <button 
              onClick={() => toggleSection('promotions')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Promociones</h2>
              <span>{activeSection === 'promotions' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'promotions' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente puede, de vez en cuando, incluir concursos, promociones, sorteos u otras actividades ("Promociones") que requieren que envíes material o información sobre ti. Ten en cuenta que todas las Promociones pueden estar regidas por reglas separadas que pueden contener ciertos requisitos de elegibilidad, como restricciones en cuanto a edad y ubicación geográfica. Eres responsable de leer todas las reglas de Promociones para determinar si eres elegible para participar o no. Si participas en cualquier Promoción, aceptas cumplir y respetar todas las Reglas de Promociones.</p>
                <p>Pueden aplicarse términos y condiciones adicionales a las compras de bienes o servicios en o a través de los Servicios, términos y condiciones que se hacen parte de este Acuerdo por esta referencia.</p>
              </div>
            )}
          </section>
          
          <section id="errors">
            <button 
              onClick={() => toggleSection('errors')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Errores Tipográficos</h2>
              <span>{activeSection === 'errors' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'errors' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>En caso de que un producto y/o servicio se liste a un precio incorrecto o con información incorrecta debido a un error tipográfico, tendremos el derecho de rechazar o cancelar cualquier pedido realizado para el producto y/o servicio listado al precio incorrecto. Tendremos el derecho de rechazar o cancelar cualquier pedido ya sea que haya sido confirmado o no y tu tarjeta de crédito haya sido cargada. Si tu tarjeta de crédito ya ha sido cargada por la compra y tu pedido es cancelado, emitiremos inmediatamente un crédito a tu cuenta de tarjeta de crédito u otra cuenta de pago por el monto del cargo.</p>
              </div>
            )}
          </section>
          
          <section id="misc">
            <button 
              onClick={() => toggleSection('misc')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Varios</h2>
              <span>{activeSection === 'misc' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'misc' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>Si por alguna razón un tribunal de jurisdicción competente encuentra que alguna disposición o parte de estos Términos y Condiciones es inaplicable, el resto de estos Términos y Condiciones continuará en pleno vigor y efecto. Cualquier renuncia a cualquier disposición de estos Términos y Condiciones será efectiva solo si es por escrito y firmada por un representante autorizado de SolarMente. SolarMente tendrá derecho a una medida cautelar u otra medida equitativa (sin las obligaciones de publicar una fianza o garantía) en caso de cualquier incumplimiento o incumplimiento anticipado por parte tuya. SolarMente opera y controla el Servicio SolarMente desde sus oficinas en Panamá. El Servicio no está destinado a la distribución o uso por cualquier persona o entidad en cualquier jurisdicción o país donde dicha distribución o uso sería contrario a la ley o regulación. En consecuencia, aquellas personas que eligen acceder al Servicio SolarMente desde otras ubicaciones lo hacen por su propia iniciativa y son las únicas responsables del cumplimiento de las leyes locales, si y en la medida en que las leyes locales sean aplicables. Estos Términos y Condiciones (que incluyen e incorporan la Política de Privacidad de SolarMente) contiene todo el entendimiento, y reemplaza todos los entendimientos previos, entre tú y SolarMente con respecto a su asunto, y no puede ser cambiado o modificado por ti. Los encabezados de sección utilizados en este Acuerdo son solo para conveniencia y no se les dará ninguna importancia legal.</p>
              </div>
            )}
          </section>
          
          <section id="disclaimer">
            <button 
              onClick={() => toggleSection('disclaimer')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Descargo de Responsabilidad</h2>
              <span>{activeSection === 'disclaimer' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'disclaimer' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>SolarMente no es responsable de ningún contenido, código o cualquier otra imprecisión.</p>
                <p>SolarMente no proporciona garantías ni garantías.</p>
                <p>En ningún caso SolarMente será responsable de cualquier daño especial, directo, indirecto, consecuencial o incidental o cualquier daño, ya sea en una acción de contrato, negligencia u otro agravio, que surja de o en conexión con el uso del Servicio o los contenidos del Servicio. La Compañía se reserva el derecho de hacer adiciones, eliminaciones o modificaciones a los contenidos del Servicio en cualquier momento sin previo aviso.</p>
                <p>El Servicio SolarMente y sus contenidos se proporcionan "tal cual" y "según disponibilidad" sin ninguna garantía o representación de ningún tipo, ya sea expresa o implícita. SolarMente es un distribuidor y no un editor del contenido suministrado por terceros; como tal, SolarMente no ejerce ningún control editorial sobre dicho contenido y no hace ninguna garantía o representación en cuanto a la precisión, confiabilidad o actualidad de cualquier información, contenido, servicio o mercancía proporcionada a través de o accesible a través del Servicio SolarMente. Sin limitar lo anterior, SolarMente renuncia específicamente a todas las garantías y representaciones en cualquier contenido transmitido en conexión con el Servicio SolarMente o en sitios que puedan aparecer como enlaces en el Servicio SolarMente, o en los productos proporcionados como parte de, o de otra manera en conexión con, el Servicio SolarMente, incluidas, sin limitación, todas las garantías de comerciabilidad, idoneidad para un propósito particular o no infracción de derechos de terceros. Ningún consejo oral o información escrita dada por SolarMente o cualquiera de sus afiliados, empleados, funcionarios, directores, agentes, o similares creará una garantía. La información de precio y disponibilidad está sujeta a cambios sin previo aviso. Sin limitar lo anterior, SolarMente no garantiza que el Servicio SolarMente será ininterrumpido, incorrupto, oportuno o libre de errores.</p>
              </div>
            )}
          </section>
          
          <section id="contact">
            <button 
              onClick={() => toggleSection('contact')}
              className="w-full flex justify-between items-center text-xl font-semibold mb-4 text-white bg-gray-900/40 p-4 rounded-t-lg border border-gray-800"
            >
              <h2>Contáctenos</h2>
              <span>{activeSection === 'contact' ? '−' : '+'}</span>
            </button>
            
            {activeSection === 'contact' && (
              <div className="text-gray-300 space-y-4 animate-fadeIn bg-gray-900/20 p-6 rounded-b-lg border-x border-b border-gray-800">
                <p>No dudes en contactarnos si tienes alguna pregunta.</p>
                <ul className="list-disc pl-6">
                  <li>Vía Correo Electrónico: ventas@solarmente.io</li>
                  <li>Vía Teléfono: 64143255</li>
                  <li>Vía este Enlace: solarmente.io</li>
                </ul>
              </div>
            )}
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Para más información o consultas sobre nuestros Términos y Condiciones, contáctanos:
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <a 
              href="mailto:info@solarmente.io" 
              className="text-solarmente-orange hover:text-solarmente-orange/80 transition-colors"
            >
              ventas@solarmente.io
            </a>
            
            <span className="hidden md:inline text-gray-600">|</span>
            
            <a 
              href="tel:+50764143255" 
              className="text-solarmente-orange hover:text-solarmente-orange/80 transition-colors"
            >
              +507 6414-3255
            </a>
            
            <span className="hidden md:inline text-gray-600">|</span>
            
            <a 
              href="https://solarmente.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-solarmente-orange hover:text-solarmente-orange/80 transition-colors"
            >
              solarmente.io
            </a>
          </div>
          
          <button
            onClick={() => router.back()}
            className="text-white bg-solarmente-orange hover:bg-solarmente-orange/90 px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Volver a la página principal
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 SolarMente. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      
      {/* Estilos */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}