import * as React from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import { SignIn } from "../components/auth/SignIn";
import ProjectPage from "../components/project/ProjectPage";
import UserPage from "../components/auth/UserPage";
import { SignUp } from "../components/auth/SignUp";


const IndexRoute = () => {
	return (
		<Routes>
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/" element={<LandingPage />} />
			<Route path="/projects" element={<ProjectPage />} />
			<Route path="/users" element={<UserPage />} />
		</Routes>
	);
};
export default IndexRoute;
