import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"


import { AuthContext} from "../../contexts/auth"
import { toast } from "react-toastify";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");


    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        if(nome !== "" && email !== "" && password !== "") {
            await signUp(nome, email, password);
        } else {
            toast.warning("[ERRO], variável/campo null")
        }

        setNome("")
        setEmail("")
        setPassword("")
    }


    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema"/>
                </div>

                <form onSubmit={handleSubmit}>
                <h1>Criar Conta</h1>
                    <input 
                        type="text"
                        placeholder="Digite Seu Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

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
                    <button type="submit" value="Acessar">
                        {loadingAuth ? "Carregando..." : "Cadastrar"}
                    </button> 
                </form>
                <Link to="/">Já possui uma conta?</Link>
            </div>
        </div>
    )
}