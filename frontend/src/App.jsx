import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { MessagesProvider } from "./context/MessagesContext.jsx";
import { FavouriteProvider } from "./context/FavouriteContext.jsx";

//Landing Page Components with Public Access
import Landing from "./pages/landing/Landing.jsx";
import LoginForm from "./components/landing/auth/LoginForm.jsx";
import RegisterForm from "./components/landing/auth/RegisterForm.jsx";

//Dashboard Components with Protected Access
import PrivateRoute from "./routes/PrivateRoute.jsx";
//Home page Must contain <Outlet />
import Home from "./pages/dashboard/Home.jsx";

import Main from "./pages/dashboard/sections/Main.jsx";
import Dial from "./pages/dashboard/sections/Dial.jsx";
import Contacts from "./pages/dashboard/sections/Contacts.jsx";
import Messages from "./pages/dashboard/sections/Messages.jsx";
import Favourites from "./pages/dashboard/sections/Favourites.jsx";
import Profile from "./pages/dashboard/sections/Profile.jsx";

import CustomCursor from "./components/ui/CustomCursor.jsx";


function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <SocketProvider>
                        <ContactProvider>
                            <FavouriteProvider>
                                <MessagesProvider>
                                    <CustomCursor theme="gold" />
                                    <Routes>

                                        {/* ── Public Routes for Landing Page ── */}
                                        <Route path="/" element={<Landing />} />
                                        <Route path="/login" element={<LoginForm />} />
                                        <Route path="/register" element={<RegisterForm />} />

                                        {/* ── Protected Routes for accessing specific dashboard sections ── */}
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <PrivateRoute>
                                                    <Home />
                                                </PrivateRoute>
                                            }
                                        >
                                            {/* Default dashboard screen */}
                                            <Route index element={<Main />} />
                                            <Route path="dial" element={<Dial />} />
                                            <Route path="contacts" element={<Contacts />} />
                                            <Route path="messages" element={<Messages />} />
                                            <Route path="favourites" element={<Favourites />} />
                                            <Route path="profile" element={<Profile />} />
                                        </Route>

                                        {/* ── Catch-all fallback ── */}
                                        <Route path="*" element={<Navigate to="/" replace />} />

                                    </Routes>
                                </MessagesProvider>
                            </FavouriteProvider>
                        </ContactProvider>
                    </SocketProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;