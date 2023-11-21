import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import Chat from "./pages/root/Chat";
import AuthLayout from "./pages/auth/AuthLayout";
import { ThemeProvider } from "./components/ui/theme-provider";

import "./global.css";
import RootLayout from "./pages/root/RootLayout";

function App() {
  return (
    <main className="flex flex-col h-screen">
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>

              {/* public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* private routes */}
              <Route element={<RootLayout />}>
                <Route path="/chat" element={<Chat />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
