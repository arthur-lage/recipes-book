import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <Link to="/">Recipes</Link>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
