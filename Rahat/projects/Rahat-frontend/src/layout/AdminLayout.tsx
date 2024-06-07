import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <NavBar />
      <main className="pt-10 lg:pt-12">
        {" "}
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
