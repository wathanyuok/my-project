import { Routes, Route, Outlet } from "react-router"
import Layout from "../layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login"
import HomeUser from "../pages/user/HomeUser"
import Dashboard from "../pages/admin/Dashboard"
import Manage from "../pages/admin/Manage"
import Register1 from "../pages/auth/Register1"
function AppRoutes() {
    return (
        <>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="register" element={<Register1 />} />
                    <Route path="login" element={<Login />} />
                </Route>

                {/* Private User */}
                <Route path="user" element={<Layout />}>
                    <Route index element={<HomeUser />} />
                </Route>

                {/* Private Admin */}
                <Route path="admin" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage" element={<Manage />} />
                </Route>


                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    )
}

export default AppRoutes