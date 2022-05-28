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
    <div>
      <h1>Login</h1>

      <form onSubmit={(e) => submitForm(e)}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        <button type="submit">Login</button>

        <Link to="/register">Don't have an account yet? Create one</Link>
      </form>
    </div>
  );
}
