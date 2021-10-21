import React, { useEffect, useState } from "react";
import Layout from "./components/layout/layout";
import { connect, useDispatch } from "react-redux";

import moment from "moment";

import { GlobalStyle } from "./components/theme/global";
import { ThemeProvider } from "styled-components";

import "./assets/scss/main.css";
import { getDate, paymentTerms } from "./store/actions/formAction";

function App() {
	let getThemeMode = localStorage.getItem("theme");
	let themeObject = JSON.parse(getThemeMode);
	let mainTheme = themeObject;

	let [dateContext, setToday] = useState(moment());

	const dispatch = useDispatch();

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const currentDate = () => dateContext.get("date");

	let dateElement = `${currentDate()} ${month()} ${year()}`;

	themeObject === null
		? (themeObject = { mode: "light" })
		: (themeObject = mainTheme);

	useEffect(() => {
		dispatch(getDate(dateElement));
		// dispatch(paymentTerms());
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(themeObject));
	}, [themeObject]);

	return (
		<ThemeProvider theme={themeObject}>
			<>
				<GlobalStyle />
				<Layout />
			</>
		</ThemeProvider>
	);
}

// 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

const mapStateToProps = (state) => {
	return {
		theme: state.themeReducer.theme,
	};
};

export default connect(mapStateToProps, null)(App);
