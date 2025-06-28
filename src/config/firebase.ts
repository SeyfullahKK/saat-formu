import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase yapılandırması - Bu bilgileri Firebase Console'dan alın
// Firebase Console > Project Settings > Your apps > Web app > Config
const firebaseConfig = {
  apiKey: "AIzaSyApx9yNx_aLdN9o2y_iaqrHtdOLDedt0ns", // Firebase Console'dan kopyalayın
  authDomain: "saat-takip-51a86.firebaseapp.com", // Proje ID'niz + .firebaseapp.com
  databaseURL: "https://saat-takip-51a86-default-rtdb.europe-west1.firebasedatabase.app/", // Realtime Database URL'i
  projectId: "saat-takip-51a86", // Proje ID'niz
  storageBucket: "saat-takip-51a86.firebasestorage.app", // Proje ID'niz + .appspot.com
  messagingSenderId: "901278169643", // Firebase Console'dan kopyalayın
  appId: "1:901278169643:web:fd7bb51a54e4f3eaa5486e" // Firebase Console'dan kopyalayın
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Database referansını al
export const database = getDatabase(app);
export default app; 