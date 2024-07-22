import React from 'react';

export default function Welcome() {
  return (
    <div className="h-full flex items-center justify-center p-5 bg-gradient-to-r from-cyan-500 to-blue-500 ...">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome User!</h1>
        <p className="text-gray-300 p-4">
          We're glad to have you here. Explore the platform and get started with your journey!
        </p>
      </div>
    </div>
  );
}
