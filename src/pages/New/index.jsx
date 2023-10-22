import React, { useContext, useEffect, useState } from "react"
import Header from '../../components/Header/index';
import Title from '../../components/Title/index';
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";


import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore";


import "./new.css";

const listRef = collection(db, "customers")

      
export default function New() {

    const { user, logout, storegeUser, setUser } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, serCustomerSelected] = useState(0);

    const [complemento, setComplemento] = useState("");
    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");

    useEffect(() => {
        async function loadCustomer() {
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id:doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(snapshot.docs.size === 0) {
                    toast.error("Nenhuma empresa encontrada");
                    setCustomers([{id: "1", nomeFantasia: "Error"}]);
                    setLoadCustomer(false)
                    return;
                }

                setCustomers(lista);
                setLoadCustomer(false);
            }).catch ((error) => {
                toast.error("Erro ao buscar clientes")
                console.log(error)
                setLoadCustomer(false);
                setCustomers([{id: "1", nomeFantasia: "Error"}])
            })
        }

        loadCustomer(); 
    }, [])


    function handlerOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e) {
        setLoadCustomer(e.target.value);
    }

    async function handleRegister(e) {
        e.preventDefault();

        // registrar o chamado
        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then(() => {
            toast.success("Chamado Registrado");
            setComplemento("");
            serCustomerSelected("");
        })
        .catch((error) => {
            toast.error("Erros ao registrar chamado! Valide todas as informaçõe");
            console.log(error);
        })
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} values={"Carregando..."}/>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )     
                        }               
                 
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option key={1} value={1}>Suporte</option>
                            <option key={2} value={2}>Hardware</option>
                            <option key={3} value={3}>infraestrutura</option>
                            <option key={4} value={4}>Visita Técnica</option>
                            <option key={4} value={4}>Termo Técnico</option>
                            <option key={5} value={5}>Acessos e Liberações</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handlerOptionChange}
                                checked={ status === "Aberto" }
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Processamento"
                                onChange={handlerOptionChange}
                                checked={ status === "Processamento" }
                            />
                            <span>Em Processamento</span>

                            <input
                                type="radio"
                                name="radio"
                                value="ProcessoTerceiros"
                                onChange={handlerOptionChange}
                                checked={ status === "ProcessoTerceiros" }
                            />
                            <span>Em Processo Junto a Terceiros</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Finalizado"
                                onChange={handlerOptionChange}
                                checked={ status === "Finalizado" }
                            />
                            <span>Finalizado</span>
                        </div>

                        <label>Descrição</label>
                        <textarea 
                            type="text"
                            placeholder="Descreva a Ocorrência"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit" >Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}