import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ContactProvider } from "./context/ContactContext";

import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Dial from "./pages/Dial";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Messages";
import Favourites from "./pages/Favourites";

function App() {
    return (
        <ThemeProvider>
            <ContactProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/dial" element={<Dial />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/favourites" element={<Favourites />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ContactProvider>
        </ThemeProvider>
    );
}

export default App;
