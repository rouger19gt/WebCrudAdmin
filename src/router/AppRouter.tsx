import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/pages/Login";
import MenuRoutes from "../menu/routers/MenuRoutes";

const AppRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<Navigate to={"/login"} />}/>
            <Route path="login" element={<Login />}/>
            <Route path="/*" element={<MenuRoutes />}/>
        </Routes>
    );
}

export default AppRouter;