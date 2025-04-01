// src/app/propuesta/[proposalId]/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-solarmente-button rounded-full opacity-30 animate-ping"></div>
        <div className="w-16 h-16 border-4 border-solarmente-button border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}