import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Weight from "./pages/Weight";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("inicio");

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <>
      {activePage === "inicio" && (
        <Dashboard
          onNavigate={setActivePage}
        />
      )}

      {activePage === "peso" && (
        <Weight
          onNavigate={setActivePage}
        />
      )}
    </>
  );
}

export default App;