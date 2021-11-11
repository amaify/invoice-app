import React from "react";
import { useLocation } from "react-router-dom";

import DetailsTiles from "./details-component/detail-tiles";
import DetailsBody from "./details-component/detail-body";
import DetailItems from "./details-component/detail-items";

function InvoiceDetails() {
	const location = useLocation();
	const data = location.state.invoiceItem;
	return (
		<section>
			<DetailsTiles data={data} />
			<div className="details-body__wrapper">
				<DetailsBody data={data} />
				<DetailItems data={data} />
			</div>
		</section>
	);
}

export default InvoiceDetails;
