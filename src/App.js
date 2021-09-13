import React, { useEffect } from "react";
import Layout from "./components/layout/layout";
import { connect, useDispatch } from "react-redux";

import { GlobalStyle } from "./components/theme/global";
import { ThemeProvider } from "styled-components";

import "./assets/scss/main.css";

function App() {
	let getThemeMode = localStorage.getItem("theme");
	let themeObject = JSON.parse(getThemeMode);
	let mainTheme = themeObject;

	themeObject === null
		? (themeObject = { mode: "light" })
		: (themeObject = mainTheme);

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

const mapStateToProps = (state) => {
	return {
		theme: state.themeReducer.theme,
	};
};

export default connect(mapStateToProps, null)(App);
