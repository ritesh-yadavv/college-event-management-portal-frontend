import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminAddEditEvent from "./pages/AdminAddEditEvent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/my-registrations"
          element={
            <ProtectedRoute role="student">
              <MyRegistrations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/new"
          element={
            <ProtectedRoute role="admin">
              <AdminAddEditEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminAddEditEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;