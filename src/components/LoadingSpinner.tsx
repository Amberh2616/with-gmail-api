import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}