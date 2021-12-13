import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import InvoiceTiles from "../invoices/invoiceTiles/invoice-tiles";
import Invoices from "../invoices/invoice";
import InvoiceDetails from "../invoices/invoiceDetails/invoice-details";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import ForgotPassword from "../../pages/auth/forgot-password";
import ResetPassword from "../../pages/auth/reset-password";
import { connect } from "react-redux";

function Router(props) {
	const { isAuth, forgotPassword } = props;

	// console.log(isAuth);
	return (
		<>
			<Switch>
				<Route path="/" exact render={(props) => <Invoices {...props} />} />
				{isAuth && (
					<Route
						path="/details/:itemId"
						exact
						render={(props) => <InvoiceDetails {...props} />}
					/>
				)}
				{/* {!isAuth && <Route path="/login" render={() => <Login />} />}; */}
				<Route path="/login">{!isAuth ? <Login /> : <Redirect to="/" />}</Route>

				<Route
					path="/register"
					exact
					render={(props) => <Register {...props} />}
				/>
				{forgotPassword && (
					<Route
						path="/forgot-password"
						exact
						render={(props) => <ForgotPassword {...props} />}
					/>
				)}
				<Route
					path="/reset-password/:passwordToken"
					exact
					render={(props) => <ResetPassword {...props} />}
				/>
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.authReducer.isAuth,
		forgotPassword: state.authReducer.forgotPassword,
	};
};

export default connect(mapStateToProps, null)(Router);
