import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({});


function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPro')

            if(storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            let data = {
                uid: uid,
                nome: docSnap.nome,
                email: value.user.email,
                avatarURL: docSnap.data().avatarURL
            }

            setUser(data);
            storegeUser(data);
            setLoadingAuth(false);
            toast.success("Seja bem-vindo!!")
            navigate("/dashboard")
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Erro ao acessar! Verifique as informações...")
        })
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
            console.log(error);
            setLoadingAuth(false);
            toast.error("Erro ao realizar cadastro! Verifique as informações...")
        })
    }


    function storegeUser(data) {
        localStorage.setItem("@ticketsPro", JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@ticketsPro');
        setUser(null)
    }

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user, // false ou true
                user,
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;