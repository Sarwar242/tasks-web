import * as React from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";


const IndexRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
		</Routes>
	);
};
export default IndexRoute;
