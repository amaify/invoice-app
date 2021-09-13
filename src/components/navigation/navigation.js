import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Logo from "../../assets/images/logo.svg";
import Moon from "../../assets/images/icon-moon.svg";
import Sun from "../../assets/images/icon-sun.svg";
import Avatar from "../../assets/images/image-avatar.jpg";
import {
	switchThemeToDark,
	switchThemeToLight,
} from "../../store/util/themeUtility";

function Navigation() {
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();

	let getToggleState = localStorage.getItem("toggle");
	let toggleObject = JSON.parse(getToggleState);
	let mainToggle = toggleObject;

	toggleObject === null ? (toggleObject = false) : (toggleObject = mainToggle);

	useEffect(() => {
		localStorage.setItem("toggle", JSON.stringify(toggleObject));
	}, [toggleObject]);

	let toggleIcon;

	const setThemeSwitch = () => {
		toggle ? setToggle(false) : setToggle(true);

		if (!toggleObject) {
			dispatch(switchThemeToDark());
		} else {
			dispatch(switchThemeToLight());
		}
	};

	toggleObject ? (toggleIcon = Sun) : (toggleIcon = Moon);
	return (
		<nav className="nav">
			<a href="/" className="nav-logo">
				<picture>
					<img src={Logo} alt="App Logo" />
				</picture>
			</a>

			<div className="nav-theme" onClick={setThemeSwitch}>
				<picture>
					<img src={toggleIcon} alt="Theme Switcher" />
				</picture>
			</div>

			<div className="nav-avatar">
				<picture>
					<img src={Avatar} alt="User Avatar" />
				</picture>
			</div>
		</nav>
	);
}

export default Navigation;
