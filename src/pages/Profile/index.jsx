import React, { useContext, useState } from "react";
import Header from '../../components/Header/index';
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";

import "./profile.css"

import avatar from "../../assets/avatar.png"
import {AuthContext} from "../../contexts/auth"

export default function Profile() {

    const {user} = useContext(AuthContext);
    const [avatarURL, setAvatarURL] = useState(user && user.avatarURL);


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
                        />

                        <label>E-mail</label>
                        <input
                            type="email"
                        />

                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn">Sair</button>
                </div>
            </div>
        </div>
    )   
}