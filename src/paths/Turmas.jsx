import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { useAuth } from "../components/auth/AuthContext";


export default (() =>{
    const [isLoading, setIsLoading] = useState(false);
    const {logout} = useAuth();

    const timeoutPromise = () => new Promise(resolve => setTimeout(resolve, 2000));
    useEffect(() => {
        const tokenJWT = localStorage.getItem("tokenJWT");
    
        const fetchTurmas = async () => {
            setIsLoading(true);
            timeoutPromise()
          try {
            const response = await axios.get("http://localhost:8080/turmas/consultar", {
              headers: {
                Authorization: `Bearer ${tokenJWT}`,
              },
            });
    
            console.log("Dados das turmas:", response.data);
          } catch (error) {
            console.error("Erro ao consultar turmas:", error.response.status);
            if(error.response.status == 403){
              logout();
              navigate("/login");
            }
          }finally {
            setIsLoading(false); 
          }
        };
    
        if (tokenJWT) {
          fetchTurmas();
        } else {
          console.warn("Token JWT não encontrado no localStorage.");
        }
      }, []);
    return (
        <div className='flex flex-col items-center justify-center mt-5'>
            <div className='flex flex-col items-start w-full sm:w-1/2'>
            <div className='pl-7 pr-7 pb-3 flex flex-row w-full justify-between items-center'>
            <h2 className='text-3xl font-medium text-white'>Minhas Turmas</h2>
            <h2>outro botao1</h2>
            </div>
            <div className='p-7 bg-zinc-800 w-full min-w-96 min-h-screen flex shadow-xl shadow-black rounded-3xl'>
            oi
            </div>
            </div>
        </div>
    )
})