import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
