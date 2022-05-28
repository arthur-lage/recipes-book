import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute({ children }: any) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
}
