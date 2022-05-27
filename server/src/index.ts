import express from "express";
import { routes as userRoutes } from "./routes/user";
import { routes as recipeRoutes } from "./routes/recipe";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/recipes", recipeRoutes,);
app.use("/api/users", userRoutes,);

app.listen(PORT, () => console.log("Running app on port " + PORT));
