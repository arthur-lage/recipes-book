import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";

import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Route element={<Dashboard />} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
