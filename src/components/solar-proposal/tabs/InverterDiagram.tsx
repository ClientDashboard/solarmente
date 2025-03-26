// InverterDiagram.tsx
import React from 'react';
import { motion } from 'framer-motion';

const InverterDiagram: React.FC = () => {
  // Creamos dos arrays para representar las dos cadenas
  const string1 = Array.from({ length: 10 });
  const string2 = Array.from({ length: 9 });

  return (
    <svg width="500" height="300">
      {/* Dibujamos la primera cadena (string) de paneles */}
      {string1.map((_, i) => (
        <motion.rect
          key={`s1-${i}`}
          x={50 + i * 40}
          y={50}
          width="30"
          height="50"
          fill="#4CAF50"
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer' }}
        />
      ))}
      {/* Dibujamos la segunda cadena (string) de paneles */}
      {string2.map((_, i) => (
        <motion.rect
          key={`s2-${i}`}
          x={50 + i * 40}
          y={120}
          width="30"
          height="50"
          fill="#4CAF50"
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer' }}
        />
      ))}
      {/* Dibujamos el inversor */}
      <rect x="50" y="200" width="400" height="50" fill="#2196F3" />
      <text x="250" y="230" textAnchor="middle" fill="#fff" fontSize="18">
        Inversor
      </text>
      {/* Dibujamos líneas de conexión */}
      <line x1="50" y1="100" x2="50" y2="200" stroke="#000" strokeWidth="2" />
      <line x1="450" y1="100" x2="450" y2="200" stroke="#000" strokeWidth="2" />
    </svg>
  );
};

export default InverterDiagram;
