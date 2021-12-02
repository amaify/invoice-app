import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { server } from "../../../mocks/server";

import "@testing-library/jest-dom";

import { createStore, combineReducers, compose } from "redux";
import { createMemoryHistory } from "history";

import store from "../../../store/store";
import { login } from "../../../store/actions/authAction";

import Form from "./form";
import { hideForm } from "../../../store/actions/formAction";
import { submitFormPending } from "../../../store/util/formUtility";
import { displayInvoice } from "../../../store/util/invoiceUtility";
import { getInvoice } from "../../../store/actions/invoiceAction";

// const submitForm = rest.post(
// 	"http://localhost:8080/invoice/new-invoice",
// 	(req, res, ctx) => {
// 		return res(
// 			ctx.status(201),
// 			ctx.json({
// 				clientCity: "Middlesbrough",
// 				clientCountry: "Niger",
// 				clientEmail: "test@test.com",
// 				clientName: "Leah Peters",
// 				clientPostCode: "TXX 2XX",
// 				clientStreet: "123 Street Road",
// 				description: "Design",
// 				listOfItems: [
// 					{ name: "Game", quantity: "10", price: "10", total: "100" },
// 				],
// 			})
// 		);
// 	}
// );

// const server = new setupServer(submitForm);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe("Creating an invoice", () => {
	test(`Create an invoice when we click the "Save & Send" button`, async () => {
		const history = createMemoryHistory();
		await store.dispatch(
			login({ email: "test@test.com", password: "test1234" })
		);
		const localStorageObject = {
			street: "1234 Athol Street",
			city: "Darlington",
			postCode: "DL1 5SR",
			country: "England, United Kingdom",
		};
		localStorage.setItem("senderAddress", JSON.stringify(localStorageObject));

		render(
			<Provider store={store}>
				<Router history={history}>
					<Form />
				</Router>
			</Provider>
		);

		const userInput = {
			clientCity: "Middlesbrough",
			clientCountry: "Niger",
			clientEmail: "test@test.com",
			clientName: "Leah Peters",
			date: "2021-11-30",
			clientPostCode: "TXX 2XX",
			clientStreet: "123 Street Road",
			description: "Design",
			listOfItems: [
				{ name: "Game", quantity: "10", price: "10", total: "100" },
			],
		};

		// const saveAndSendButtonElement = screen.getByRole("button", {
		// 	name: "Save & Send",
		// });

		fireEvent.change(screen.getByLabelText("Client's Name", { exact: false }), {
			target: { value: userInput.clientName },
		});

		fireEvent.change(
			screen.getByLabelText("Client's Email", { exact: false }),
			{
				target: { value: userInput.clientEmail },
			}
		);

		fireEvent.change(screen.getByTestId("clientStreet", { exact: false }), {
			target: { value: userInput.clientStreet },
		});

		fireEvent.change(screen.getByTestId("clientCity", { exact: false }), {
			target: { value: userInput.clientCity },
		});

		fireEvent.change(screen.getByTestId("clientPostCode", { exact: false }), {
			target: { value: userInput.clientPostCode },
		});

		fireEvent.change(screen.getByTestId("clientCountry", { exact: false }), {
			target: { value: userInput.clientCountry },
		});

		fireEvent.change(
			screen.getByPlaceholderText("e.g. Graphic Design Service", {
				exact: false,
			}),
			{
				target: { value: userInput.description },
			}
		);

		const addNewItemButton = screen.getByTestId("addItemsButton", {
			exact: false,
		});

		fireEvent.click(addNewItemButton);

		fireEvent.change(screen.getByTestId("itemName", { exact: false }), {
			target: { value: userInput.listOfItems[0].name },
		});

		fireEvent.change(screen.getByTestId("itemQuantity", { exact: false }), {
			target: { value: userInput.listOfItems[0].quantity },
		});

		fireEvent.change(screen.getByTestId("itemPrice", { exact: false }), {
			target: { value: userInput.listOfItems[0].price },
		});

		const totalPriceElement = screen.getByTestId("totalPrice", {
			exact: false,
		});

		const saveAndSendButtonElement = screen.getByRole("button", {
			name: "Save & Send",
			exact: false,
		});

		fireEvent.click(saveAndSendButtonElement);

		// server.use(
		// 	rest.post("http://localhost:8080/invoice/invoice", (req, res, ctx) => {
		// 		return res(
		// 			ctx.status(201),
		// 			ctx.json({
		// 				userInput,
		// 			})
		// 		);
		// 	})
		// );

		await store.dispatch(submitFormPending(userInput));

		const receivedData = [
			{
				id: "123456",
				paymentDue: "2021-12-05",
				clientName: "James Harden",
				total: "100",
				status: "pending",
			},
		];

		await store.dispatch(displayInvoice());
		await store.dispatch(getInvoice(receivedData));

		expect(totalPriceElement).toBeInTheDocument();

		expect(history.location.pathname).toEqual("/");

		// screen.debug();
	});
});
