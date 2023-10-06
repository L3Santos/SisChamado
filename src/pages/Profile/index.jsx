import React, { useContext, useState } from "react";
import Header from '../../components/Header/index';
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";

import "./profile.css"

import avatar from "../../assets/avatar.png"
import {AuthContext, storegeUser, setUser, logout } from "../../contexts/auth"

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
                    <form className="form-profile">
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

                        <button type="submit">Salvar</button>
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