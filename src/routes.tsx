import type { RouteObject } from "react-router-dom";
import Login from "./components/login"
import SignUp from "./components/signup"

const routes: RouteObject[] = [
    { path: "/", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
];
export default routes;