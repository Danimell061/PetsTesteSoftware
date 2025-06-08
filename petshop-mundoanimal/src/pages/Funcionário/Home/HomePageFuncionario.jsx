import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Cookies from 'js-cookie';
import './HomePageFuncionario.css';
import { getUserLogged } from '../../../services/userServices';

export default function HomePageFuncionario() {
  const navigate = useNavigate()

  useEffect(()=>{
    const verificarPermissao = async () =>{
    try{
      const token = Cookies.get('token')
      if(!token){
        console.log("Sem login")
        navigate('/')
        return
      }
      const response = await getUserLogged()
      if(response.status !== 200){
        navigate('/')
        return
      }
      const userRole = response.data.role
      if (userRole !== 'admin' && userRole !== 'funcionario') {
        console.log('Você não tem permissão para acessar esta área');
        navigate('/cliente');
      }

    }catch(error){
      console.log('Erro ao verificar permissões: ', error)
      navigate('/')
    }}
    verificarPermissao()
  },[ navigate ])
  return (
    <div className="funcionario-container">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}