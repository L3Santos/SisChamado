import React, { useState } from "react"
import Header from '../../components/Header/index';
import Title from '../../components/Title/index';
import { FiPlusCircle } from "react-icons/fi";

import "./new.css"

      
export default function New() {

    const [customers, setCustomers] = useState([])

    const [complemento, setComplemento] = useState("");
    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");


    function handlerOptionChange(e) {
        setStatus(e.target.value);
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Clientes</label>
                        <select>
                            <option key={1} value={1}>num sei</option>
                        </select>
                        
                        <label>Assunto</label>
                        <select>
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

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}