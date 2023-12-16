import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import "./App.css";
import IndexRoute from "./router/IndexRoute";
import { isAuthenticated } from "./common/common";
import NavBar from "./components/include/NavBar";

export default function App() {
  const navigate = useNavigate();

  const url = window.location.pathname;

  const pathSegments = url.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
      if (
        isAuthenticated(reactLocalStorage.get("loggedInUser"))
      ) {
      } else {
        navigate("/signIn");
      }
  }, [navigate,  url]);

  return (
    <>
      <NavBar />
      <IndexRoute />
    </>
  );
}
