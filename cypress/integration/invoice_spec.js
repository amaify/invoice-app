describe("Creating an invoice", () => {
	it("Can create an invoice for new user", async () => {
		cy.visit("http://localhost:3000/");

		cy.get(".button", { name: /new invoice/i }).click();

		// cy.get('[href="/register"]').click();

		// cy.get("#fullNameID > .register-body__form--input").type("James Maddison");

		// cy.get("#emailID > .register-body__form--input").type("test@test.com");

		// cy.get("#userPasswordID > .register-body__form--input").type("test1234");

		// cy.get("#streetID > .register-body__form--input").type("123 Test Street");

		// cy.get("#cityID > .register-body__form--input").type("Test City");

		// cy.get("#postCodeID > .register-body__form--input").type("TSX 3DD");

		// cy.get("#countryID > .register-body__form--input").type("TestLand");

		// cy.get('[data-testid="Register button"]').click();

		// cy.getByLabelText(/email/i).type("john.ugwuanyi@yahoo.com");
		cy.get("#loginEmailID > .login-body__form--input").type(
			"john.ugwuanyi@yahoo.com"
		);

		cy.get("#userPasswordID > .login-body__form--input").type("test1234");

		cy.get(".button").click();

		cy.get('[data-testid="New-invoice btn"]').click();

		cy.get("#clientNameID > .form-elements__group--input").type("Peter James");

		cy.get("#clientEmailID > .form-elements__group--input").type(
			"test@test.com"
		);

		cy.get('[data-testid="clientStreet"]').type("123 Test Street");

		cy.get('[data-testid="clientCity"]').type("Test City");

		cy.get('[data-testid="clientPostCode"]').type("TES TXX");

		cy.get('[data-testid="clientCountry"]').type("New Country");

		cy.get(".invoice-date__items").click();

		cy.get(":nth-child(5) > :nth-child(6) > span").click();

		cy.get(".payment-terms__items").click();

		cy.get('[value="7"]').click();

		cy.get("#projectDescriptionID > .form-elements__group--input").type(
			"test description"
		);

		cy.get('[data-testid="addItemsButton"]').click();

		cy.get('[data-testid="itemName"]').type("Play station 5");

		cy.get('[data-testid="itemQuantity"]').type("2");

		cy.get('[data-testid="itemPrice"]').type("360.99");

		cy.get(".button-2").click();

		// setTimeout(async () => {
		// 	return await cy.get('[data-testid="0G9BB4"]').click();
		// }, 5000);
	});
});
