import "../styles/modales.css"

interface Props{
    mensaje: string;
    eventoCerrar: () => void;
}

const ModalExitoso: React.FC<Props> = ({mensaje, eventoCerrar}) =>{

    return(
        <div className="modal">
            <div className="modal-central">
                <h1>Cambios guardados con éxito</h1>
                <br/>
                <p>{mensaje}</p>
                <div className="botones-modal">
                    <button type="button" onClick={eventoCerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalExitoso;