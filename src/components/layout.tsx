import { Outlet } from 'react-router-dom';
// FIX 1: Panggil nama file dengan huruf kecil sesuai dengan nama file asli King
import Navbar from './navbar'; 
import Footer from './footer'; 

const Layout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />
      
      {/* FIX 2: flex-grow diganti jadi grow sesuai saran Tailwind */}
      <main className="grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;