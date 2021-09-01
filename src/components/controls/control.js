import React from "react";

import Filter from "./filter/filter";
import Button from "../buttons/buttons";

import IconPlus from "../../assets/images/icon-plus.svg";

function Controls() {
	return (
		<header className="control">
			<div className="control-header">
				<h1 className="control-header__title">Invoices</h1>
				<p className="control-header__text">No invoices</p>
			</div>

			<Filter />
			<Button
				type="1"
				text="New Invoice"
				icon={<img src={IconPlus} alt="Plus Icon" />}
			/>
		</header>
	);
}

export default Controls;
