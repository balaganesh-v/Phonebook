import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { MessagesProvider } from "./context/MessageContext.jsx";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Dial from "./pages/Dial.jsx";
import Contacts from "./pages/Contacts.jsx";
import Messages from "./pages/Messages.jsx";
import Favourites from "./pages/Favourites.jsx";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <SocketProvider>
                        <ContactProvider>
                            <MessagesProvider>
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/login" element={<LoginForm />} />
                                    <Route path="/register" element={<RegisterForm />} />

                                    {/* Protected Routes */}
                                    <Route
                                        path="/"
                                        element={
                                            <PrivateRoute>
                                                <Home />
                                            </PrivateRoute>
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <h1 className="text-center text-3xl font-bold mt-20">
                                                    Welcome to Dashboard!
                                                </h1>
                                            }
                                        />
                                        <Route path="dial" element={<Dial />} />
                                        <Route path="contacts" element={<Contacts />} />
                                        <Route path="messages" element={<Messages />} />
                                        <Route path="favourites" element={<Favourites />} />
                                    </Route>

                                    {/* Fallback */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </MessagesProvider>
                        </ContactProvider>
                    </SocketProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;