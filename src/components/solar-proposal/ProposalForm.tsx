'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/animations.css';
import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Supabase (ajusta si deseas usarlo para almacenar faseElectrica)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Provincias de Panamá
const PROVINCIAS = [
  'Bocas del Toro',
  'Chiriquí',
  'Coclé',
  'Colón',
  'Darién',
  'Herrera',
  'Los Santos',
  'Panamá',
  'Panamá Oeste',
  'Veraguas',
  'Emberá-Wounaan',
  'Guna Yala',
  'Ngäbe-Buglé'
];

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  consumo: number;
  tipoPropiedad: 'residencial' | 'comercial';
  provincia: string;
  // Nueva propiedad para monofásico / trifásico
  faseElectrica: 'monofasico' | 'trifasico';
}

interface FormErrors {
  nombre: string;
  telefono: string;
  email: string;
  provincia: string;
}

export default function ProposalForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  // Estado inicial con faseElectrica por defecto "monofasico"
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    email: '',
    consumo: 1000,
    tipoPropiedad: 'residencial',
    provincia: 'Panamá',
    faseElectrica: 'monofasico', // Valor por defecto
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    nombre: '',
    telefono: '',
    email: '',
    provincia: '',
  });
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Efecto para animación inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'consumo' ? parseInt(value) : value,
    });
    
    // Clear error cuando el usuario escribe
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    if (step === 1) {
      if (!formData.nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
        isValid = false;
      } else {
        newErrors.nombre = '';
      }
    } else if (step === 2) {
      if (!formData.telefono.trim()) {
        newErrors.telefono = 'El teléfono es requerido';
        isValid = false;
      } else if (!/^\d{8}$/.test(formData.telefono)) {
        newErrors.telefono = 'Ingrese un número de teléfono válido (8 dígitos)';
        isValid = false;
      } else {
        newErrors.telefono = '';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
        isValid = false;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        newErrors.email = 'Ingrese un email válido';
        isValid = false;
      } else {
        newErrors.email = '';
      }
    } else if (step === 3) {
      if (!formData.provincia) {
        newErrors.provincia = 'Seleccione una provincia';
        isValid = false;
      } else {
        newErrors.provincia = '';
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  // Cálculo simplificado de ahorro mensual
  const calculateSavings = (): number => {
    const tarifaPromedio = 0.26; // $0.26/kWh
    const ahorroMensual = formData.consumo * tarifaPromedio;
    return Math.round(ahorroMensual);
  };
  
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const estimatedSavings = calculateSavings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      setIsSubmitting(true);
      
      try {
        // Simulamos un retardo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generamos un ID temporal
        const tempId = `temp-${Date.now()}`;
        
        // Construimos los parámetros de la URL, incluyendo faseElectrica
        const params = new URLSearchParams({
          id: tempId,
          nombre: formData.nombre,
          telefono: `+507 ${formData.telefono}`,
          email: formData.email,
          consumo: formData.consumo.toString(),
          tipoPropiedad: formData.tipoPropiedad,
          provincia: formData.provincia,
          faseElectrica: formData.faseElectrica
        }).toString();
        
        // Redirigimos a la página de resultados
        router.push(`/propuesta/resultado?${params}`);
      } catch (error: any) {
        console.error('Error al procesar el formulario:', error);
        alert(`Hubo un error al procesar tu solicitud: ${error.message || 'Error desconocido'}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getProgressPercentage = () => {
    if (activeStep === 4) return 100;
    return (activeStep - 1) * 33.33;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 bg-black relative overflow-hidden font-[Mulish,sans-serif]">
      {/* Background with animated lines */}
      <div className="absolute inset-0 bg-black">
        {/* Grid Pattern - Panel Solar */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(30, 30, 40, 0.9) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(30, 30, 40, 0.9) 1px, transparent 1px),
              linear-gradient(rgba(20, 80, 120, 0.2) 1px, transparent 2px),
              linear-gradient(90deg, rgba(20, 80, 120, 0.2) 1px, transparent 2px)
            `,
            backgroundSize: '200px 300px, 200px 300px, 40px 60px, 40px 60px',
            backgroundPosition: '0 0, 0 0, -1px -1px, -1px -1px',
            opacity: 0.7
          }}
        ></div>
        
        {/* Efecto reflejo panel solar */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 20%, rgba(40, 80, 120, 0.2) 0%, transparent 70%)',
            opacity: 0.7
          }}
        ></div>
        
        {/* Animated Lines */}
        <div className="moving-line-h line-h1"></div>
        <div className="moving-line-h line-h2"></div>
        <div className="moving-line-h line-h3"></div>
        <div className="moving-line-v line-v1"></div>
        <div className="moving-line-v line-v2"></div>
        <div className="moving-line-v line-v3"></div>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 w-full max-w-xl mx-auto px-4 transition-all duration-1000 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        {/* Form Container */}
        <div className="bg-black border border-[#FF671F]/30 rounded-2xl shadow-2xl shadow-[#FF671F]/10 overflow-hidden mx-4">
          {/* Logo & Title */}
          <div className="text-center py-8 px-4">
            <div className="relative inline-block">
              <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
                Solar<span className="text-[#FF671F]">Mente</span>
                <span className="text-[#FF671F] font-light">.AI</span>
                
                {/* Circle Icon */}
                <div className="absolute -right-12 -top-3 z-20">
                  <div className="w-8 h-8 bg-[#FF671F] rounded-full animate-pulse-custom"></div>
                </div>
              </h1>
            </div>
            
            <h2 className="text-xl text-white font-light mt-2 mb-2 tracking-wide">
              Energía inteligente para un 
              <span className="relative">
                <span className="relative z-10 ml-2 text-[#FF671F] font-medium">futuro brillante</span>
                <span className="absolute bottom-0 left-1 h-2 w-full bg-[#FF671F]/20 z-0"></span>
              </span>
            </h2>
            
            <p className="text-gray-400 text-sm max-w-lg mx-auto tracking-wide">
              Primera empresa en Panamá que combina energía solar con IA avanzada.
              Ahorra hasta un 100% en tu factura de luz con propuestas personalizadas.
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-1 bg-gray-800">
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-[#FF671F] transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          {/* Header */}
          <div className="bg-gray-900 text-white p-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <span>{activeStep < 4 ? `Paso ${activeStep} de 3` : 'Revisar datos'}</span>
              <span className="ml-auto">
                {estimatedSavings > 0 && activeStep > 2 && (
                  <span className="bg-black text-[#FF671F] px-3 py-1 rounded-full text-xs font-bold border border-[#FF671F]/30">
                    Ahorro: ~${formatNumber(estimatedSavings)}/mes
                  </span>
                )}
              </span>
            </h3>
            <p className="text-sm leading-relaxed">
              {activeStep === 1 && "Comencemos por conocerte. Ingresa tu nombre completo para personalizar tu propuesta."}
              {activeStep === 2 && "¿Cómo podemos contactarte? Necesitamos tu teléfono y email para enviarte la propuesta."}
              {activeStep === 3 && "Cuéntanos sobre tu propiedad y la fase eléctrica para calcular el sistema ideal."}
              {activeStep === 4 && "Revisa tus datos antes de generar tu propuesta personalizada con IA."}
            </p>
          </div>
          
          {/* Form Body */}
          <div className="p-6 bg-black">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Nombre */}
              {activeStep === 1 && (
                <div className="transition-all duration-300 animate-fadeIn">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] transition-all duration-200 ${
                      errors.nombre ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Introduce tu nombre completo"
                    autoFocus
                  />
                  {errors.nombre && (
                    <p className="mt-2 text-xs text-red-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.nombre}
                    </p>
                  )}
                  
                  <div className="mt-10 text-center">
                    <div className="text-xs text-gray-500 mb-4">Este dato nos ayuda a personalizar tu propuesta</div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="orange-button w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group"
                    >
                      <span>Continuar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Contacto */}
              {activeStep === 2 && (
                <div className="transition-all duration-300 animate-fadeIn">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <div className="flex">
                        <div className="px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-l-xl flex items-center text-gray-300">
                          <span className="text-sm mr-1">🇵🇦</span>
                          <span>+507</span>
                        </div>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className={`flex-1 px-4 py-3 bg-gray-900 text-white border-2 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] transition-all duration-200 ${
                            errors.telefono ? 'border-red-500' : 'border-gray-700'
                          }`}
                          placeholder="8 dígitos"
                          autoFocus
                        />
                      </div>
                      {errors.telefono && (
                        <p className="mt-2 text-xs text-red-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {errors.telefono}
                        </p>
                      )}
                    </div>
            
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] transition-all duration-200 ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transition-transform duration-300 transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Atrás</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={nextStep}
                      className="orange-button px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 flex items-center group"
                    >
                      <span>Continuar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Propiedad y Fase Eléctrica */}
              {activeStep === 3 && (
                <div className="transition-all duration-300 animate-fadeIn">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="provincia" className="block text-sm font-medium text-gray-300 mb-2">
                        Provincia
                      </label>
                      <select
                        id="provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] transition-all duration-200 ${
                          errors.provincia ? 'border-red-500' : 'border-gray-700'
                        }`}
                        autoFocus
                      >
                        <option value="">Seleccione una provincia</option>
                        {PROVINCIAS.map((provincia) => (
                          <option key={provincia} value={provincia}>
                            {provincia}
                          </option>
                        ))}
                      </select>
                      {errors.provincia && (
                        <p className="mt-2 text-xs text-red-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {errors.provincia}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tipo de Propiedad
                      </label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div 
                          className={`border-2 ${formData.tipoPropiedad === 'residencial' ? 'border-[#FF671F] bg-[#FF671F]/10' : 'border-gray-700 bg-gray-900'} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#FF671F]/70`}
                          onClick={() => setFormData({...formData, tipoPropiedad: 'residencial'})}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 ${formData.tipoPropiedad === 'residencial' ? 'border-[#FF671F] bg-[#FF671F]' : 'border-gray-600'} flex items-center justify-center`}>
                              {formData.tipoPropiedad === 'residencial' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="ml-2 font-medium text-white">Residencial</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border-2 ${formData.tipoPropiedad === 'comercial' ? 'border-[#FF671F] bg-[#FF671F]/10' : 'border-gray-700 bg-gray-900'} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#FF671F]/70`}
                          onClick={() => setFormData({...formData, tipoPropiedad: 'comercial'})}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 ${formData.tipoPropiedad === 'comercial' ? 'border-[#FF671F] bg-[#FF671F]' : 'border-gray-600'} flex items-center justify-center`}>
                              {formData.tipoPropiedad === 'comercial' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="ml-2 font-medium text-white">Comercial</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nueva sección para Monofásico o Trifásico */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Fase Eléctrica
                      </label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div 
                          className={`border-2 ${formData.faseElectrica === 'monofasico' ? 'border-[#FF671F] bg-[#FF671F]/10' : 'border-gray-700 bg-gray-900'} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#FF671F]/70`}
                          onClick={() => setFormData({...formData, faseElectrica: 'monofasico'})}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 ${formData.faseElectrica === 'monofasico' ? 'border-[#FF671F] bg-[#FF671F]' : 'border-gray-600'} flex items-center justify-center`}>
                              {formData.faseElectrica === 'monofasico' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="ml-2 font-medium text-white">Monofásico</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border-2 ${formData.faseElectrica === 'trifasico' ? 'border-[#FF671F] bg-[#FF671F]/10' : 'border-gray-700 bg-gray-900'} rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[#FF671F]/70`}
                          onClick={() => setFormData({...formData, faseElectrica: 'trifasico'})}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 ${formData.faseElectrica === 'trifasico' ? 'border-[#FF671F] bg-[#FF671F]' : 'border-gray-600'} flex items-center justify-center`}>
                              {formData.faseElectrica === 'trifasico' && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="ml-2 font-medium text-white">Trifásico</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Consumo promedio mensual (kWh): <span className="font-bold text-[#FF671F]">{formatNumber(formData.consumo)} kWh</span>
                      </label>
                      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl relative overflow-hidden">
                        {/* Energy progress indicator */}
                        <div 
                          className="absolute top-0 bottom-0 left-0 bg-[#FF671F]/20 h-full transition-all duration-300"
                          style={{ width: `${(formData.consumo - 1000) / 390}%` }}
                        ></div>
                        
                        <div className="relative z-10">
                          <input
                            type="range"
                            id="consumo"
                            name="consumo"
                            min="1000"
                            max="40000"
                            step="100"
                            value={formData.consumo}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer relative"
                            style={{
                              background: `linear-gradient(to right, #FF671F 0%, #FF671F ${(formData.consumo-1000)/390}%, #374151 ${(formData.consumo-1000)/390}%, #374151 100%)`
                            }}
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>1,000 kWh</span>
                            <span>40,000 kWh</span>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-400">
                            <p>
                              <span className="font-medium text-gray-300">¿Dónde encuentro mi consumo?</span> Revisa tu factura de electricidad, 
                              donde aparece el consumo en kWh.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transition-transform duration-300 transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Atrás</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const confirmConsumption = window.confirm(`¿Confirmas que tu consumo mensual es de ${formatNumber(formData.consumo)} kWh? Este dato es importante para calcular tu ahorro.`);
                        if (confirmConsumption) {
                          nextStep();
                        }
                      }}
                      className="orange-button px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 flex items-center group"
                    >
                      <span>Continuar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Resumen y Submit */}
              {activeStep === 4 && (
                <div className="transition-all duration-300 animate-fadeIn">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
                    <h3 className="font-medium text-lg mb-4 text-white">Resumen de datos</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium text-white">{formData.nombre}</p>
                      </div>
                      
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium text-white">+507 {formData.telefono}</p>
                      </div>
                      
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-white">{formData.email}</p>
                      </div>
                      
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Provincia</p>
                        <p className="font-medium text-white">{formData.provincia}</p>
                      </div>
                      
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Tipo de Propiedad</p>
                        <p className="font-medium text-white capitalize">{formData.tipoPropiedad}</p>
                      </div>
                      
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Consumo mensual</p>
                        <p className="font-medium text-white">{formatNumber(formData.consumo)} kWh</p>
                      </div>

                      {/* Mostrar la fase eléctrica en el resumen */}
                      <div className="border-b border-gray-800 pb-2">
                        <p className="text-sm text-gray-500">Fase Eléctrica</p>
                        <p className="font-medium text-white">
                          {formData.faseElectrica === 'monofasico' ? 'Monofásico' : 'Trifásico'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl p-5 bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30 mb-6">
                    <div className="flex items-start">
                      <div className="bg-green-800/50 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-green-400 font-medium">Ahorro Estimado Preliminar</h4>
                        <p className="text-sm text-green-300 mt-1">
                          Basado en tu consumo de <span className="font-semibold">{formatNumber(formData.consumo)} kWh</span>, podrías ahorrar aproximadamente <span className="font-bold text-[#FF671F]">${formatNumber(estimatedSavings)}/mes</span>. Recibirás un análisis financiero detallado en tu propuesta.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transition-transform duration-300 transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span>Atrás</span>
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="orange-button px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 flex items-center group"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <span>Generar Propuesta</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
