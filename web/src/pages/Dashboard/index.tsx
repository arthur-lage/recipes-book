import { useEffect } from "react";
import { api } from "../../services/api";

export function Dashboard() {
  useEffect(() => {
    api.get("/users").then((res) => {
      console.log(res.data);
    });
  }, []);

  return <h1>HI, you are authenticated!</h1>;
}
