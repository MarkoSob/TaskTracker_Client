import Login from "../pages/Login";
import PasswordReset from "../pages/PasswordReset";
import Tasks from "../pages/Tasks";
import UserPage from "../pages/UserPage";

export const authorizedRoutes = [
    {path: '/tasks', element: <Tasks/>, exact: true},
    {path: '/userpage', element: <UserPage/>, exact: true}
]
export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/passwordreset', element: <PasswordReset/>, exact: true},

]