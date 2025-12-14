import { ThemeProvider } from "./context/ThemeContext";
import { ContactProvider } from "./context/ContactContext";
import AppContent from "./AppContent";

function App() {
  return (
    <ThemeProvider>
      <ContactProvider>
        <AppContent />
      </ContactProvider>
    </ThemeProvider>
  );
}

export default App;
