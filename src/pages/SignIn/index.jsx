import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"
import "./signIn.css";

import { AuthContext} from "../../contexts/auth"

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn  } = useContext(AuthContext);

    function handleSignIn(e) {
        e.preventDefault();

        if(email !== "" && password !== "") {
            signIn();
            console.log(email, password)
        } else {
            alert("null")
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema"/>
                </div>

                <form onSubmit={handleSignIn}>
                <h1>Entrar</h1>
                    <input 
                        type="text"
                        placeholder="Digite Seu E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" value="Acessar">Acessar</button> 
                </form>
                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}