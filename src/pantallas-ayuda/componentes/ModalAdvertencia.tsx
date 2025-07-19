import "../styles/modales.css"

interface Props{
    mensaje: string;
    eventoAceptar: () => void;
    eventoCerrar: () => void;
}

const ModalAdvertencia: React.FC<Props> = ({mensaje, eventoAceptar, eventoCerrar}) =>{

    return(
        <div className="modal">
            <div className="modal-central">
                <h1>Advertencia</h1>
                <br/>
                <p>{mensaje}</p>
                <div className="botones-modal">
                    <button type="button" onClick={eventoAceptar}>Aceptar</button>
                    <button type="button" onClick={eventoCerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalAdvertencia;