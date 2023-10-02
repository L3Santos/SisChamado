import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvBR7lDJXUHFSosZdbnP7_d7dtNwWw5iI",
    authDomain: "sistemchamados-f8ca1.firebaseapp.com",
    projectId: "sistemchamados-f8ca1",
    storageBucket: "sistemchamados-f8ca1.appspot.com",
    messagingSenderId: "424286320926",
    appId: "1:424286320926:web:f63ea61488a340692fb10f",
    measurementId: "G-9EV200GZMC"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {
    auth,
    db,
    storage
};

