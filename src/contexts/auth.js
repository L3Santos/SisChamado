import React, { createContext, useState } from "react";
import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({});


function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false)
    const navigate = useNavigate();

    function signIn(email, password) {
    }

    async function signUp(nome, email, password) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: nome,
                avatarURL:  null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarURL: null
                };
                setUser(data)
                storegeUser(data)
                setLoadingAuth(false);
                toast.success("Seja bem-vindo ao sistema")
                navigate("/dashboard")
            })
        })
        .catch((error) => {
            alert(error)
        })
    }


    function storegeUser(data) {
        localStorage.setItem("@ticketsPro", JSON.stringify(data))
    }

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user, // false
                user,
                signIn,
                signUp,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;