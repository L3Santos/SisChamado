import React, { useContext } from "react";
import avatarImg from "../../assets/avatar.png"
import { Link } from "react-router-dom";
import "./header.css"

import { AuthContext } from "../../contexts/auth";

// icons
import { FiHome, FiUser, FiSettings } from "react-icons/fi"

export default function Header() {

    const { user } = useContext(AuthContext)
    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarURL === null ? 
                            avatarImg : user.avatarURL} alt="Foto do usuario" />
            </div>

            <Link to="/dashboard">
                <FiHome color="#FFFF" size={24}/>
                Chamados
            </Link>
            <Link to="/customers">
                <FiUser color="#FFFF" size={24}/>
                Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#FFFF" size={24}/>
                Perfil
            </Link>
        </div>
    )
}