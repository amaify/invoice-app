import React from "react";

import Logo from "../../assets/images/logo.svg";
import Moon from "../../assets/images/icon-moon.svg";
import Avatar from "../../assets/images/image-avatar.jpg";

function Navigation() {
	return (
		<nav className="nav">
			<a href="/" className="nav-logo">
				<picture>
					<img src={Logo} alt="App Logo" />
				</picture>
			</a>

			<div className="nav-theme">
				<picture>
					<img src={Moon} alt="Theme Switcher" />
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
