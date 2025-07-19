import { useEffect, useState, type ChangeEvent } from "react";
import "../styles/login.css";
import ServiceLocator from "../../utils/ServiceLocator";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../../models/Usuario";
import type { Sesion } from "../../models/Sesion";
import { useContextProgram } from "../../utils/ContextProgram";
import Utiles from "../../utils/Utiles";

interface loginUsuario {
    usuario: string,
    contrasenia: string
}

const loginInicial: loginUsuario = {
    usuario: '',
    contrasenia: '',
};

const Login = () => {
    const [formLogin, setFormLogin] = useState<loginUsuario>(loginInicial);
    const [showUserError, setShowUserError] = useState<boolean>(false);
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const [showCredencialesError, setShowCredencialesError] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>('');
    
    const serviceLocator = new ServiceLocator();
    const navigate = useNavigate();
    const {setDataUsuario} = useContextProgram();

    const onLogin = async(event: any) => {
        event.preventDefault();
        try{
            if(formLogin.usuario.length === 0){
                setShowUserError(true);
                throw new Error('El usuario es requerdio');
            }
            else{
                setShowUserError(false);
            }

            if(formLogin.contrasenia.length === 0){
                setShowPasswordError(true);
                throw new Error('La contraseña es requerida');
            }else{
                setShowPasswordError(false);
            }

            const data = {
                username: formLogin.usuario,
                contrasenia: formLogin.contrasenia
            }

            const jsonData = JSON.stringify(data);
            const response = await serviceLocator.login(jsonData);
        
            if(!response.ok){
                setShowCredencialesError(true);
                throw new Error(await response.text());
            }

            const usuario = await response.json();

            const expires = new Date(Date.now() + 30 * 86400000).toUTCString();
            document.cookie = `usuario=${encodeURIComponent(usuario.username)}; expires=${expires}; path=/`;
            document.cookie = `token=${encodeURIComponent(usuario.token)}; expires=${expires}; path=/`;
            setDataUsuario({
                username: usuario.username,
                apellidos: usuario.apellidos,
                contrasenia: "",
                email: usuario.email,
                estado: usuario.estado,
                genero: usuario.genero,
                idPerfil: usuario.idPerfil,
                nombres: usuario.nombres
            });
            
            navigate("/bienvenida");
        }catch(error: any){
            setMessageError(error.message);
        }
    }

    const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormLogin(() => ({
            ...formLogin,
            [name]: value
        }));
    }

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
                return;
            }

            const usuario: Usuario = await response.json();
            setDataUsuario(usuario);
            navigate("/bienvenida");
        }catch(error: any){
            alert(error.message);
        }
    }

    useEffect(() => {
        validarSesion();
    }, []);

    return(
        <div className="contenedor-login">
            <div className="contenedor-centro-login">
                <h1>Inicio de sesión</h1>
                <form method="post">
                    <label htmlFor="usuario">Usuario:</label>
                    <input 
                        type="text" 
                        id="usuario" 
                        name="usuario"
                        value={formLogin.usuario}
                        onChange={onChangeLogin}
                    />
                    {showUserError && <p>{messageError}</p>}
                    <br/>
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <input 
                        type="password" 
                        id="contrasenia" 
                        name="contrasenia"
                        value={formLogin.contrasenia}
                        onChange={onChangeLogin}
                    />
                    {showPasswordError && <p>{messageError}</p>}
                    <br/>
                    <button type="submit" onClick={onLogin}>Ingresar</button>
                    {showCredencialesError && <p>{messageError}</p>}
                </form>
            </div>
        </div>
    );
}


export default Login;