import React, { useEffect, useState, useReducer } from "react";
import Layout from "./components/layout/layout";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import data from "./data.json";
import Router from "./components/routes/route";

import moment from "moment";
import Skeleton from "./components/skeleton/skeleton";
import { getInvoice } from "./store/actions/invoiceAction";
import { logoutUser, retrieveStoredToken } from "./store/util/authUtility";

import { GlobalStyle } from "./components/theme/global";
import { ThemeProvider } from "styled-components";

import "./assets/scss/main.css";
import { getDate, paymentTerms } from "./store/actions/formAction";
import { displayInvoice } from "./store/util/invoiceUtility";

function App(props) {
	let getThemeMode = localStorage.getItem("theme");
	let themeObject = JSON.parse(getThemeMode);
	let mainTheme = themeObject;

	let [dateContext, setToday] = useState(moment());

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
		// dispatch(paymentTerms());
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(themeObject));
	}, [themeObject]);

	useEffect(() => {
		// dispatch(getInvoice(data));
		// fetch("http://localhost:8080/invoice/invoice", {
		// 	method: "GET",
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		if (data.statusCode === 200) {
		// 			dispatch(getInvoice(data.invoice));
		// 			console.log(data);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
		return props.isAuth ? dispatch(displayInvoice()) : null;
	}, []);

	useEffect(() => {
		if (tokenData.token !== null && tokenData.duration !== undefined) {
			console.log(tokenData.duration);
			setTimeout(() => {
				dispatch(logoutUser());
			}, tokenData.duration);
		}
	}, [tokenData]);

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
		isAuth: state.authReducer.isAuth,
	};
};

export default connect(mapStateToProps, null)(App);
// export default withRouter(connect(mapStateToProps, null)(App));
