import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminCard from "./components/AdminCard";
import UserCard from "./components/UserCard";

// ProtectedRoute component
const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    // not logged in
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    // role mismatch
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="ROLE_USER">
              <UserCard />
            </ProtectedRoute>
          }
        />

      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
