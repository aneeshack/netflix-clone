import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth/cordova";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";
// import { useId } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC1FmXehzcQ-iHbvHiZ4IGcxI_s3RCGnmU",
  authDomain: "netflix-clone-8c44b.firebaseapp.com",
  projectId: "netflix-clone-8c44b",
  storageBucket: "netflix-clone-8c44b.appspot.com",
  messagingSenderId: "465364026103",
  appId: "1:465364026103:web:b30bdab95d30e81f7d49f2",
  measurementId: "G-2MM8W75TNL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) =>{
    try {
        console.log('inside signup')
       const res = await createUserWithEmailAndPassword(auth, email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))

    }
}

const login = async(email,  password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async() =>{
    signOut(auth)
}

export{
    db,
    auth,
    login,
    logout,
    signup
}