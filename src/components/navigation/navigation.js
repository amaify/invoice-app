import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import Moon from "../../assets/images/icon-moon.svg";
import Sun from "../../assets/images/icon-sun.svg";
import Avatar from "../../assets/images/image-avatar.jpg";

import logoutIcon from "../../assets/images/icon-logout.svg";
import userIcon from "../../assets/images/icon-user.svg";

import {
	switchThemeToDark,
	switchThemeToLight,
} from "../../store/util/themeUtility";
import { logoutUser } from "../../store/util/authUtility";

function Navigation(props) {
	const [toggle, setToggle] = useState(false);

	const { isAuth } = props;
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

	const logoutHandler = () => {
		return dispatch(logoutUser());
	};
	return (
		<nav className="nav">
			<a href="/" className="nav-logo">
				<picture>
					<img src={Logo} alt="App Logo" />
				</picture>
			</a>

			<div className="nav-theme">
				<picture>
					<img
						src={logoutIcon}
						alt="Logout button"
						className={
							isAuth
								? "nav-theme__logoutButton"
								: "nav-theme__logoutButton nav-theme__logoutButton--invisible"
						}
						onClick={logoutHandler}
						data-testid="logoutIconTestID"
					/>
					<img
						src={toggleIcon}
						alt="Theme Switcher"
						onClick={setThemeSwitch}
						className="nav-theme__switch"
					/>
				</picture>
			</div>

			<div className="nav-avatar">
				<picture>
					{isAuth ? (
						<img src={Avatar} alt="User Avatar" />
					) : (
						<Link to="/login" data-testid="loginTestID">
							<img src={userIcon} alt="User Icon" />
						</Link>
					)}
				</picture>
			</div>
		</nav>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.authReducer.isAuth,
	};
};

export default connect(mapStateToProps)(Navigation);
