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

// const loginForm = rest.post(
// 	"http://localhost:8080/authentication/login",
// 	(req, res, ctx) => {
// 		return res(
// 			ctx.status(200),
// 			ctx.json({
// 				email: "test@test.com",
// 				password: "test1234",
// 			})
// 		);
// 	}
// );

// const server = setupServer(
// 	rest.post("http://localhost:8080/authentication/login", (req, res, ctx) => {
// 		return res(
// 			ctx.status(200),
// 			ctx.json({
// 				email: "test@test.com",
// 				password: "test1234",
// 			})
// 		);
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

// // afterEach(() => cache.clear())

const history = createMemoryHistory();
describe("Login Page Actions", () => {
	test("When the user logs in", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		// console.log(history);

		const userInput = {
			email: "test@test.com",
			password: "test1234",
		};

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: userInput.email },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: userInput.password },
		});

		const loginButton = screen.getByRole("button", {
			name: "Login",
			exact: true,
		});

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

		fireEvent.click(loginButton);

		await store.dispatch(UserLogin(userInput, history));
		await store.dispatch(login(receivedLoginData));

		localStorage.setItem("token", receivedLoginData.token);
		localStorage.setItem(
			"senderAddress",
			JSON.stringify(receivedLoginData.senderAddress)
		);

		server.use(
			rest.get("http://localhost:8080/invoice/invoice", (req, res, ctx) => {
				return (
					ctx.status(200),
					ctx.json({
						invoice: [
							{
								id: 123456,
								paymentDue: "2021-12-05",
								clientName: "Leam Peters",
								total: "100.00",
								status: "pending",
							},
						],
					})
				);
			})
		);

		await store.dispatch(displayInvoice());

		expect(history.location.pathname).toEqual("/");
	});

	test("When the user does not exist", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		const userInput = {
			email: "test@2345test.com",
			password: "test1234",
		};

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: userInput.email },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: userInput.password },
		});

		const loginButton = screen.getByRole("button", {
			name: "Login",
			exact: true,
		});

		fireEvent.click(loginButton);

		await store.dispatch(UserLogin(userInput, history));

		server.use(
			rest.post(
				"http://localhost:8080/authentication/login",
				(req, res, ctx) => {
					return res(
						ctx.status(401),
						ctx.json({
							message: "User does not exist",
							statusCode: 401,
						})
					);
				}
			)
		);

		await store.dispatch(authError("User does not exist"));

		expect(screen.getByText("user does not exist", { exact: false }));

		// screen.debug();
	});

	test("When the input field is not filled up correctly", () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: "ajkla@ljjljcom" },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: "jjlj" },
		});

		const loginButton = screen.getByRole("button", {
			name: "Login",
			exact: true,
		});

		fireEvent.click(loginButton);

		expect(
			screen.getByText("invalid email", { exact: false })
		).toBeInTheDocument();

		expect(
			screen.getByText("password is too short", { exact: false })
		).toBeInTheDocument();

		// screen.debug();
	});

	test("When the input field is empty", () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		fireEvent.change(screen.getByLabelText("email", { exact: false }), {
			target: { value: "" },
		});

		fireEvent.change(screen.getByLabelText("password", { exact: false }), {
			target: { value: "" },
		});

		const loginButton = screen.getByRole("button", {
			name: "Login",
			exact: true,
		});

		fireEvent.click(loginButton);

		expect(
			screen.getAllByText("can't be empty", { exact: false })
		).toHaveLength(2);

		// screen.debug();
	});

	test("When the use clicks on register button", () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		const registerLink = screen.getByText("register", { exact: false });

		fireEvent.click(registerLink);

		expect(history.location.pathname).toEqual("/register");
	});

	test(`When the user clicks on "Forgot Password" link`, () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<Login />
					</SWRConfig>
				</Router>
			</Provider>
		);

		const forgotPasswordLinkText = screen.getByText("forgot password?", {
			exact: false,
		});

		fireEvent.click(forgotPasswordLinkText);

		store.dispatch(forgotPasswordLink());

		expect(history.location.pathname).toEqual("/forgot-password");
	});
});
