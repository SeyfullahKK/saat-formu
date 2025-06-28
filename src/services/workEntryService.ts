import { ref, push, onValue, remove, set } from 'firebase/database';
import { database } from '../config/firebase';
import { WorkEntry } from '../types';

const ENTRIES_PATH = 'workEntries';

// Yeni kayıt ekleme
export const addWorkEntry = async (entry: Omit<WorkEntry, 'id'>) => {
  try {
    const entriesRef = ref(database, ENTRIES_PATH);
    const newEntryRef = push(entriesRef);
    const entryWithId = { ...entry, id: newEntryRef.key! };
    await set(newEntryRef, entryWithId);
    return entryWithId;
  } catch (error) {
    console.error('Kayıt eklenirken hata:', error);
    throw error;
  }
};

// Tüm kayıtları dinleme (realtime)
export const subscribeToWorkEntries = (callback: (entries: WorkEntry[]) => void) => {
  const entriesRef = ref(database, ENTRIES_PATH);
  
  const unsubscribe = onValue(entriesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const entries = Object.values(data) as WorkEntry[];
      callback(entries);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Kayıt silme
export const deleteWorkEntry = async (id: string) => {
  try {
    const entryRef = ref(database, `${ENTRIES_PATH}/${id}`);
    await remove(entryRef);
  } catch (error) {
    console.error('Kayıt silinirken hata:', error);
    throw error;
  }
};

// Tüm kayıtları silme
export const deleteAllWorkEntries = async () => {
  try {
    const entriesRef = ref(database, ENTRIES_PATH);
    await remove(entriesRef);
  } catch (error) {
    console.error('Kayıtlar silinirken hata:', error);
    throw error;
  }
}; 