import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import {Routes, Route} from "react-router-dom";
import Profile from "./pages/Profile";
function App(){

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      } />
      <Route
  path="/profile"
  element={
    <ProtectedRoutes>
      <Profile />
    </ProtectedRoutes>
  }
/>
    </Routes>
  )
}

export default App; 