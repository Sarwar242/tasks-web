import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import "./App.css";
import IndexRoute from "./router/IndexRoute";
import { isAuthenticated } from "./common/common";
import MainNavbar from "./components/include/MainNavbar";

export default function App() {
  const navigate = useNavigate();

  const url = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated(reactLocalStorage.get("Token")) || url === "/signup") {
    } else {
      navigate("/signIn");
    }
  }, [navigate, url]);

  return (
    <>
      <MainNavbar />
      <IndexRoute />
    </>
  );
}
