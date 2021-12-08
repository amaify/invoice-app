import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router";

import { rest } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";
import store from "../../store/store";
import Navigation from "./navigation";
import InvoiceTiles from "../invoices/invoiceTiles/invoice-tiles";

import { createStore, combineReducers, compose } from "redux";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();

describe("Navigation Actions", () => {
	test("When the user clicks the avatar icon when not authenticated", () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<Navigation />
				</Router>
			</Provider>
		);

		const loginButtonElement = screen.getByTestId("loginTestID", {
			exact: false,
		});

		fireEvent.click(loginButtonElement);

		console.log(history);

		expect(history.location.pathname).toEqual("/login");

		screen.debug();
	});

	test(`When the user clicks the "Logout Icon" when authenticated`, () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<Navigation />
					<InvoiceTiles />
				</Router>
			</Provider>
		);

		const logoutIconHandler = screen.getByTestId("logoutIconTestID", {
			exact: false,
		});

		fireEvent.click(logoutIconHandler);

		history.push("/");

		expect(history.location.pathname).toEqual("/");

		expect(
			screen.getByText("There is nothing here", { exact: false })
		).toBeInTheDocument();

		screen.debug();
	});
});
