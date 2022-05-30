import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";

import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import { RecipePage } from "./pages/RecipePage";
import { CreateRecipe } from "./pages/CreateRecipe";

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

          <Route
            path="/create-recipe"
            element={
              <PrivateRoute>
                <CreateRecipe />
              </PrivateRoute>
            }
          />

          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </UserProvider>
    </>
  );
}
