import { createContext, useContext, useState, type ReactNode } from "react";
import type { Usuario } from "../models/Usuario";

interface ContextProgramProp{
    dataUsuario: Usuario | null,
    setDataUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const ContextProgram = createContext<ContextProgramProp | undefined>(undefined);

export const ContextProgramProvider = ({ children }: { children: ReactNode }) => {
    const [dataUsuario, setDataUsuario] = useState<Usuario | null>(null);

    return(
        <ContextProgram.Provider
            value={{dataUsuario, setDataUsuario}}
        >
            {children}
        </ContextProgram.Provider>
    );
}

export const useContextProgram = () => {
    const context = useContext(ContextProgram);
    if(!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
