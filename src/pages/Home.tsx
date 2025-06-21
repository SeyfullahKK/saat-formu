import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Çalışma Saatleri Takip Sistemi
        </h1>
        
        <div className="space-y-4">
          <Link
            to="/form"
            className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Saat Girişi
          </Link>
          
          <Link
            to="/admin"
            className="block w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200 font-medium"
          >
            Yönetici Paneli
          </Link>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Saat girişine tıklayarak haftalık çalışma saatlerinizi bildirebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default Home; 