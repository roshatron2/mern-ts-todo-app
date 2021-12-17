import "./App.css";
import Routing from "./Routing";
import Auth from "./components/Auth";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const { user }: any = useContext(UserContext);
  return <div className="App">{user ? <Routing /> : <Auth />}</div>;
}

export default App;
