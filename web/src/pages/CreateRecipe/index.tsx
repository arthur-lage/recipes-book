import React, { useState } from "react";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

export function CreateRecipe() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<number>(1);

  function handleForm(e: React.FormEvent) {
    e.preventDefault();

    api
      .post("/recipes")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="fade-in">
      <Header />

      <form
        className="mt-10 ml-auto mr-auto w-[45vw]"
        onSubmit={(e) => handleForm(e)}
      >
        <h1 className="text-center font-bold font-nunito uppercase tracking-wider text-3xl text-zinc-700 mb-4">
          Create Recipe
        </h1>
        <div className="w-full mb-3">
          <label
            className="font-nunito font-medium text-zinc-800 text-lg"
            htmlFor="name"
          >
            Recipe Name
          </label>
          <input
            className="w-full border-2 border-zinc-500 mt-2 font-nunito outline-none pl-2 py-2 rounded-md"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full mb-3">
          <label
            className="font-nunito font-medium text-zinc-800 text-lg"
            htmlFor="description"
          >
            Recipe Description
          </label>
          <input
            className="w-full border-2 border-zinc-500 mt-2 font-nunito outline-none pl-2 py-2 rounded-md"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label
            className="font-nunito font-medium text-zinc-800 text-lg"
            htmlFor="cooking-time"
          >
            Recipe Cooking Time
          </label>
          <input
            type="number"
            id="cooking-time"
            className="w-full border-2 border-zinc-500 mt-2 font-nunito outline-none pl-2 py-2 rounded-md"
            value={cookingTime}
            min={1}
            onChange={(e) => setCookingTime(Number(e.target.value))}
          />
        </div>

        <button
          className="w-full mt-5 rounded-sm hover:rounded-md bg-primary hover:bg-primary-hover text-white transition-all duration-150 ease-linear uppercase tracking-wider font-bold font-nunito py-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
