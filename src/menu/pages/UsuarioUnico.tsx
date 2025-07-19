import { useEffect, useState } from "react";
import type { Usuario } from "../../models/Usuario";
import "../styles/usuario-unico.css";
import { useParams } from "react-router-dom";
import ServiceLocator from "../../utils/ServiceLocator";
import { useContextProgram } from "../../utils/ContextProgram";

const UsuarioUnico = () => {
    const [formData, setFormData] = useState<Usuario>({
        username: "",
        nombres: "",
        apellidos: "",
        email: "",
        genero: "",
        idPerfil: 0,
        estado: 1, // 1 activo, 0 inactivo, puedes adaptarlo según la lógica,
        contrasenia: ""
    });

    const serviceLocator = new ServiceLocator();
    const{dataUsuario} = useContextProgram();

    const { username } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
        ...prevData,
        [name]: name === "idPerfil" || name === "estado" ? parseInt(value) : value,
        }));
    };

     const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const jsonData = JSON.stringify(formData);
            const response = await serviceLocator.guardarOActualizarUsuario(jsonData);

            if(!response.ok){
                throw new Error(await response.text());
            }

        }catch(error: any){
            alert(`Error: ` + error.message);
        }
    };

    const obtenerUsuario = async() => {
        let usernameBuscar = "";
        if(username === undefined) {
            if(dataUsuario?.idPerfil === 2){
                usernameBuscar = dataUsuario.username;
            }else{
                return;
            }
        }else{
            usernameBuscar = username!.toString();
        }
        try{
            const response = await serviceLocator.obtenerUsuarioUsername(usernameBuscar);
            
            if(!response.ok){
                throw new Error(await response.text());
            }

            const usuarioObtenido: Usuario = await response.json();
            setFormData(usuarioObtenido);
        }catch(error: any){
            alert(`Error: ` + error.message);
        }
    }

    useEffect(() => {
        obtenerUsuario();
    }, []);
    

    return(
        <>
            <form className="form-container" method="get">
                <h2 className="form-title">Formulario de Usuario {username}</h2>

                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                {
                    username === undefined &&
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" name="contrasenia" value={formData.contrasenia} onChange={handleChange} required />
                        </div>
                }

                <div className="form-group">
                    <label>Nombres:</label>
                    <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Apellidos:</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Género:</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Perfil:</label>
                    <select name="idPerfil" value={formData.idPerfil} onChange={handleChange} required>
                    <option value={0}>Seleccionar</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Estado:</label>
                    <select name="estado" value={formData.estado} onChange={handleChange} required>
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                    </select>
                </div>

                <button type="submit" className="submit-button" onClick={(e) => handleSubmit(e)}>Guardar Usuario</button>
            </form>
        </>
    )
}

export default UsuarioUnico;