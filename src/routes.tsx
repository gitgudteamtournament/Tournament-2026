import type { RouteObject } from "react-router-dom";
import Login from "./components/login"
import SignUp from "./components/signup"
import Dashboard from "./components/Dashboard"
import Landing from "./components/Landing"

const routes: RouteObject[] = [
    { path: "/landing", element: <Landing /> },
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/dashboard", element: <Dashboard /> },
];
export default routes;