import type { RouteObject } from "react-router-dom";
import Login from "./components/login"
import SignUp from "./components/signup"
import Dashboard from "./components/Dashboard"

const routes: RouteObject[] = [
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/dashboard", element: <Dashboard /> },
];
export default routes;