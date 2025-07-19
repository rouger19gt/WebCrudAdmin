import { useEffect, useState } from "react";
import type { Usuario } from "../../models/Usuario";
import "../styles/usuarios.css";
import ServiceLocator from "../../utils/ServiceLocator";
import ModalAdvertencia from "../../pantallas-ayuda/componentes/ModalAdvertencia";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
    const [listadoUsuarios, setListadoUsuarios] = useState<Usuario[]>([]);
    const [busqueda, setBusqueda] = useState<string>("");
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [usuarioEliminar, setUsuarioEliminar] = useState<string>("");
    const navigate = useNavigate();

    const serviceLocator = new ServiceLocator();

    const listarUsuarios = async() => {
        try{
            const response = await serviceLocator.listarUsuarios(busqueda);
            if(!response.ok){
                throw new Error("No se pudo listar a los usuarios");
            }

            const lista: Usuario[] = await response.json();
            setListadoUsuarios(lista);
        }catch(error: any){
            alert(`Error: ${error.message}`)
        }
    }

    const onAbrirModal = (username: string) => {
        setUsuarioEliminar(username);
        setMostrarModal(true);
    }

    const onEliminarUsuario = async() => {
        try{
            const response = await serviceLocator.eliminarUsuario(usuarioEliminar);
            if(!response.ok){
                throw new Error(await response.text());
            }

            onCerrarModal();
            await listarUsuarios();
        }catch(error:any){
            alert("Error: " + error.message)
        }
    }

    const onCerrarModal = () => {
        setMostrarModal(false);
        setUsuarioEliminar("");
    }


    const onVerUsuario = (username: string) => {
        navigate(`/usuario/${username}`);
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    return(
        <>
            {
                mostrarModal && 
                    <ModalAdvertencia 
                        mensaje={`¿está seguro de eliminar al usuario: ${usuarioEliminar}?`}
                        eventoAceptar={onEliminarUsuario}
                        eventoCerrar={onCerrarModal}
                    />
            }
            <div className="contenedor-usuario">
                <h1>Usuarios</h1>
                <button type="button" onClick={() => onVerUsuario("nuevo")}>Nuevo</button>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Usuario</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Funcionalidades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listadoUsuarios.map((item, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.nombres}</td>
                                    <td>{item.apellidos}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="eliminar" type="button" onClick={() => onAbrirModal(item.username)}>Eliminar</button>
                                        <button className="ver" type="button" onClick={() => onVerUsuario(item.username)}>Ver</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Usuarios;