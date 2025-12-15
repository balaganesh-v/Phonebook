import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Fixed Navbar */}
            <Navbar />

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

            {/* Fixed Footer */}
            <Footer />
        </div>
    );
};

export default AppLayout;
