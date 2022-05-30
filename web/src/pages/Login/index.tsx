import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const { handleSetToken, isAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    if (email.length === 0) return;
    if (password.length === 0) return;

    api
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        handleSetToken(res.data.token);
      })
      .catch((err) => {
        const { message } = err.response.data;
        console.log(message);
      });
  }

  useEffect(() => {
    if (isAuth) {
      //@ts-ignore
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="fade-in flex flex-col justify-center items-center min-h-[100vh]">
      <h1 className="text-primary text-4xl font-bold uppercase font-nunito">
        Login
      </h1>

      <form className="mt-14 w-[35vw]" onSubmit={(e) => submitForm(e)}>
        <div className="flex flex-col gap-3 mb-5">
          <label
            className="font-medium font-nunito text-lg text-zinc-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-[1px] border-primary rounded-sm outline-none p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-3 mb-2">
          <label
            className="font-nunito font-medium text-lg text-zinc-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-[1px] border-primary rounded-sm outline-none p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>

        <button
          className="w-full mt-4 mb-7 font-nunito font-medium text-xl py-2 text-zinc-100 rounded-sm hover:rounded-md transition-all duration-150 ease-linear bg-primary hover:bg-primary-hover"
          type="submit"
        >
          Login
        </button>

        <div className="flex justify-center">
          <Link
            className="text-zinc-500 hover:text-zinc-800 transition-all ease-linear duration-150 font-medium"
            to="/register"
          >
            Don't have an account yet? Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
