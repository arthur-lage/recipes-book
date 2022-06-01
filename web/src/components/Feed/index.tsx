import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import { BiTimeFive } from "react-icons/bi";

interface IRecipe {
  id: string;
  name: string;
  description: string;
  image: string | null;
  userId: string;
  ingredients: string[];
  cookingTime: number;
}

export function Feed() {
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);

  useEffect(() => {
    api
      .get("/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {recipes && (
        <div className="mt-10 px-5 grid grid-cols-3 grid-rows-3 gap-[1.5rem]">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              className="w-full flex items-center gap-5 shadow-md hover:shadow-recipe transition-all duration-200 ease-linear p-5 rounded-md"
              to={`/recipe/${recipe.id}`}
            >
              <div>
                <h1 className="mb-2 font-medium text-xl text-zinc-700 font-nunito">
                  {recipe.name}
                </h1>
                <p className="mb-2 font-medium text-zinc-700 font-nunito">
                  {recipe.description}
                </p>
                <span className="flex items-center gap-[6px] text-base text-zinc-500 font-nunito font-bold">
                  <BiTimeFive color="#777" size={26} />
                  {recipe.cookingTime} min
                </span>
              </div>

              {recipe.image !== null && (
                <img src={recipe.image} alt={recipe.name} />
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
