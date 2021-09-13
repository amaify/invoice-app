import { setThemeToDark, setThemeToLight } from "../actions/themeAction";

export const switchThemeToDark = () => {
	return (dispatch) => {
		let theme = { mode: "dark" };
		theme = JSON.stringify(theme);
		localStorage.setItem("theme", theme);
		localStorage.setItem("toggle", true);
		dispatch(setThemeToDark());
	};
};

export const switchThemeToLight = () => {
	return (dispatch) => {
		let theme = { mode: "light" };
		theme = JSON.stringify(theme);
		localStorage.setItem("theme", theme);
		localStorage.setItem("toggle", false);
		dispatch(setThemeToLight());
	};
};
