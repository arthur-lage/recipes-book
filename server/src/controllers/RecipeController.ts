import { Request, Response } from "express";
import { prisma } from "../prisma";

interface IRecipe {
  name: string;
  description: string;
  cookingTime: number;
  ingredients: string[];
  directions: string[];
  image: string;
  authorId: string;
  authorName: string;
  likes: string[];
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
        authorId: req.user!.id,
        // @ts-ignore
        authorName: req.user!.name,
        likes: [],
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
  async like(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const recipe = await prisma.recipe.findFirst({
        where: {
          id,
        },
      });

      if (recipe) {
        const { likes } = recipe;

        // @ts-ignore
        const userId = req.user!.id;

        if (likes.includes(userId)) {
          const newLikes = likes.filter((like) => like !== userId);

          await prisma.recipe.update({
            where: {
              id,
            },
            data: {
              likes: newLikes,
            },
          });

          return res
            .status(200)
            .json({ hasLiked: false, message: "Recipe unliked successfully" });
        }

        // @ts-ignore
        likes.push(req.user!.id);

        await prisma.recipe.update({
          where: {
            id,
          },
          data: {
            likes,
          },
        });

        res
          .status(200)
          .json({ hasLiked: true, message: "Recipe liked successfully" });
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
};

export { RecipeController };
