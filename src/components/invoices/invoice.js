import React from "react";

import Controls from "../controls/control";
import InvoiceTiles from "./invoiceTiles/invoice-tiles";

function Invoices() {
	return (
		<section className="invoice">
			<Controls />
			<InvoiceTiles />
		</section>
	);
}

export default Invoices;
