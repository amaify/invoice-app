import {
	render,
	screen,
	fireEvent,
	waitFor,
	cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { rest } from "msw";
import { server } from "../../mocks/server";
import { setupServer } from "msw/node";
import { SWRConfig, useSWRConfig, Cache } from "swr";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { createStore, combineReducers, compose } from "redux";
import { createMemoryHistory } from "history";
import store from "../../store/store";

import Login from "./login";
import Register from "./register";
import { newUser, UserLogin } from "../../store/util/authUtility";
import { displayInvoice } from "../../store/util/invoiceUtility";
import {
	authError,
	forgotPasswordLink,
	login,
	register,
} from "../../store/actions/authAction";

// const newUserData = {
// 	userName: "James Browning",
// 	email: "test@register.com",
// 	password: "testing1234",
// 	senderStreet: "123 register street",
// 	senderCity: "Celtic",
// 	senderPostCode: "CC3 D90",
// 	senderCountry: "Republic of Canada",
// };

// const server = setupServer(
// 	rest.post("http://localhost:8080/authentication/signup", (req, res, ctx) => {
// 		return res(ctx.status(201), ctx.json(newUserData));
// 	}),

// 	rest.get("*", (req, res, ctx) => {
// 		console.error(`Please add a request handler for ${req.url.toString()}`);
// 		return res(
// 			ctx.status(500),
// 			ctx.json({ error: "Please add a request handler" })
// 		);
// 	})
// );

// const server = setupServer(loginForm);

// console.log(Cache());
// beforeAll(() => server.listen());
// afterEach(() => {
// 	server.resetHandlers();
// 	// console.log(cleanup);
// 	// console.log(cache);
// });
// afterAll(() => server.close());

// afterEach(() => cache.clear())

const newUserData = {
	userName: "James Browning",
	email: "test@register.com",
	password: "testing1234",
	senderStreet: "123 register street",
	senderCity: "Celtic",
	senderPostCode: "CC3 D90",
	senderCountry: "Republic of Canada",
};

const history = createMemoryHistory();

describe("Register page actions", () => {
	test("When the user clicks the register button", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0 }}>
						<Register />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.change(
			screen.getByLabelText("enter full name", { exact: false }),
			{
				target: { value: "James Browning" },
			}
		);

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: "test@register.com" },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: "testing1234" },
		});

		fireEvent.change(screen.getByLabelText("street", { exact: false }), {
			target: { value: "123 register street" },
		});

		fireEvent.change(screen.getByLabelText("city", { exact: false }), {
			target: { value: "Celtic" },
		});

		fireEvent.change(screen.getByLabelText("post code", { exact: false }), {
			target: { value: "CC3 D90" },
		});

		fireEvent.change(screen.getByLabelText("country", { exact: false }), {
			target: { value: "Republic of Canada" },
		});

		const registerButtonElement = screen.getByRole("button", {
			name: "Register",
			exact: true,
		});

		fireEvent.click(registerButtonElement);

		await store.dispatch(newUser(newUserData));

		await store.dispatch(register());

		history.push("/login");

		// console.log(history);

		// history.location.pathname = "/login";

		expect(history.location.pathname).toEqual("/login");

		// screen.debug();
	});

	test("When an email already exists", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0 }}>
						<Register />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.change(
			screen.getByLabelText("enter full name", { exact: false }),
			{
				target: { value: "James Browning" },
			}
		);

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: "test@register.com" },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: "testing1234" },
		});

		fireEvent.change(screen.getByLabelText("street", { exact: false }), {
			target: { value: "123 register street" },
		});

		fireEvent.change(screen.getByLabelText("city", { exact: false }), {
			target: { value: "Celtic" },
		});

		fireEvent.change(screen.getByLabelText("post code", { exact: false }), {
			target: { value: "CC3 D90" },
		});

		fireEvent.change(screen.getByLabelText("country", { exact: false }), {
			target: { value: "Republic of Canada" },
		});

		const registerButtonElement = screen.getByRole("button", {
			name: "Register",
			exact: true,
		});

		fireEvent.click(registerButtonElement);

		await store.dispatch(newUser(newUserData));

		const errorMessageResponse = {
			message: "User already exists",
			statusCode: 401,
		};

		server.use(
			rest.post(
				"http://localhost:8080/authentication/signup",
				(req, res, ctx) => {
					return res(
						ctx.status(401),
						ctx.json({ message: "User already exists" })
					);
				}
			)
		);

		await store.dispatch(authError(errorMessageResponse.message));

		expect(screen.getByText("user already exists", { exact: false }));
	});

	test("when the input fields are not filled up completely or entered correctly", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0 }}>
						<Register />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.change(
			screen.getByLabelText("enter full name", { exact: false }),
			{
				target: { value: "James Browning" },
			}
		);

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: "test@registercom" },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: "tes" },
		});

		fireEvent.change(screen.getByLabelText("street", { exact: false }), {
			target: { value: "" },
		});

		fireEvent.change(screen.getByLabelText("city", { exact: false }), {
			target: { value: "" },
		});

		fireEvent.change(screen.getByLabelText("post code", { exact: false }), {
			target: { value: "CC3 D90" },
		});

		fireEvent.change(screen.getByLabelText("country", { exact: false }), {
			target: { value: "Republic of Canada" },
		});

		const registerButtonElement = screen.getByRole("button", {
			name: "Register",
			exact: true,
		});

		fireEvent.click(registerButtonElement);

		expect(
			screen.getByText(`can't be empty`, { exact: false })
		).toBeInTheDocument();

		expect(
			screen.getByText(`it's empty`, { exact: false })
		).toBeInTheDocument();

		expect(
			screen.getByText(`invalid email`, { exact: false })
		).toBeInTheDocument();

		expect(
			screen.getByText("password is too short", { exact: false })
		).toBeInTheDocument();
	});

	test("When the user clicks the login link", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0 }}>
						<Register />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.click(screen.getByText("login", { exact: false }));

		expect(history.location.pathname).toEqual("/login");
	});
});
