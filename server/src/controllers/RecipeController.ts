import { Request, Response } from "express";
import { prisma } from "../prisma";

interface IRecipe {
  name: string;
  description: string;
  cookingTime: number;
  ingredients: string[];
  directions: string[];
  image: string;
  userId: string;
}

const RecipeController = {
  async getAll(req: Request, res: Response) {
    try {
      const recipes = await prisma.recipe.findMany();

      res.status(200).json(recipes);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const recipe = await prisma.recipe.findFirst({
        where: {
          id,
        },
      });

      res.status(200).json(recipe);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { name, description, cookingTime, ingredients, image, directions } =
        req.body;

      const newRecipe: IRecipe = {
        name,
        description,
        cookingTime,
        ingredients,
        image,
        directions,
        // @ts-ignore
        userId: req.user!.id,
      };

      await prisma.recipe.create({
        data: newRecipe,
      });

      res.status(200).json({ message: "Recipe created successfully" });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      await prisma.recipe.deleteMany();

      res.status(200).json({ message: "Recipes delete successfully" });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.recipe.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

export { RecipeController };
