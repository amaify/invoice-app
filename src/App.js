import React, { useEffect, useState } from "react";
import Layout from "./components/layout/layout";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import data from "./data.json";
import Router from "./components/routes/route";

import moment from "moment";
import { getInvoice } from "./store/actions/invoiceAction";

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

	// useEffect(() => {
	// 	dispatch(getInvoice(data));
	// }, []);

	return (
		<ThemeProvider theme={themeObject}>
			<>
				<GlobalStyle />
				<Layout />
				{/* <Router /> */}
			</>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => {
	return {
		theme: state.themeReducer.theme,
	};
};

export default withRouter(connect(mapStateToProps, null)(App));
