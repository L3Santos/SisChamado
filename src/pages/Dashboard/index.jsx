import React, { useContext } from "react";
import {AuthContext } from "../../contexts/auth.js"
import Header from "../../components/Header/index.jsx";

export default function Dashboard() {

    const {logout} = useContext(AuthContext)


    async function handlerLogout() {
        await logout();
    }

    return(
        <div>
            <Header/>
            <h1>Dashboard</h1>
            <button onClick={handlerLogout}>Sair da conta</button>
        </div>
    )
}