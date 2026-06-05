import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;