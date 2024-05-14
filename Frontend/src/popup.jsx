// Popup.jsx
import React from 'react';

function popup({ onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Appointment Booked Successfully!</h2>
        <div className='w-full flex justify-center'>
        <button onClick={onClose} className="flex w-1/2 justify-center text-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Close</button>
        </div>
      </div>
    </div>
  );
}

export default popup;
