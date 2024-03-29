import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import InvoiceDetails from "./invoice-details";
import Form from "../../form/invoice/form";
import { SWRConfig } from "swr";
import store from "../../../store/store";
import { createMemoryHistory } from "history";
import {
	confirmDelete,
	deleteInvoice,
	invoiceMarked,
} from "../../../store/actions/invoiceControls";
import {
	deleteAnInvoice,
	getOneInvoice,
	markAsPaid,
} from "../../../store/util/invoiceUtility";
import {
	editForm,
	hideForm,
	showForm,
} from "../../../store/actions/formAction";
import {
	getSingleInvoice,
	resetInvoice,
} from "../../../store/actions/invoiceAction";

const history = createMemoryHistory();

const passedData = {
	invoiceItem: {
		_id: "61981046b75d3052ec0e9bd",
		id: "123456",
		createdAt: "2021-11-25",
		paymentDue: "2021-11-26",
		description: "Test things",
		paymentTerms: 1,
		status: "Test Status",
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

const mainData = [
	{
		_id: "61981046b75d3052ec0e9bd",
		id: "123456",
		createdAt: "2021-11-25",
		paymentDue: "2021-11-26",
		description: "Test things",
		paymentTerms: 1,
		status: "Pending",
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
];

history.location.state = passedData;

describe("Invoice Details actions", () => {
	test("When we click the delete button", async () => {
		const localStorageObject = {
			street: "1234 Athol Street",
			city: "Darlington",
			postCode: "DL1 5SR",
			country: "England, United Kingdom",
		};
		localStorage.setItem("senderAddress", JSON.stringify(localStorageObject));

		store.dispatch(getOneInvoice(passedData.invoiceItem));

		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<InvoiceDetails />
					</SWRConfig>
				</Router>
			</Provider>
		);

		await store.dispatch(getSingleInvoice(mainData));

		const deleteButtonElement = screen.getAllByRole("button", {
			name: "Delete",
			exact: false,
		});

		fireEvent.click(deleteButtonElement[0]);

		store.dispatch(confirmDelete());

		expect(screen.getByTestId("modalID", { exact: false })).toBeInTheDocument();

		const confirmDeleteButtonElement = screen.getByTestId("confirmDelete", {
			exact: false,
		});

		fireEvent.click(confirmDeleteButtonElement);

		await store.dispatch(deleteAnInvoice(passedData, history));

		store.dispatch(deleteInvoice());

		// history.push("/");
		expect(history.location.pathname).toEqual("/");
		// screen.debug();
	});

	test("When the edit button is clicked", async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<InvoiceDetails />,
						<Form />
					</SWRConfig>
				</Router>
			</Provider>
		);

		store.dispatch(getOneInvoice(passedData.invoiceItem));

		await store.dispatch(getSingleInvoice(mainData));

		const editButtonElement = screen.getAllByRole("button", {
			name: "Edit",
			exact: false,
		});

		fireEvent.click(editButtonElement[0]);

		store.dispatch(editForm(passedData.invoiceItem));

		store.dispatch(showForm());

		expect(
			screen.getByTestId("invoice-form", { exact: false })
		).toBeInTheDocument();
	});

	test(`When the user clicks the "Mark as paid" button`, async () => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<InvoiceDetails />
					</SWRConfig>
				</Router>
			</Provider>
		);

		await store.dispatch(getSingleInvoice(mainData));

		const markAsPaidButtonElement = screen.getAllByRole("button", {
			name: "Mark as Paid",
			exact: false,
		});

		fireEvent.click(markAsPaidButtonElement[0]);

		mainData[0].status = "Paid";

		await store.dispatch(markAsPaid(mainData));

		await store.dispatch(resetInvoice());

		await store.dispatch(invoiceMarked());

		expect(
			screen.queryByRole("button", { name: "Mark as Paid", exact: false })
		).not.toBeInTheDocument();

		expect(screen.getByText("Paid", { exact: false })).toBeInTheDocument();

		// screen.debug();
	});
});

describe("Edit form actions", () => {
	test(`When the user clicks on the "Save changes Button" after filling out the input fields correctly`, async () => {
		store.dispatch(getOneInvoice(passedData.invoiceItem));

		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<InvoiceDetails />,
						<Form />
					</SWRConfig>
				</Router>
			</Provider>
		);

		await store.dispatch(getSingleInvoice(mainData));

		const editButtonElement = screen.getAllByRole("button", {
			name: "Edit",
			exact: false,
		});

		fireEvent.click(editButtonElement[0]);

		store.dispatch(editForm(passedData.invoiceItem));

		store.dispatch(showForm());

		const saveChangesButtonElement = screen.getByRole("button", {
			name: "Save Changes",
			exact: false,
		});

		fireEvent.click(saveChangesButtonElement);

		await store.dispatch(hideForm());

		// screen.debug();
	});

	test(`When the user clicks on the "Save changes Button" after failing to fill the input fields correctly`, async () => {
		store.dispatch(getOneInvoice(passedData.invoiceItem));

		render(
			<Provider store={store}>
				<Router history={history}>
					<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
						<InvoiceDetails />,
						<Form />
					</SWRConfig>
				</Router>
			</Provider>
		);

		mainData[0].clientStreet = "";

		await store.dispatch(getSingleInvoice(mainData));

		const editButtonElement = screen.getAllByRole("button", {
			name: "Edit",
			exact: false,
		});

		fireEvent.click(editButtonElement[0]);

		fireEvent.change(screen.getByLabelText("Client's Name", { exact: false }), {
			target: { value: passedData.invoiceItem.clientName },
		});

		fireEvent.change(
			screen.getByLabelText("Client's Email", { exact: false }),
			{
				target: { value: "dslakj@laksdflcom" },
			}
		);

		fireEvent.change(screen.getByTestId("clientStreet", { exact: false }), {
			target: { value: mainData[0].clientStreet },
		});

		fireEvent.change(screen.getByTestId("clientCity", { exact: false }), {
			target: { value: passedData.invoiceItem.clientCity },
		});

		fireEvent.change(screen.getByTestId("clientPostCode", { exact: false }), {
			target: { value: passedData.invoiceItem.clientPostCode },
		});

		fireEvent.change(screen.getByTestId("clientCountry", { exact: false }), {
			target: { value: passedData.invoiceItem.clientCountry },
		});

		fireEvent.change(
			screen.getByLabelText("Project Description", {
				exact: false,
			}),
			{
				target: { value: passedData.invoiceItem.description },
			}
		);

		const saveChangesButtonElement = screen.getByRole("button", {
			name: "Save Changes",
			exact: false,
		});

		fireEvent.click(saveChangesButtonElement);

		expect(
			screen.getByText("Invalid Email", { exact: false })
		).toBeInTheDocument();

		expect(
			screen.getByText("All fields must be added", { exact: false })
		).toBeInTheDocument();

		expect(
			screen.queryByText("Can't be empty", { exact: true })
		).toBeInTheDocument();
	});
});
