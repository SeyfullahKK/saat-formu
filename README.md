# Çalışma Saatleri Takip Sistemi

Bu proje, çalışanların haftalık çalışma saatlerini girebileceği ve yöneticilerin bu verileri görüntüleyebileceği bir web uygulamasıdır.

## Özellikler

- **Çalışan Formu**: Çalışanlar isim, soyisim, iş başlığı ve çalışılan saatleri girebilirler
- **Yönetici Paneli**: Yöneticiler tüm kayıtları görüntüleyebilir, filtreleyebilir ve silebilir
- **Veri Saklama**: Veriler tarayıcının localStorage özelliği ile saklanır
- **Modern Arayüz**: Tailwind CSS ile responsive ve kullanıcı dostu tasarım

## Kurulum

1. Projeyi klonlayın veya indirin
2. Proje dizinine gidin
3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Uygulamayı başlatın:
```bash
npm start
```

5. Tarayıcınızda `http://localhost:3000` adresine gidin

## Kullanım

### Ana Sayfa
- **Çalışan Girişi**: Çalışanlar bu butona tıklayarak form sayfasına gidebilir
- **Yönetici Paneli**: Yöneticiler bu butona tıklayarak tüm kayıtları görüntüleyebilir

### Çalışan Formu
- İsim, soyisim, iş başlığı ve çalışılan saat bilgilerini girin
- "Kaydet" butonuna tıklayarak bilgileri kaydedin

### Yönetici Paneli
- Tüm çalışma kayıtlarını görüntüleyin
- İsim, soyisim veya pozisyona göre arama yapın
- Kayıtları tarih, isim veya saate göre sıralayın
- Toplam kayıt sayısı, toplam saat ve ortalama saat istatistiklerini görün
- İstenmeyen kayıtları silin
- Tüm kayıtları temizleyin

## Teknolojiler

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- LocalStorage API

## Geliştirici Notları

- Veriler tarayıcının localStorage'ında saklanır
- Farklı tarayıcılar veya gizli/özel modda veriler paylaşılmaz
- Tarayıcı verileri temizlenirse kayıtlar silinir 