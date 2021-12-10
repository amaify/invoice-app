import React from "react";
import { connect, useDispatch } from "react-redux";
import { hideForm } from "../../store/actions/formAction";
import Router from "../routes/route";

import Navigation from "../navigation/navigation";
// import Controls from "../controls/control";
// import Invoices from "../invoices/invoice";
import Form from "../form/invoice/form";
import Backdrop from "../backdrop/backdrop";

const Layout = (props) => {
	const dispatch = useDispatch();

	const closeForm = () => {
		dispatch(hideForm());
	};
	return (
		<section className="layout">
			<div className="layout-nav">
				<Navigation />
			</div>

			{props.displayForm && props.isAuth && <Form />}

			<div className="layout-main">
				{(props.showBackdrop && <Backdrop onClick={closeForm} />) ||
					(props.invoiceBackdrop && <Backdrop />)}
				{/* {!props.routeToggled && <Controls />} */}
				{/* <Invoices /> */}
				<Router />
			</div>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.authReducer.isAuth,
		displayForm: state.form.showForm,
		showBackdrop: state.form.backdrop,
		invoiceBackdrop: state.invoiceReducer.backdrop,
		routeToggled: state.routeReducer.routeToggled,
	};
};

export default connect(mapStateToProps, null)(Layout);
