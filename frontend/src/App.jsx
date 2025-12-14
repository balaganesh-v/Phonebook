import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <div className="min-h-screen flex flex-col  bg-gray-100">
        <Navbar />
        <div className="pt-10  flex flex-col items-center justify-center  ">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-10">
            Phone Book App
          </h1>
          <Home />
        </div>
      </div>

    </ContactProvider>
  );
}

export default App;
