#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ruta al archivo
const filePath = path.join('src', 'app', 'ProposalForm.tsx');

// Verificar si el archivo existe
if (!fs.existsSync(filePath)) {
  console.error(`El archivo ${filePath} no existe.`);
  process.exit(1);
}

// Leer el contenido del archivo
let content = fs.readFileSync(filePath, 'utf8');

// Añadir importación de helpers de Intercom
const importPattern = /import { useRouter } from 'next\/navigation';/;
const newImport = `import { useRouter } from 'next/navigation';
import { updateIntercomUser, trackIntercomEvent } from '../components/intercom';`;
content = content.replace(importPattern, newImport);

// Actualizar la sección de Intercom en handleSubmit
const intercomPattern = /\/\/ Actualizamos Intercom si está disponible\s*if \(window\.Intercom\) \{\s*window\.Intercom\('update', \{[\s\S]*?\}\);\s*\}/;
const newIntercomCode = `// Actualizamos Intercom con los datos del usuario
      updateIntercomUser({
        name: formData.nombre,
        email: formData.email,
        phone: telefonoFormatted,
        tipo_propiedad: formData.tipoPropiedad,
        provincia: formData.provincia,
        consumo_kwh: formData.consumo,
        fase_electrica: formData.faseElectrica,
        ahorro_estimado: calculateSavings(),
        fecha_solicitud: new Date().toISOString()
      });
      
      // Registrar evento de propuesta creada
      trackIntercomEvent('propuesta_creada', {
        consumo: formData.consumo,
        ahorro_estimado: calculateSavings()
      });`;

content = content.replace(intercomPattern, newIntercomCode);

// Guardar el archivo
fs.writeFileSync(filePath, content, 'utf8');

console.log('Las importaciones y el código de Intercom han sido actualizados.');
