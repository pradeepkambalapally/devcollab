import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes, { PublicRoute } from "./routes/ProtectedRoutes";
import {Routes, Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
function App(){

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={
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
<Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App; 