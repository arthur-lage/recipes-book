import express from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routes = express.Router();

routes.get("/", UserController.getAll);
routes.get("/auth", AuthMiddleware, UserController.authenticate);

routes.post("/", UserController.create);
routes.post("/login", UserController.login);

routes.delete("/", UserController.deleteAll);

routes.delete("/:id", UserController.deleteById);

export { routes };
