import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.js"
import Header from "../../components/Header/index.jsx";
import "./dashboard.css"
import Title from '../../components/Title/index';
import { FiEdit, FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection.js";
import { format } from "date-fns";

const listRef = collection(db, "chamados");

export default function Dashboard() {

    const { logout } = useContext(AuthContext)

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setListDocs] = useState();
    const [loadingMore, serLoadingMore] = useState(false);


    async function handlerLogout() {
        await logout();
    }

    useEffect(() => {
        async function loadChamados() {
            const q = query(listRef, orderBy('created', 'desc'), limit(10))

            const querySnapshot = await getDocs(q);
            await updateState(querySnapshot);

            setLoading(false);
        }

        loadChamados();

        return () => {

        }
    }, []);

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento,
                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length -1 ] // pegando o ultimo item
            console.log(lastDoc)
            setChamados(chamados => [...chamados, ...lista])
        } else {
            setIsEmpty(true);
        }
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Chamados">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando Chamados....</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>
                <>
                    <div className="container dashboard">
                        <h1>Teste</h1>
                    </div>

                    {chamados.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new" className="novo">
                                <FiPlus color="#FFFF" size={25} />
                                Novo Chamado
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/new" className="novo">
                                <FiPlus color="#FFFF" size={25} />
                                Novo Chamado
                            </Link>
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
                                    {chamados.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.cliente}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status"><span className="badge">{item.status}</span></td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{ backgroundColor: "#3585F6" }}>
                                                        <FiSearch color="#FFFF" size={17} />
                                                    </button>
                                                    <button className="action" style={{ backgroundColor: "#F6A935" }}>
                                                        <FiEdit2 color="#FFFF" size={17} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            </div>
        </div>
    )
}