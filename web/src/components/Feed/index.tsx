import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface IRecipe {
  id: string;
  name: string;
  description: string;
  image: string | null;
  userId: string;
  ingredients: string[];
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
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <h1>{recipe.name}</h1>
              <p>{recipe.description}</p>
              {recipe.image !== null && (
                <img src={recipe.image} alt={recipe.name} />
              )}
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
