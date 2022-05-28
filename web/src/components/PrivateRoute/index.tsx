import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, auth }: any) {
  return auth ? children : <Navigate to="/login" />;
}
