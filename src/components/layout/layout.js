import React from "react";

import Navigation from "../navigation/navigation";
import Controls from "../controls/control";
import Invoices from "../invoices/invoice";

const Layout = () => {
	return (
		<section className="layout">
			<div className="layout-nav">
				<Navigation />
			</div>

			<div className="layout-main">
				<Controls />
				<Invoices />
			</div>
		</section>
	);
};

export default Layout;
