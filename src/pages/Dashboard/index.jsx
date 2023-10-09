import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth.js"
import Header from "../../components/Header/index.jsx";
import "./dashboard.css"
import Title from '../../components/Title/index';
import { FiEdit, FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function Dashboard() {


    const { logout } = useContext(AuthContext)

    async function handlerLogout() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>
                <>
                    <Link to="/novo" className="novo">
                        <FiPlus color="#FFFF" size={25}/>
                        Novo Chamado
                    </Link>
                    <div className="container dashboard">
                        <h1>Teste</h1>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cliente"></td>
                                <td data-label="Assunto"></td>
                                <td data-label="Status"></td>
                                <td data-label="Cadastrado"></td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor: "#3585F6"}}>
                                        <FiSearch color="#FFFF" size={17}/>
                                    </button>
                                    <button className="action" style={{backgroundColor: "#F6A935"}}>
                                        <FiEdit2 color="#FFFF" size={17}/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
}