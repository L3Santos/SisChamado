import React, { useState } from "react"
import Header from '../../components/Header/index';
import Title from '../../components/Title/index';
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";


// importaçao do banco
import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";



export default function Customers() {
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState("")
    const [enderecoEmpresa, setEnderecoEmpresa] = useState("")


    async function handleRegister(e) {
        e.preventDefault();

        if(nome !== "" && cnpj !== "" && endereco !== "" && enderecoEmpresa !== "") {
            await addDoc(collection(db, "customers"),  {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco,
                enderecoEmpresa: enderecoEmpresa
            })
            .then (() => {
                setNome("")
                setCnpj("")
                setEndereco("")
                setEnderecoEmpresa("")
                toast.success("Empresa cadastrada com sucesso!")
            }).catch((error) => {
                console.log(error)
                toast.error("Erro ao realizar cadastro de cliente")
            })
        } else {
            toast.warning("[ERRO], variável/campo null")        
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Dados Cadastrais Clientes">
                    <FiUser size={25} />
                </Title>

                <h1>Pessoa Juridica</h1>
                <div className="container">

                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome Fantasia</label>
                        <input
                            type="text"
                            placeholder="Nome da Empresa"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label>CNPJ</label>
                        <input
                            type="text"
                            placeholder="Digite o CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />

                        <label>Endereco Principal</label>
                        <input
                            type="text"
                            placeholder="Digiite o Endereço Principal"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />

                        <label>Endereço da Empresa</label>
                        <input
                            type="text"
                            placeholder="Endereço da Empresa"
                            value={enderecoEmpresa}
                            onChange={(e) => setEnderecoEmpresa(e.target.value)}
                        />

                        <button className="submit-add" type="submit">
                            Salvar
                        </button>
                    </form>

                </div>

                <h1>Pessoa Fisica</h1>
                <div className="container">

                    <form className="form-profile">
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Digite o nome do Cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label>CPF</label>
                        <input
                            type="text"
                            placeholder="Digite o CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />

                        <label>Endereço Principal</label>
                        <input
                            type="text"
                            placeholder="Digite o Endereço Principal"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />

                        <button className="submit-add" type="submit">
                            Salvar
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}