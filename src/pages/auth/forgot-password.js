import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import PasswordIcon from "../../assets/images/icon-password.svg";
import Input from "../../components/form/input/input";
import Button from "../../components/buttons/buttons";
import { resetError } from "../../store/actions/authAction";
import { userForgotPassword } from "../../store/util/authUtility";

function ForgotPassword(props) {
	const dispatch = useDispatch();
	const { error, successMessage, success, errMessage, loading } = props;
	const [formData, setFormData] = useState({
		email: "",
	});
	const [errors, setErrors] = useState({
		emailError: "",
	});

	const [isError, setIsError] = useState(false);
	const [errClassName, setErrClassName] = useState("auth-error");
	const [successClassName, setSuccessClassName] = useState("auth-success");

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const validateForm = () => {
		let emailError = "";

		if (formData.email === "") {
			emailError = "Can't be empty";
		} else if (!validateEmail(formData.email)) {
			emailError = "Invalid email";
		}

		if (emailError) {
			setErrors({
				emailError: emailError,
			});
			setIsError(true);
			console.log(isError);
			console.log("Error occured here!");
			return false;
		} else {
			setErrors({
				emailError: "",
			});
			setIsError(false);
		}

		setIsError(false);

		return true;
	};

	const clearForm = () => {
		const formInput = document.querySelector(
			".forgotpassword-body__form--input"
		);

		return (formInput.value = "");
	};

	const submitForm = (evt) => {
		evt.preventDefault();

		const isValid = validateForm();

		if (isValid) {
			console.log(formData);
			dispatch(userForgotPassword(formData));
			clearForm();
		}
	};

	const onInputChangeHandler = (evt) => {
		const { name, value } = evt.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onBlurHandler = () => {
		if (isError) {
			return validateForm();
		}
	};

	const removeFlashMessage = () => {
		if (error) {
			setTimeout(() => {
				console.log("remove error message");
				dispatch(resetError());
				setErrClassName("auth-error-remove");
			}, 8000);
		}

		if (success) {
			setTimeout(() => {
				console.log("remove success message");
				dispatch(resetError());
				setSuccessClassName("auth-success-remove");
			}, 8000);
		}
	};

	useEffect(() => {
		removeFlashMessage();
		setErrClassName("auth-error");
		setSuccessClassName("auth-success");
	}, [error, success]);

	return (
		<section className="forgotpassword">
			<div className="forgotpassword-body">
				<figure className="forgotpassword-body__img">
					<img src={PasswordIcon} alt="A Padlock" />
				</figure>
				{error ? (
					<div className={errClassName}>
						<p>{errMessage}</p>
					</div>
				) : success ? (
					<div className={successClassName}>
						<p>{successMessage}</p>
					</div>
				) : (
					""
				)}
				<h1 className="forgotpassword-body__heading">Forgot Password</h1>
				<p className="forgotpassword-body__text">Reset Password here</p>
				<form className="forgotpassword-body__form" onSubmit={submitForm}>
					<div className="forgotpassword-body__form--main">
						<Input
							type="email"
							name="email"
							placeholder="e.g. email@example.com"
							label="Email"
							error={errors.emailError}
							className={
								errors.emailError === ""
									? "forgotpassword-body__form--input"
									: "forgotpassword-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="forgotpassword-body__form--error">
							{errors.emailError}
						</p>
					</div>
					<Button
						type="2"
						text={!loading ? "Reset Password" : "Resetting...."}
					/>
				</form>
			</div>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		successMessage: state.authReducer.successMessage,
		success: state.authReducer.success,
		loading: state.authReducer.loading,
		errMessage: state.authReducer.errMessage,
		error: state.authReducer.error,
	};
};

export default connect(mapStateToProps, null)(ForgotPassword);
