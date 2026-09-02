import { Outlet } from "react-router-dom";

import Navbar from "../../components/dashboard/layouts/Navbar.jsx";
import Footer from "../../components/dashboard/layouts/Footer.jsx";

const Home = () => {
    return (
        <div className="h-screen flex flex-col bg-slate-900">
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Home;