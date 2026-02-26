import type { RouteObject } from "react-router-dom";
import Login from "./components/login"

const routes: RouteObject[] = [
    { path: "/", element: <Login /> },
];
export default routes;