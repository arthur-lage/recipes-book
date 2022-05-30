import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { BiLogOut } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";

export function Header() {
  const { handleLogout } = useAuth();

  const navigate = useNavigate();

  function handleCreateRecipe() {
    navigate("/create-recipe");
  }

  return (
    <div className="px-10 py-5 flex items-center justify-between bg-primary">
      <div>
        <Link
          className="font-nunito uppercase tracking-wider font-bold text-white text-3xl"
          to="/"
        >
          Recipes
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <button
          className="font-bold tracking-widest font-nunito rounded-md p-2 text-white uppercase flex items-center justify-center gap-2 hover:bg-purple-600 transition-all duration-100 ease-linear"
          onClick={handleCreateRecipe}
        >
          <TiDocumentText size={28} color="#fff" />
          New Recipe
        </button>
        <button
          className="font-bold tracking-widest font-nunito rounded-md p-2 text-white uppercase flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-100 ease-linear"
          onClick={handleLogout}
        >
          <BiLogOut size={28} color="#fff" />
          Logout
        </button>
      </div>
    </div>
  );
}
