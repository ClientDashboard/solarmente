{/* Proyecto 1 - DSV */}
<div className="flex-shrink-0 w-80 snap-center">
  <div className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:border-solarmente-orange/50 hover:shadow-xl h-full flex flex-col">
    <div className="h-56 overflow-hidden relative">
      {/* Imagen principal del proyecto */}
      <div 
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/38.jpg')" }}
      ></div>
      
      {/* Logo overlay que ocupa todo el cuadro */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <img 
          src="/images/dsv.jpg" 
          alt="DSV Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">Proyecto Comercial - DSV</h3>
        <span className="text-xs font-medium bg-solarmente-orange text-white px-4 py-1.5 rounded-full whitespace-nowrap">218.36 kW</span>
      </div>
      
      {/* Descripción alineada con altura fija */}
      <div className="h-16 mb-4">
        <p className="text-sm text-gray-400">367 paneles solares de última generación con sistema de monitoreo en tiempo real.</p>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Ahorro mensual:</span>
          <span className="font-bold text-green-500">$4,500</span>
        </div>
        <button 
          onClick={() => openModal('dsv')}
          className="w-full text-solarmente-orange hover:text-solarmente-orange/80 inline-flex items-center justify-center text-sm font-medium py-2 border border-solarmente-orange/30 rounded-lg hover:bg-solarmente-orange/10 transition-colors"
        >
          Ver resultados de ahorro
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
