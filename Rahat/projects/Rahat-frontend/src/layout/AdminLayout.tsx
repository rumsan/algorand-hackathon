import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';
export default function AdminLayout() {
  return (
    <>
    {/* // <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row"> */}
        <NavBar />
     

      {/* // <main className="flex-shrink-0 d-flex flex-column min-vh-100 "> */}
        {/* // <div className="container mt-2 mb-5 w-dvw"> */}
          <Outlet />
        {/* // </div> */}
        {/* <Footer /> */}
      {/* // </main> */}

    {/* // </div> */}
    </>
  );
}
