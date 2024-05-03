import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
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

export async function getQuiz() {
  const snapshot = await getDocs(collection(db, "html-q"));
  const quiz = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
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
