import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        // BrowserRouter handles routing in the app
        <BrowserRouter>
            {/* Routes define the different pages in the app */}
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
