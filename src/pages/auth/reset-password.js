import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router";

import PasswordIcon from "../../assets/images/icon-password.svg";
import Input from "../../components/form/input/input";
import Button from "../../components/buttons/buttons";

import { resetError } from "../../store/actions/authAction";
import { userResetPassword } from "../../store/util/authUtility";

function ResetPassword(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { error, successMessage, success, errMessage, loading } = props;

	const [formData, setFormData] = useState({
		password: "",
	});
	const [errors, setErrors] = useState({
		passwordError: "",
	});

	const [isError, setIsError] = useState(false);
	const [errClassName, setErrClassName] = useState("auth-error");
	const [successClassName, setSuccessClassName] = useState("auth-success");

	const validateForm = () => {
		let passwordError = "";

		if (formData.password === "") {
			passwordError = "Can't be empty";
		} else if (formData.password.length < 5) {
			passwordError = "Password is too short";
		}

		if (passwordError) {
			setErrors({
				passwordError: passwordError,
			});
			setIsError(true);
			console.log(isError);
			console.log("Error occured here!");
			return false;
		} else {
			setErrors({
				passwordError: "",
			});
			setIsError(false);
		}

		setIsError(false);

		return true;
	};

	const submitForm = (evt) => {
		evt.preventDefault();

		const isValid = validateForm();
		const token = props.match.params.passwordToken;

		if (isValid) {
			console.log(formData);
			dispatch(userResetPassword(token, formData, history));
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
				<h1 className="forgotpassword-body__heading">New Password</h1>
				<p className="forgotpassword-body__text">
					Enter your new password here
				</p>
				<form className="forgotpassword-body__form" onSubmit={submitForm}>
					<div className="forgotpassword-body__form--main">
						<Input
							type="password"
							name="password"
							label="Password"
							error={errors.passwordError}
							className={
								errors.passwordError === ""
									? "forgotpassword-body__form--input"
									: "forgotpassword-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="forgotpassword-body__form--error">
							{errors.passwordError}
						</p>
					</div>
					<Button type="2" text={!loading ? "Set Password" : "Setting..."} />
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

export default connect(mapStateToProps, null)(ResetPassword);
