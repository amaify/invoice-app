import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore } from "redux";
import { initialState, AuthReducer } from "../../store/reducers/authReducer";
import store from "../../store/store";

import Controls from "./control";
import Login from "../../pages/auth/login";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Layout from "../layout/layout";
import Form from "../form/invoice/form";
import { createMemoryHistory } from "history";
import { login } from "../../store/actions/authAction";

function renderWithProviders(ui, { reduxState } = {}) {
	// const store = createStore(AuthReducer, reduxState || initialState);
	return render(<Provider store={store}>{ui}</Provider>);
}

describe(`What happens when we click the "New Invoice" button`, () => {
	test(`When the user clicks on "New Invoice" button, redirect to the login page if the user is not authenticated`, () => {
		const history = createMemoryHistory();

		renderWithProviders(
			<Router history={history}>
				<Controls />,<Login />
			</Router>,
			{
				store: { isAuth: false },
			}
		);

		const newInvoiceButton = screen.getByRole("button", {
			name: /new invoice/i,
		});

		fireEvent.click(newInvoiceButton);

		// const outputElement = screen.getByText("Login", { exact: false });

		expect(history.location.pathname).toEqual("/login");
		expect(screen.getByTestId("user-login")).toBeInTheDocument();

		// screen.debug();
	});

	test(`When the user clicks on "New Invoice" button, display the "New Invoice" form if authenticated`, async () => {
		const history = createMemoryHistory();

		// store.dispatch({ type: "LOGIN", payload: { isAuth: true } });
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

		renderWithProviders(
			<Router history={history}>
				<Form />,
				<Controls />
			</Router>,
			{
				store: { showForm: true, isAuth: true },
			}
		);

		const newInvoiceButton = screen.getByRole("button", {
			name: /new invoice/i,
		});

		fireEvent.click(newInvoiceButton);

		expect(
			screen.getByPlaceholderText("e.g. email@example.com")
		).toBeInTheDocument();
	});
});
