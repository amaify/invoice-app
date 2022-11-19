import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import store from "../../../store/store";
import { Router } from "react-router-dom";
import InvoiceTiles from "./invoice-tiles";
import { login } from "../../../store/actions/authAction";
import { getInvoice } from "../../../store/actions/invoiceAction";
import { displayInvoice } from "../../../store/util/invoiceUtility";
import { UserLogin } from "../../../store/util/authUtility";

describe("Display Invoices or an Empty invoice which depends on if the user is authenticated", () => {
	test("Display Empty invoice if the user is not authenticated", () => {
		const data = [];
		store.dispatch(getInvoice(data));

		render(
			<Provider store={store}>
				<InvoiceTiles />
			</Provider>
		);

		expect(
			screen.getByText("There is nothing here", { exact: false })
		).toBeInTheDocument();
	});

	test("Display list of invoice if the user is authenticated", async () => {
		const history = createMemoryHistory();
		const data = [
			{
				id: "123456",
				paymentDue: "2021-12-10",
				clientName: "James Peters",
				total: "100.00",
				status: "paid",
			},
		];

		render(
			<Provider store={store}>
				<Router history={history}>
					<InvoiceTiles />
				</Router>
				{/* <InvoiceLinks /> */}
			</Provider>
		);

		const receivedLoginData = {
			senderAddress: {
				street: "123 Athol Street",
				city: "Warri",
				postCode: "WR3 X45",
				country: "Nigeria",
			},

			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlkMTJiMWIyMzY5Y",
			statusCode: 200,
		};

		await store.dispatch(
			UserLogin({ email: "test@test.com", password: "test1234" }, history)
		);

		await store.dispatch(login(receivedLoginData));

		await store.dispatch(displayInvoice());

		await store.dispatch(getInvoice(data));

		expect(
			screen.getByAltText("arrow facing right", { exact: false })
		).toBeInTheDocument();
	});
});

describe("Clicking on an invoice", () => {
	test("When we click on an invoice we should go to the details page", async () => {
		const history = createMemoryHistory();

		render(
			<Provider store={store}>
				<Router history={history}>
					<InvoiceTiles />
				</Router>
			</Provider>
		);

		const invoiceElement = await screen.findAllByTestId("invoices");
		fireEvent.click(invoiceElement[0]);

		expect(history.location.pathname).toEqual("/details/123456");
	});
});
