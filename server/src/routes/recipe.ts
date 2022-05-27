import express from "express";
import { RecipeController } from "../controllers/RecipeController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routes = express.Router();

routes.get("/", RecipeController.getAll);

routes.post("/", AuthMiddleware, RecipeController.create);

routes.delete("/", RecipeController.deleteAll);

routes.delete("/:id", RecipeController.deleteById);

export { routes };
