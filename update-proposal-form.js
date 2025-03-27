#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ruta exacta al archivo
const filePath = 'src/components/solar-proposal/ProposalForm.tsx';

// Verificar si el archivo existe
if (!fs.existsSync(filePath)) {
  console.error(`El archivo ${filePath} no existe.`);
  process.exit(1);
}

console.log(`Archivo encontrado en: ${filePath}`);

// Leer el contenido del archivo
let content = fs.readFileSync(filePath, 'utf8');

// Determinar la ruta relativa para la importación
const fileDir = path.dirname(filePath);
const componentsDir = path.relative(fileDir, 'src/components');
const importPath = path.join(componentsDir, 'intercom').replace(/\\/g, '/');

// Añadir importación de helpers de Intercom
if (!content.includes('intercom')) {
  // Si ya hay imports, añadir después del último import
  if (content.includes('import ')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    
    if (endOfLastImport !== -1) {
      const beforeImport = content.substring(0, endOfLastImport + 1);
      const afterImport = content.substring(endOfLastImport + 1);
      content = beforeImport + `import { updateIntercomUser, trackIntercomEvent } from '${importPath}';\n` + afterImport;
      console.log('Importación de Intercom añadida.');
    }
  }
}

// Buscar la función handleSubmit
const handleSubmitMatch = content.match(/const handleSubmit = async \(e: React\.FormEvent\) => \{[\s\S]*?setIsSubmitting\(false\);\s*\}\s*\}\s*\};/);

if (handleSubmitMatch) {
  let handleSubmitCode = handleSubmitMatch[0];
  
  // Buscar la sección donde se llama a router.push
  const routerPushPattern = /router\.push\(`\/propuesta\/resultado\?\${params}`\);/;
  
  if (handleSubmitCode.match(routerPushPattern)) {
    const routerMatch = routerPushPattern.exec(handleSubmitCode);
    if (routerMatch) {
      const routerPosition = handleSubmitCode.indexOf(routerMatch[0]);
      const insertPosition = content.indexOf(handleSubmitCode) + routerPosition;
      
      const beforeRouter = content.substring(0, insertPosition);
      const afterRouter = content.substring(insertPosition);
      
      // Código de Intercom para insertar antes de router.push
      const intercomCode = `
      // Actualizamos Intercom con los datos del usuario
      updateIntercomUser({
        name: formData.nombre,
        email: formData.email,
        phone: '+507 ' + formData.telefono,
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
      });
      
      `;
      
      content = beforeRouter + intercomCode + afterRouter;
      console.log('Código de Intercom insertado antes de router.push().');
    }
  } else {
    console.error('No se pudo encontrar router.push en handleSubmit.');
  }
  
  // Guardar el archivo
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`El archivo ${filePath} ha sido actualizado correctamente.`);
} else {
  console.error('No se pudo encontrar la función handleSubmit en el archivo.');
}
