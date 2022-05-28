import { useState } from "react";
import { api } from "../../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    if (email.length === 0) return;
    if (password.length === 0) return;

    const res = await api.post("/users/login", {
      email,
      password,
    });

    console.log(res.data);
  }

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
      </form>
    </div>
  );
}
