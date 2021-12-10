import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { server } from "../../../mocks/server";

import "@testing-library/jest-dom";

import { createStore, combineReducers, compose } from "redux";
import { createMemoryHistory } from "history";

import store from "../../../store/store";
import { connect, useSelector } from "react-redux";
import { Router } from "react-router-dom";
import InvoiceTiles from "./invoice-tiles";
import Invoices from "../invoice";
import InvoiceLinks from "./invoice-links";
import InvoiceDetails from "../invoiceDetails/invoice-details";

// import { AuthReducer } from "../../../store/reducers/authReducer";
import App from "../../../App";
import invoice from "../invoice";
import { LOGIN } from "../../../store/actions/actionTypes";
import { login } from "../../../store/actions/authAction";
import { invoiceReducer, AuthReducer } from "../../../store/reducers/index";
import { getInvoice } from "../../../store/actions/invoiceAction";
import { displayInvoice } from "../../../store/util/invoiceUtility";
import { UserLogin } from "../../../store/util/authUtility";

// function renderWithProviders(ui, { reduxState } = {}) {
// 	// const store = createStore(AuthReducer, reduxState || initialState);
// 	return render(<Provider store={store}>{ui}</Provider>);
// }

// const dataCall = "http://localhost:8080/invoice/invoice";

// const dataResponse = rest.get("/invoice", (req, res, ctx) => {
// 	return res(
// 		ctx.json({
// 			invoice: [
// 				{
// 					id: "123456",
// 					paymentDue: "2021-12-10",
// 					clientName: "James Peters",
// 					total: "100.00",
// 					status: "paid",
// 				},
// 			],
// 			statusCode: 200,
// 		})
// 	);
// });

// const fetchInvoices = rest.get(
// 	"http://localhost:8080/invoice/invoice",
// 	(req, res, ctx) => {
// 		return res(
// 			ctx.status(200),
// 			ctx.json({
// 				invoice: [
// 					{
// 						id: "123456",
// 						paymentDue: "2021-12-10",
// 						clientName: "James Stella",
// 						total: "100.00",
// 						status: "paid",
// 					},
// 				],
// 				statusCode: 200,
// 			})
// 		);
// 	}
// );

// const server = new setupServer(fetchInvoices);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

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

		// await store.dispatch(
		// 	login({ email: "test@test.com", password: "test1234" })
		// );

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

		// server.use(
		// 	rest.get("http://localhost:8080/invoice/invoice", (req, res, ctx) => {
		// 		return res(
		// 			ctx.status(200),
		// 			ctx.json({
		// 				senderAddress: {
		// 					street: "123 Athol Street",
		// 					city: "Warri",
		// 					postCode: "WR3 X45",
		// 					country: "Nigeria",
		// 				},

		// 				token:
		// 					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlkMTJiMWIyMzY5Y",
		// 				statusCode: 200,
		// 			})
		// 		);
		// 	})
		// );

		await store.dispatch(login(receivedLoginData));

		// localStorage.setItem("token", receivedLoginData.token);
		// localStorage.setItem(
		// 	"senderAddress",
		// 	JSON.stringify(receivedLoginData.senderAddress)
		// );

		await store.dispatch(displayInvoice());

		await store.dispatch(getInvoice(data));

		expect(
			screen.getByAltText("arrow facing right", { exact: false })
		).toBeInTheDocument();

		// screen.debug();
	});
});

describe("Clicking on an invoice", () => {
	test("When we click on an invoice we should go to the details page", async () => {
		const history = createMemoryHistory();
		// const data = [
		// 	{
		// 		id: "123456",
		// 		paymentDue: "2021-12-10",
		// 		clientName: "James Peters",
		// 		total: "100.00",
		// 		status: "paid",
		// 	},
		// ];

		render(
			<Provider store={store}>
				<Router history={history}>
					<InvoiceTiles />
				</Router>
			</Provider>
		);

		// await store.dispatch(
		// 	login({ email: "test@test.com", password: "test1234" })
		// );

		// const receivedLoginData = {
		// 	senderAddress: {
		// 		street: "123 Athol Street",
		// 		city: "Warri",
		// 		postCode: "WR3 X45",
		// 		country: "Nigeria",
		// 	},

		// 	token:
		// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlkMTJiMWIyMzY5Y",
		// 	statusCode: 200,
		// };

		// await store.dispatch(
		// 	UserLogin({ email: "test@test.com", password: "test1234" }, history)
		// );

		// await store.dispatch(login(receivedLoginData));

		// localStorage.setItem("token", receivedLoginData.token);
		// localStorage.setItem(
		// 	"senderAddress",
		// 	JSON.stringify(receivedLoginData.senderAddress)
		// );

		// await store.dispatch(displayInvoice());

		// await store.dispatch(getInvoice(data));

		const invoiceElement = await screen.findAllByTestId("invoices");
		fireEvent.click(invoiceElement[0]);

		expect(history.location.pathname).toEqual("/details/123456");
	});
});
