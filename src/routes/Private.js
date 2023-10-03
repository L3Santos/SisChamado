import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { toast } from "react-toastify";


export default function Private({children}) {
    const {signed, loading} = useContext(AuthContext);
    console.log(signed);

    if(loading) {
        return (
            <div>

            </div>
        )
    }

    if(!signed) {
        // toast.warning("Usuario não encontra-se logado!!")
        return <Navigate to="/"/>
    }

    return children;
}
