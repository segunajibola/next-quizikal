import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCl1hWdJ2kPxE3GlYgLS0at9aslj92EHFc",
  authDomain: "html-quiz-bb3f6.firebaseapp.com",
  projectId: "html-quiz-bb3f6",
  storageBucket: "html-quiz-bb3f6.appspot.com",
  messagingSenderId: "691341193418",
  appId: "1:691341193418:web:8491cce4638231b8c20433",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addSequentialNumbers(collectionName, key) {
  try {
    // Get all documents from the specified collection
    const querySnapshot = await getDocs(collection(db, collectionName));

    let counter = 1;

    // Loop through each document
    querySnapshot.forEach(async (doc) => {
      // Get the document reference
      const docRef = doc(collection(db, collectionName), doc.id);

      // Update the document with the sequential number
      await updateDoc(docRef, {
        [key]: counter,
      });

      console.log(`Added ${key}: ${counter} to document ${doc.id}`);

      counter++;
    });
  } catch (error) {
    console.error("Error adding sequential numbers to documents: ", error);
  }
}


export async function getQuiz() {
  const snapshot = await getDocs(
    collection(db, "html-q"),
  );
  const quiz = snapshot.docs.map((doc) => ({
    ...doc.data()
    // id: doc.id,
  }));
  console.log(quiz);
  return quiz;
}

export async function sendResult(name, score, total, date, time) {
  const data = {
    name,
    score: `${score}/${total}`,
    date,
    time,
  };
  try {
    const docRef = doc(collection(db, "html-result"), name);
    await setDoc(docRef, data);
    console.log("Document written with ID: ", docRef.id);
    console.log("DB Data ", data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function sdba(counter, data) {
  console.log(data);
  try {
    const docRef = doc(collection(db, "html-q"), counter);
    setDoc(docRef, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function sdb(counter, data) {
  try {
    const docRef = await addDoc(collection(db, "html-q"), {
      id: counter,
      ...data,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
