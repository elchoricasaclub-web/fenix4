import { db } from '../firebase';
import { collection, getDocs, addDoc, query, onSnapshot } from 'firebase/firestore';

const CROPS_COLLECTION = 'cropStages';

export const getCrops = async () => {
  try {
    const q = query(collection(db, CROPS_COLLECTION));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo lotes de cultivo:", error);
    return [];
  }
};

export const initializeDefaultCrops = async (defaultCrops) => {
  try {
    const currentCrops = await getCrops();
    if (currentCrops.length === 0) {
      console.log("Inicializando datos por defecto en Firestore...");
      const promises = defaultCrops.map(crop => {
        // Remove the static id so Firestore generates one
        const { id, ...cropData } = crop; 
        return addDoc(collection(db, CROPS_COLLECTION), cropData);
      });
      await Promise.all(promises);
      console.log("Datos por defecto creados con éxito.");
    }
  } catch (error) {
    console.error("Error inicializando datos:", error);
  }
};

export const subscribeToCrops = (callback) => {
  const q = query(collection(db, CROPS_COLLECTION));
  return onSnapshot(q, (snapshot) => {
    const crops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(crops);
  });
};
