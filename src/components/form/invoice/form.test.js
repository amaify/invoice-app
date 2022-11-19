import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { SWRConfig } from "swr";

import "@testing-library/jest-dom";

import { createMemoryHistory } from "history";

import store from "../../../store/store";
import { login } from "../../../store/actions/authAction";

import Form from "./form";
import InvoiceTiles from "../../invoices/invoiceTiles/invoice-tiles";
import { hideForm } from "../../../store/actions/formAction";
import {
	submitFormDraft,
	submitFormPending,
} from "../../../store/util/formUtility";
import { displayInvoice } from "../../../store/util/invoiceUtility";
import { getInvoice } from "../../../store/actions/invoiceAction";
import { UserLogin } from "../../../store/util/authUtility";

const userInput = {
	clientCity: "Middlesbrough",
	clientCountry: "Niger",
	clientEmail: "test@test.com",
	clientName: "Leah Peters",
	date: "2021-11-30",
	clientPostCode: "TXX 2XX",
	clientStreet: "123 Street Road",
	description: "Design",
	listOfItems: [{ name: "Game", quantity: "10", price: "10", total: "100" }],
};

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
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Form />
						<InvoiceTiles />
					</SWRConfig>
				</Router>
			</Provider>
		);

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

		const saveAndSendButtonElement = screen.getAllByRole("button", {
			name: "Save & Send",
			exact: false,
		});

		fireEvent.click(saveAndSendButtonElement[0]);

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

	test(`Creating an invoice when the user clicks "Save as Draft" button`, async () => {
		const history = createMemoryHistory();

		userInput.clientPostCode = "";
		userInput.clientCountry = "";
		userInput.clientName = "";
		userInput.listOfItems[0].price = "";
		userInput.listOfItems[0].quantity = "";

		const receivedData = [
			{
				id: "123456",
				paymentDue: "2021-12-05",
				clientName: "",
				total: "",
				status: "draft",
			},
		];

		render(
			<Provider store={store}>
				<Router history={history}>
					<Form />
					<InvoiceTiles />
				</Router>
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

		const saveAsDraftButtonElement = screen.getAllByRole("button", {
			name: "Save as Draft",
			exact: false,
		});

		fireEvent.click(saveAsDraftButtonElement[0]);

		await store.dispatch(submitFormDraft(userInput));

		store.dispatch(hideForm());

		await store.dispatch(displayInvoice());
		await store.dispatch(getInvoice(receivedData));

		expect(history.location.pathname).toEqual("/");

		const informationElement = screen.queryAllByText("No Information")[0];
		const totalAmountElement = screen.queryAllByTestId("totalAmount")[0];

		expect(informationElement).toBeInTheDocument();

		expect(totalAmountElement).toBeInTheDocument();
	});
});
