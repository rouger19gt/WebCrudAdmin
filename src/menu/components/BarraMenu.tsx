import { NavLink } from "react-router-dom";
import "../styles/barra-menu.css";
import { useContextProgram } from "../../utils/ContextProgram";
import Utiles from "../../utils/Utiles";

const BarraMenu = () => {
    const {dataUsuario}= useContextProgram();

    return(
        <div className="contenedor-barra-menu">
            {
                dataUsuario?.idPerfil === 1 &&
                <NavLink to={"/usuarios"} className={"enlace"}>
                    Crud
                </NavLink>
            }
            {
                dataUsuario?.idPerfil === 2 &&
                <NavLink to={"/usuario"} className={"enlace"}>
                    Ver información
                </NavLink>
            }
            <NavLink to={"/login"} className={"enlace"} onClick={() => {
                Utiles.deleteCookie('token');
                Utiles.deleteCookie('usuario');
            }}>
                Cerrar sesion
            </NavLink>
        </div>
    );
}

export default BarraMenu;