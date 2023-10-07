import React, { useContext, useState } from "react";
import Header from '../../components/Header/index';
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";

import "./profile.css";
import { toast } from "react-toastify";


import avatar from "../../assets/avatar.png"
import {AuthContext} from "../../contexts/auth"

import { db, storage } from "../../services/firebaseConnection"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function Profile() {

    const {user, logout, storegeUser, setUser} = useContext(AuthContext)
    const [avatarURL, setAvatarURL] = useState(user && user.avatarURL);
    
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [imgAvatar, setImgAvatar] = useState(null)

    async function handlerLogout() {
        await logout();
    }

    async function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0]

            if(image.type ==="image/jpeg" || image.type === "image/png") {
                setImgAvatar(image);
                setAvatarURL(URL.createObjectURL(image))
            } else {
                alert("Envia uma imagem com formato .png ou .jpeg");
                setAvatarURL(null)
                return;
            }
        }
    }


    async function handlerUpload() {
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imgAvatar.naame}`)

        const uploadTask = uploadBytes(uploadRef, imgAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarURL: urlFoto,
                    nome: nome,
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarURL: urlFoto,
                        nome: nome,
                    }
    
                    setUser(data);
                    storegeUser(data);
                    toast.success("Dados atualizados com sucesso")
                }).catch((error) => {
                    console.log(error)
                    toast.error("Erro ao atualizar dados cadastrais! Verifique as informações...")
                })
            }).catch((error) => {
                console.log(error)
                toast.error("Erro ao processar a atualização dados cadastrais! Verifique as informações...")
            })
        })
        .catch((error) => {
        toast.error("Erro ao inicializar processo de atualizar dados cadastrais! Verifique as informações...")
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(imgAvatar === null && nome !== "") {
            // Atualizar apenas o nome do usuario

            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: nome, 
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome,
                }

                setUser(data);
                storegeUser(data);
                toast.success("Dados atualizados com sucesso")
            })
            .catch((error) => {
                console.alert(error)
                toast.error("Erro ao atualizar dados cadastrais! Verifique as informações...")
            })
        } else if (nome !== "" && imgAvatar !==  null) {
            // Atualizar tanto o nome quanto a foto
            handlerUpload();
        }
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Minha Conta ">
                    <FiSettings size={25}/>
                </Title>
            </div>
            <h1>Meu peril</h1>

            <div className="content">
                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFFF" size={25}/>
                            </span>
                            <input 
                                type="file"
                                accept="image/*" 
                                onChange={handleFile}
                            />
                            <br/>
                            {avatarURL === null ?(
                                <img src={avatar} alt="Foto do Perfil"  width={250} height={250}/>
                            ) : (
                                <img src={avatarURL} alt="Foto do Perfil"  width={250} height={250}/>
                            )}
                        </label>

                        <label>Nome</label>
                        <input 
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                        />

                        <label>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            disabled={true}
                        />

                        <button className="submit-add" type="submit">Salvar</button>
                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={handlerLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )   
}