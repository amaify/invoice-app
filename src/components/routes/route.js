import React from "react";
import { Route, Switch } from "react-router-dom";

// import InvoiceTiles from "../invoices/invoiceTiles/invoice-tiles";
import Invoices from "../invoices/invoice";
import InvoiceDetails from "../invoices/invoiceDetails/invoice-details";

function Router() {
	return (
		<>
			<Switch>
				<Route path="/" exact render={(props) => <Invoices {...props} />} />
				<Route
					path="/details/:itemId"
					exact
					render={(props) => <InvoiceDetails {...props} />}
				/>
			</Switch>
		</>
	);
}

export default Router;
