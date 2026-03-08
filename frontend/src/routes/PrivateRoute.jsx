import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js"
import { FaSpinner } from "react-icons/fa";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Wait for auth check to finish before making routing decision
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
                <span className="text-lg font-medium text-gray-700">Loading...</span>
            </div>
        );
    }

    // Allow access if authenticated, otherwise redirect to login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
