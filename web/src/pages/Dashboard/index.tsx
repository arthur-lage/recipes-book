import { Header } from "../../components/Header";
import { Feed } from "../../components/Feed";

export function Dashboard() {
  return (
    <div className="fade-in">
      <Header />
      <Feed />
    </div>
  );
}
