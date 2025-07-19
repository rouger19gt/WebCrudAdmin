import AppRouter from "./router/AppRouter";
import { ContextProgramProvider } from "./utils/ContextProgram";

const CrudAdminWeb = () => {
    return(
        <ContextProgramProvider>
            <AppRouter />
        </ContextProgramProvider>
    );
}


export default CrudAdminWeb;