
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #3f3f46",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

    </BrowserRouter>
  </AuthProvider>
);
