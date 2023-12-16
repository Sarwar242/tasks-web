import * as React from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import { SignIn } from "../components/auth/SignIn";


const IndexRoute = () => {
	return (
		<Routes>
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignIn />} />
			<Route path="/" element={<LandingPage />} />
		</Routes>
	);
};
export default IndexRoute;
