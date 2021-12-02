import { rest } from "msw";

const newUserData = {
	userName: "James Browning",
	email: "test@register.com",
	password: "testing1234",
	senderStreet: "123 register street",
	senderCity: "Celtic",
	senderPostCode: "CC3 D90",
	senderCountry: "Republic of Canada",
};

const passedData = {
	invoiceItem: {
		_id: "61981046b75d3052ec0e9bd",
		id: "123456",
		createdAt: "2021-11-25",
		paymentDue: "2021-11-26",
		description: "Test things",
		paymentTerms: 1,
		status: "paid",
		clientName: "Test Abraham",
		clientEmail: "rajval@test.co.au",
		clientStreet: "1009 Test road",
		clientPostCode: "DU00 HTST",
		clientCity: "Duss City",
		clientCountry: "Test Republic",
		items: [
			{ name: "Test Uniform", price: 140.99, quantity: 23, total: 3242.77 },
			{ name: "Test Shoes", price: 20.99, quantity: 23, total: 482.77 },
		],
		total: 3725.54,
	},
};

export const handlers = [
	rest.post("http://localhost:8080/authentication/login", (req, res, ctx) => {
		const { email, password } = req.body;

		return res(
			ctx.status(200),
			ctx.json({
				senderAddress: {
					street: "123 Test Street",
					city: "Test City",
					postCode: "TE1 4XC",
					country: "Nigeria",
				},
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
				statusCode: 200,
				email,
				password,
			})
		);
	}),

	rest.post("http://localhost:8080/invoice/new-invoice", (req, res, ctx) => {
		return res(
			ctx.status(201),
			ctx.json({
				clientCity: "Middlesbrough",
				clientCountry: "Niger",
				clientEmail: "test@test.com",
				clientName: "Leah Peters",
				clientPostCode: "TXX 2XX",
				clientStreet: "123 Street Road",
				description: "Design",
				listOfItems: [
					{ name: "Game", quantity: "10", price: "10", total: "100" },
				],
			})
		);
	}),

	rest.get("http://localhost:8080/invoice/invoice", (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				invoice: [
					{
						id: "123456",
						paymentDue: "2021-12-10",
						clientName: "James Stella",
						total: "100.00",
						status: "paid",
					},
				],
				statusCode: 200,
			})
		);
	}),

	rest.post("http://localhost:8080/authentication/signup", (req, res, ctx) => {
		return res(ctx.status(201), ctx.json(newUserData));
	}),

	rest.put(
		"http://localhost:8080/invoice/invoice/:invoicdId",
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({ message: "Invoice successfully updated", statusCode: 200 })
			);
		}
	),

	rest.delete(
		`http://localhost:8080/invoice/invoice/:invoiceId`,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({ message: "Invoice successfully deleted", statusCode: 200 })
			);
		}
	),

	rest.get("*", (req, res, ctx) => {
		console.error(`Please add a request handler for ${req.url.toString()}`);
		return res(
			ctx.status(500),
			ctx.json({ error: "Please add a request handler" })
		);
	}),
];
