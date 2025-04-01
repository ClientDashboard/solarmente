import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Assuming the proper type structure based on your errors
interface ProposalData {
  cliente: {
    nombre: string;
  };
  consumo?: {
    mensual?: string | number;
  };
  sistema: {
    tamano: string | number;
    paneles?: string | number;
    potenciaPanel?: string | number;
    espacioRequerido?: string | number;
    inversores?: string;
    eficiencia?: string | number;
    produccionAnual?: string | number;
    tipoInstalacion?: string;
  };
  financiero: {
    ahorroMensual: string | number;
    precioTotal?: string | number;
    retornoInversion?: string | number;
    ahorro20Anos?: string | number;
    ahorroAnual?: string | number;
    reduccionFactura?: string | number;
  };
  ambiental?: {
    reduccionCO2?: string | number;
    equivalenteArboles?: string | number;
  };
  equipos?: {
    paneles?: {
      marca?: string;
      tipo?: string;
      eficiencia?: string | number;
      garantia?: string;
    };
    inversores?: {
      marca?: string;
      tipo?: string;
      monitoreo?: string;
      eficiencia?: string | number;
      garantia?: string;
    };
  };
  planes?: {
    contado?: {
      precio?: string | number;
    };
    financiado?: {
      precioMensual?: string | number;
    };
    premium?: {
      precioInicial?: string | number;
      precioCuota?: string | number;
    };
  };
}

interface PDFExportProps {
  proposalData: ProposalData;
  isDarkMode: boolean;
}

const PDFExport: React.FC<PDFExportProps> = ({ proposalData, isDarkMode }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

  // Function to convert possible number values to string
  const formatValue = (value: string | number | undefined, defaultValue: string = ''): string => {
    if (value === undefined) return defaultValue;
    return value.toString();
  };

  // Main function to generate PDF
  const generatePDF = async () => {
    if (!proposalData) return;

    try {
      setIsGeneratingPDF(true);
      setPdfProgress(5);

      // Create PDF document with compression
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Set metadata
      pdf.setProperties({
        title: `Propuesta Solar para ${proposalData.cliente.nombre}`,
        author: 'SolarMente',
        subject: `Sistema Solar de ${proposalData.sistema.tamano}kW`,
        keywords: 'energía solar, propuesta, paneles solares'
      });

      // Brand colors
      const brandColors = {
        darkBg: '#111827',
        orange: '#FF671F',
        white: '#FFFFFF',
        lightGray: '#9CA3AF',
        darkGray: '#4B5563'
      };

      // Get tab content container
      const tabContent = document.getElementById('tab-content');
      if (!tabContent) {
        throw new Error("No se encontró el contenedor de contenido");
      }

      // Add cover page
      await renderCoverPage(pdf, brandColors, proposalData);
      setPdfProgress(20);

      // Define tabs to capture
      const tabs = ['resumen', 'sistema', 'equipos', 'financiero', 'planes'];
      
      // Capture each tab content
      for (let i = 0; i < tabs.length; i++) {
        pdf.addPage();
        
        // Get current active tab content
        await renderTabPage(pdf, brandColors, tabs[i], proposalData);
        
        // Update progress
        setPdfProgress(20 + Math.floor((i + 1) * 60 / tabs.length));
      }

      // Add contact page
      pdf.addPage();
      await renderContactPage(pdf, brandColors);
      setPdfProgress(95);

      // Save the PDF
      pdf.save(`Propuesta_Solar_${proposalData.cliente.nombre.replace(/\s+/g, '_')}.pdf`);
      setPdfProgress(100);
      
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intente nuevamente.');
      setIsGeneratingPDF(false);
    }
  };

  // Render cover page using canvas for better quality
  const renderCoverPage = async (pdf: jsPDF, colors: any, data: ProposalData) => {
    // Set background
    pdf.setFillColor(17, 24, 39);
    pdf.rect(0, 0, 210, 297, 'F');

    // Title and info
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`¡Bienvenido, ${data.cliente.nombre}!`, 105, 100, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.setTextColor(255, 103, 31);
    pdf.text(`Sistema Solar: ${formatValue(data.sistema.tamano)} kW`, 105, 130, { align: 'center' });
    pdf.text(`Ahorro Mensual: $${formatValue(data.financiero.ahorroMensual)}`, 105, 150, { align: 'center' });
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    pdf.setFontSize(12);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Fecha: ${formattedDate}`, 105, 180, { align: 'center' });
  };

  // Function to render tab content
  const renderTabPage = async (pdf: jsPDF, colors: any, tabName: string, data: ProposalData) => {
    // Tab header
    pdf.setFillColor(17, 24, 39);
    pdf.rect(0, 0, 210, 40, 'F');
    
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(255, 255, 255);
    pdf.text(tabName.toUpperCase(), 105, 25, { align: 'center' });
    
    // White background for content
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 40, 210, 257, 'F');
    
    // Add simplified content for each tab
    const margin = 20;
    const startY = 60;
    
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    
    switch (tabName) {
      case 'resumen':
        pdf.text(`Sistema Solar de ${formatValue(data.sistema.tamano)} kW`, margin, startY);
        pdf.text(`Ahorro Mensual: $${formatValue(data.financiero.ahorroMensual)}`, margin, startY + 20);
        pdf.text(`Paneles Solares: ${formatValue(data.sistema.paneles, '15')}`, margin, startY + 40);
        break;
      case 'sistema':
        pdf.text(`Potencia: ${formatValue(data.sistema.tamano)} kW`, margin, startY);
        pdf.text(`Paneles: ${formatValue(data.sistema.paneles, '15')} unidades`, margin, startY + 20);
        break;
      case 'equipos':
        pdf.text("Equipamiento Premium", margin, startY);
        pdf.text("Paneles Solares de Alta Eficiencia", margin, startY + 20);
        pdf.text("Inversores con Garantía Extendida", margin, startY + 40);
        break;
      case 'financiero':
        pdf.text(`Inversión Total: $${formatValue(data.financiero.precioTotal, '13,500')}`, margin, startY);
        pdf.text(`Ahorro Mensual: $${formatValue(data.financiero.ahorroMensual)}`, margin, startY + 20);
        pdf.text(`Retorno de Inversión: ${formatValue(data.financiero.retornoInversion, '2.48')} años`, margin, startY + 40);
        break;
      case 'planes':
        pdf.text("Planes de Financiamiento", margin, startY);
        pdf.text("Plan al Contado", margin, startY + 20);
        pdf.text("Plan Financiado", margin, startY + 40);
        pdf.text("Plan Premium", margin, startY + 60);
        break;
    }
  };

  // Render contact page
  const renderContactPage = async (pdf: jsPDF, colors: any) => {
    // Background
    pdf.setFillColor(17, 24, 39);
    pdf.rect(0, 0, 210, 297, 'F');
    
    // Content
    pdf.setFontSize(24);
    pdf.setTextColor(255, 103, 31);
    pdf.text('Contáctanos', 105, 80, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setTextColor(255, 255, 255);
    pdf.text('WhatsApp: +507 6414-3255', 105, 120, { align: 'center' });
    pdf.text('Email: ventas@solarmente.io', 105, 140, { align: 'center' });
    pdf.text('Web: www.solarmente.io', 105, 160, { align: 'center' });
    pdf.text('Instagram: @solarmente.io', 105, 180, { align: 'center' });
    
    pdf.setTextColor(255, 103, 31);
    pdf.text('Nota: El precio indicado puede variar tras la inspección técnica.', 105, 220, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© SolarMente - Todos los derechos reservados', 105, 260, { align: 'center' });
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        disabled={isGeneratingPDF}
        className={`flex items-center justify-center gap-2 w-full mt-4 py-3 px-4 rounded-lg transition duration-300 ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
        }`}
      >
        {isGeneratingPDF ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Generando PDF... {pdfProgress}%</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Descargar como PDF</span>
          </>
        )}
      </button>
      {isGeneratingPDF && (
        <div className="w-full mt-2">
          <div className="h-2 bg-gray-300 rounded">
            <div 
              className="h-2 bg-solarmente-button rounded transition-all duration-500 ease-in-out" 
              style={{ width: `${pdfProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-1">Generando PDF: {pdfProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default PDFExport;