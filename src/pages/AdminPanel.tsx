import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WorkEntry } from '../types';
import AdminLogin from '../components/AdminLogin';

const AdminPanel: React.FC = () => {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'hours'>('date');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Giriş durumunu kontrol et
    const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // localStorage'dan verileri al
      const storedEntries = JSON.parse(localStorage.getItem('workEntries') || '[]');
      setEntries(storedEntries);
    }
  }, [isLoggedIn]);

  // Filtreleme fonksiyonu
  const filteredEntries = entries.filter(entry => 
    entry.name.toLowerCase().includes(filter.toLowerCase()) ||
    entry.surname.toLowerCase().includes(filter.toLowerCase()) ||
    entry.jobTitle.toLowerCase().includes(filter.toLowerCase())
  );

  // Sıralama fonksiyonu
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.timestamp - a.timestamp;
      case 'name':
        return `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`);
      case 'hours':
        return a.hours.localeCompare(b.hours);
      default:
        return 0;
    }
  });

  // Kaydı silme fonksiyonu
  const deleteEntry = (id: string) => {
    if (window.confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      localStorage.setItem('workEntries', JSON.stringify(updatedEntries));
    }
  };

  // Tüm kayıtları temizleme
  const clearAllEntries = () => {
    if (window.confirm('TÜM KAYITLARI silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      setEntries([]);
      localStorage.removeItem('workEntries');
    }
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };

  // Giriş yapılmamışsa login formu göster
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 transition duration-200"
              >
                ← Ana Sayfa
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm"
              >
                Çıkış Yap
              </button>
            </div>
          </div>

          {/* Filtre ve Sıralama */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="İsim, soyisim veya pozisyon ile ara..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'hours')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Tarihe Göre</option>
              <option value="name">İsme Göre</option>
              <option value="hours">Saate Göre</option>
            </select>
          </div>

          {/* İstatistikler */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Toplam Kayıt</p>
              <p className="text-2xl font-bold text-blue-800">{filteredEntries.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Toplam Çalışan</p>
              <p className="text-2xl font-bold text-green-800">
                {new Set(filteredEntries.map(e => `${e.name} ${e.surname}`)).size}
              </p>
            </div>
          </div>

          {/* Tablo */}
          {sortedEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-700">İsim Soyisim</th>
                    <th className="text-left p-3 font-medium text-gray-700">İş Başlığı</th>
                    <th className="text-left p-3 font-medium text-gray-700">Çalışma Saati</th>
                    <th className="text-left p-3 font-medium text-gray-700">Tarih</th>
                    <th className="text-left p-3 font-medium text-gray-700">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">{entry.name} {entry.surname}</td>
                      <td className="p-3">{entry.jobTitle}</td>
                      <td className="p-3 font-medium">{entry.hours}</td>
                      <td className="p-3">{entry.date}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600 hover:text-red-800 transition duration-200"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Henüz kayıt bulunmuyor.
            </div>
          )}

          {/* Temizle Butonu */}
          {entries.length > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={clearAllEntries}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Tüm Kayıtları Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 