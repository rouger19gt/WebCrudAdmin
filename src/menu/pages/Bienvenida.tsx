import { useContextProgram } from "../../utils/ContextProgram";
import BarraMenu from "../components/BarraMenu";

const Menu = () => {
    const{dataUsuario} = useContextProgram();

    return(
        <>
            <div className="contenedor-menu">
                <h1>Bienvenido: {dataUsuario?.username}</h1>
            </div>
        </>
    );
}

export default Menu;