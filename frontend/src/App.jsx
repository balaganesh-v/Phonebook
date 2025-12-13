import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className=" bg-gray-100 flex flex-col items-center justify-center py-4 ">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">
            Phone Book App
          </h1>
          <Home />
        </div>
      </div>

    </ContactProvider>
  );
}

export default App;
