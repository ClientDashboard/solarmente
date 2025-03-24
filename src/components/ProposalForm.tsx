'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Supabase
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

export default function ProposalForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    consumo: 1000, // Default value
    tipoPropiedad: 'residencial', // Default value
    provincia: 'Panamá', // Default value
  });
  
  const [errors, setErrors] = useState({
    nombre: '',
    telefono: '',
    email: '',
    provincia: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nombre: '',
      telefono: '',
      email: '',
      provincia: '',
    };

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
      isValid = false;
    } else if (!/^\d{8}$/.test(formData.telefono)) {
      // Para Panamá, validar 8 dígitos
      newErrors.telefono = 'Ingrese un número de teléfono válido (8 dígitos)';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      // Validación de email más robusta
      newErrors.email = 'Ingrese un email válido';
      isValid = false;
    }

    if (!formData.provincia) {
      newErrors.provincia = 'Seleccione una provincia';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Guardar datos en Supabase
        const { data, error } = await supabase
          .from('solicitudes')
          .insert([
            { 
              nombre: formData.nombre,
              telefono: formData.telefono,
              email: formData.email,
              consumo: formData.consumo,
              tipo_propiedad: formData.tipoPropiedad,
              provincia: formData.provincia,
              fecha_creacion: new Date().toISOString(),
              estado: 'pendiente'
            }
          ])
          .select();

        if (error) {
          console.error("Error al guardar en Supabase:", error);
          throw error;
        }

        console.log("Datos guardados en Supabase:", data);

        // ID único de la solicitud
        const solicitudId = data?.[0]?.id;
        
        // Codificar datos del formulario para los parámetros de la URL
        const params = new URLSearchParams({
          id: solicitudId || '',
          nombre: formData.nombre,
          telefono: `+507 ${formData.telefono}`,
          email: formData.email,
          consumo: formData.consumo.toString(),
          tipoPropiedad: formData.tipoPropiedad,
          provincia: formData.provincia
        }).toString();
        
        // IMPORTANTE: Adaptar la URL de redirección a la estructura actual de tu proyecto
        // Verifica si la ruta correcta es /propuesta o /propuesta/resultado o cualquier otra
        console.log(`Redirigiendo a: /propuesta?${params}`);
        router.push(`/propuesta?${params}`);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Solicitud de Propuesta</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <div className="flex">
            <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md flex items-center">
              <span className="text-sm">+507</span>
            </div>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.telefono ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="8 dígitos"
            />
          </div>
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">
            Provincia
          </label>
          <select
            id="provincia"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.provincia ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccione una provincia</option>
            {PROVINCIAS.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
              </option>
            ))}
          </select>
          {errors.provincia && (
            <p className="mt-1 text-sm text-red-500">{errors.provincia}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Propiedad
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="residencial"
                name="tipoPropiedad"
                value="residencial"
                checked={formData.tipoPropiedad === 'residencial'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="residencial" className="ml-2 text-sm text-gray-700">
                Residencial
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="comercial"
                name="tipoPropiedad"
                value="comercial"
                checked={formData.tipoPropiedad === 'comercial'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="comercial" className="ml-2 text-sm text-gray-700">
                Comercial
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="consumo" className="block text-sm font-medium text-gray-700 mb-1">
            Consumo promedio (kWh): {formData.consumo}
          </label>
          <input
            type="range"
            id="consumo"
            name="consumo"
            min="1000"
            max="40000"
            step="100"
            value={formData.consumo}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1,000 kWh</span>
            <span>40,000 kWh</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? 'Procesando...' : 'Generar Propuesta'}
        </button>
      </form>
    </div>
  );
}