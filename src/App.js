import React, { useEffect, useState } from "react";
import Layout from "./components/layout/layout";
import { connect, useDispatch } from "react-redux";

import moment from "moment";
import { logoutUser, retrieveStoredToken } from "./store/util/authUtility";

import { GlobalStyle } from "./components/theme/global";
import { ThemeProvider } from "styled-components";

import "./assets/scss/main.css";
import { getDate } from "./store/actions/formAction";

function App() {
	let getThemeMode = localStorage.getItem("theme");
	let themeObject = JSON.parse(getThemeMode);
	let mainTheme = themeObject;

	let [dateContext] = useState(moment());

	const dispatch = useDispatch();
	const tokenData = retrieveStoredToken();

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const currentDate = () => dateContext.get("date");

	let dateElement = `${currentDate()} ${month()} ${year()}`;

	themeObject === null
		? (themeObject = { mode: "light" })
		: (themeObject = mainTheme);

	useEffect(() => {
		dispatch(getDate(dateElement));
	}, [dispatch, dateElement]);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(themeObject));
	}, [themeObject]);

	useEffect(() => {
		if (tokenData.token !== null && tokenData.duration !== undefined) {
			console.log(tokenData.duration);
			setTimeout(() => {
				dispatch(logoutUser());
			}, tokenData.duration);
		}
	}, [tokenData, dispatch]);

	return (
		<ThemeProvider theme={themeObject}>
			<>
				<GlobalStyle />
				<Layout />
			</>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		theme: state.themeReducer.theme,
		isAuth: state.authReducer.isAuth,
		token: state.authReducer.token,
	};
};

export default connect(mapStateToProps, null)(App);
