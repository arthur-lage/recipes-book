import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";

import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";

export function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          {/*@ts-ignore*/}
          <Route path="/register" element={<Register />} />
          {/*@ts-ignore*/}
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}
