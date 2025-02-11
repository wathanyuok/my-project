import { Outlet } from "react-router";
import MainNav from "../components/MainNav";

// rfce
function Layout() {
  return (
    <div>
      <MainNav />

      <Outlet />
    </div>
  );
}
export default Layout;