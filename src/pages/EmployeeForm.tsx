import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addWorkEntry } from '../services/workEntryService';

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    jobTitle: '',
    hours: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.name || !formData.surname || !formData.jobTitle || !formData.hours) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    setIsLoading(true);

    try {
      // Yeni giriş oluştur
      const newEntry = {
        name: formData.name,
        surname: formData.surname,
        jobTitle: formData.jobTitle,
        hours: formData.hours,
        date: new Date().toLocaleDateString('tr-TR'),
        timestamp: Date.now()
      };

      // Firebase'e kaydet
      await addWorkEntry(newEntry);

      // Formu temizle
      setFormData({
        name: '',
        surname: '',
        jobTitle: '',
        hours: ''
      });

      alert('Kayıt başarıyla eklendi!');
    } catch (error) {
      alert('Kayıt eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Çalışma Saati Girişi</h1>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition duration-200"
          >
            ← Geri
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İsim
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adınızı girin"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soyisim
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Soyadınızı girin"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İş Başlığı
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Konunuzu girin"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Çalışılan Saat
            </label>
            <input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Örn: 8.5 veya 15:30:00"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
              isLoading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Haftalık çalışma saatlerinizi buradan girebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default EmployeeForm; 