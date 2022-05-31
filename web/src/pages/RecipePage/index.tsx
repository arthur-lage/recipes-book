import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

import ReactLoading from "react-loading";
import { Header } from "../../components/Header";

import { BiTimeFive } from "react-icons/bi";

interface IRecipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  directions: string[];
  image: string | null;
  cookingTime: number;
}

export function RecipePage() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/recipes/" + id)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  }, []);

  return (
    <div className="fade-in">
      <Header />

      <div>
        {isLoading ? (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <ReactLoading width={32} type="balls" color="#222" />
          </div>
        ) : (
          <>
            {recipe ? (
              <div className="flex flex-col mt-10 pl-16 pb-10">
                <h1 className="mb-4 font-nunito font-bold tracking-wide uppercase text-3xl text-zinc-800">
                  {recipe.name}
                </h1>

                <div className="flex items-center mb-5">
                  <span className="mr-16 text-zinc-500 font-nunito font-bold">
                    Arthur Lage
                  </span>
                  <span className="flex items-center gap-[6px] text-base text-zinc-500 font-nunito font-bold">
                    <BiTimeFive color="#777" size={26} />
                    {recipe.cookingTime} min
                  </span>
                </div>

                <p className="mb-4 font-medium text-zinc-700 font-nunito">
                  {recipe.description}
                </p>

                {recipe.image && (
                  <img
                    className="my-4 w-80"
                    src={recipe.image}
                    alt={recipe.name}
                  />
                )}

                <div className="mb-4">
                  <span className="text-zinc-700 font-nunito font-bold tracking-wide mt-2">
                    Ingredients
                  </span>

                  <ul className="flex flex-col gap-2 mt-4 list-disc pl-5 max-w-[40vw]">
                    {recipe.ingredients.map((ingredient, key) => (
                      <li className="text-zinc-800 font-nunito" key={key}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-zinc-700 font-nunito font-bold tracking-wide mt-2">
                    Directions
                  </span>

                  <ul className="flex flex-col mt-4 list-decimal pl-5 max-w-[50vw] gap-2">
                    {recipe.directions.map((direction, key) => (
                      <li className="text-zinc-800 font-nunito" key={key}>
                        {direction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="font-nunito">Recipe not found</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
