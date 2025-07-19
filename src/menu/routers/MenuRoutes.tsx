import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BarraMenu from "../components/BarraMenu";
import Bienvenida from "../pages/Bienvenida";
import "../styles/menu.css";
import Usuarios from "../pages/Usuarios";
import UsuarioUnico from "../pages/UsuarioUnico";
import { useEffect } from "react";
import Utiles from "../../utils/Utiles";
import type { Sesion } from "../../models/Sesion";
import ServiceLocator from "../../utils/ServiceLocator";
import { useContextProgram } from "../../utils/ContextProgram";
import type { Usuario } from "../../models/Usuario";

const MenuRoutes = () => {
    const serviceLocator = new  ServiceLocator();
    const{setDataUsuario} = useContextProgram();
    const navigate = useNavigate();

    const validarSesion = async() => {
        try{
            const username = Utiles.getCookie("usuario");
            const token = Utiles.getCookie("token");

            if(username === null || token === null)return;

            const sesion: Sesion = {
                token: token,
                username: username
            }

            const jsonData = JSON.stringify(sesion);

            const response = await serviceLocator.validarRSesion(jsonData);
            if(!response.ok){
                navigate("/login");;
            }
            const usuario: Usuario = await response.json();
            setDataUsuario(usuario);
        }catch(error: any){
            alert(error.message);
        }
    }

    useEffect(() => {
        validarSesion();
    }, []);

    return(
        <div className="contenedor-menu">
            <BarraMenu />
            <Routes>
                <Route path="/" element={<Navigate to={"/bienvenida"} />}/>
                <Route path="bienvenida" element={<Bienvenida />}/>
                <Route path="usuarios" element={<Usuarios />}/>
                <Route path="usuario/:username" element={<UsuarioUnico />}/>
                <Route path="usuario" element={<UsuarioUnico />}/>
            </Routes>
        </div>
    );
}

export default MenuRoutes;