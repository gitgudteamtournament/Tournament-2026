import type { RouteObject } from "react-router-dom";
import LoginPage from "./components/login"
import RegistrationPage from "./components/signup"
import Dashboard from "./components/Dashboard"
import Landing from "./components/Landing"

const routes: RouteObject[] = [
    { path: "/landing", element: <Landing /> },
    { path: "/", element: <LoginPage /> },
    { path: "/signup", element: <RegistrationPage /> },
    { path: "/dashboard", element: <Dashboard /> },
];
export default routes;
