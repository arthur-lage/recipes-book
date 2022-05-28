import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
  const auth = false;
  return auth ? children : <Navigate to="/login" />;
}
