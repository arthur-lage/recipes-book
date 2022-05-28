import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/useAuth";

export function Register() {
  const { isAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    if (name.length === 0) return;
    if (email.length === 0) return;
    if (password.length === 0) return;

    const res = await api.post("/users", {
      name,
      email,
      password,
    });

    console.log(res.data);
  }

  useEffect(() => {
    if (isAuth) {
      //@ts-ignore
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={(e) => submitForm(e)}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
          />
        </div>
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
        <button type="submit">Register</button>

        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}
