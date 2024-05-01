import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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
  console.log(quiz)
  return quiz
}

export async function getVans() {
  // const snapshot = host ? await getDocs(vehiclesCollectionRef) : await getDocs(usersCollectionRef)
  const snapshot = await getDocs(vehiclesCollectionRef);
  const vehicles = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // console.log(vehicles);
  return vehicles;
}
