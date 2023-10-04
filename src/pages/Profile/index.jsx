import React from "react";
import Header from '../../components/Header/index';
import Title from "../../components/Title";
import { FiSettings } from "react-icons/fi";

export default function Profile() {
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Minha Conta ">
                    <FiSettings size={25}/>
                </Title>
            </div>
        </div>
    )
}