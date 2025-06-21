import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WorkEntry } from '../types';

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    jobTitle: '',
    hours: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.name || !formData.surname || !formData.jobTitle || !formData.hours) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    // Yeni giriş oluştur
    const newEntry: WorkEntry = {
      id: Date.now().toString(),
      name: formData.name,
      surname: formData.surname,
      jobTitle: formData.jobTitle,
      hours: formData.hours as any, // Type'ı any olarak değiştir
      date: new Date().toLocaleDateString('tr-TR'),
      timestamp: Date.now()
    };

    // Mevcut kayıtları al
    const existingEntries = JSON.parse(localStorage.getItem('workEntries') || '[]');
    
    // Yeni kaydı ekle
    const updatedEntries = [...existingEntries, newEntry];
    
    // localStorage'a kaydet
    localStorage.setItem('workEntries', JSON.stringify(updatedEntries));

    // Formu temizle
    setFormData({
      name: '',
      surname: '',
      jobTitle: '',
      hours: ''
    });

    alert('Kayıt başarıyla eklendi!');
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            Kaydet
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