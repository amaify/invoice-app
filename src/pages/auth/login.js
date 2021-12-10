import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import Input from "../../components/form/input/input";
import Button from "../../components/buttons/buttons";
import { UserLogin } from "../../store/util/authUtility";
import { forgotPasswordLink, resetError } from "../../store/actions/authAction";

function Login(props) {
	const dispatch = useDispatch();
	const history = useHistory();

	const { error, loading, errMessage } = props;

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		emailError: "",
		passwordError: "",
	});

	const [isError, setIsError] = useState(false);
	const [errClassName, setErrClassName] = useState("auth-error");

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const validateForm = () => {
		let emailError = "";
		let passwordError = "";

		if (formData.email === "") {
			emailError = "Can't be empty";
		} else if (!validateEmail(formData.email)) {
			emailError = "Invalid email";
		}

		if (formData.password === "") {
			passwordError = "Can't be empty";
		} else if (formData.password.length < 5) {
			passwordError = "Password is too short";
		}

		if (emailError || passwordError) {
			setErrors({
				emailError: emailError,
				passwordError: passwordError,
			});
			setIsError(true);
			console.log(isError);
			console.log("Error occured here!");
			return false;
		} else {
			setErrors({
				emailError: "",
				passwordError: "",
			});
			setIsError(false);
		}

		setIsError(false);

		return true;
	};

	const submitForm = (e) => {
		e.preventDefault();

		let isValid = validateForm();

		if (isValid) {
			console.log(formData);
			return dispatch(UserLogin(formData, history));
			// return console.log(formData);
		}
	};

	const onInputHandlerChange = (evt) => {
		const { name, value } = evt.target;

		return setFormData({
			...formData,
			[name]: value,
		});
	};

	const onInputBlurHandler = () => {
		// let isValid = validateForm();

		if (isError) {
			return validateForm();
		}
	};

	const removeErrorMessage = () => {
		if (error) {
			setTimeout(() => {
				console.log("remove error message");
				dispatch(resetError());
				setErrClassName("auth-error-remove");
			}, 8000);
		}
	};

	const onSetForgotPassword = () => {
		return dispatch(forgotPasswordLink());
	};

	useEffect(() => {
		removeErrorMessage();
		setErrClassName("auth-error");
	}, [error]);

	return (
		<section className="login">
			<div className="login-body">
				<h1 className="login-body__heading">login</h1>
				{error ? (
					<div className={errClassName}>
						<p>{errMessage}</p>
					</div>
				) : (
					""
				)}
				<form
					className="login-body__form"
					onSubmit={submitForm}
					data-testid="user-login"
				>
					<div className="login-body__form--main">
						<Input
							itemId="loginEmailID"
							id="loginEmail"
							ariaLabelledby="loginEmailID loginEmail"
							type="email"
							name="email"
							placeholder="e.g. email@example.com"
							label="Email"
							defaultValue={formData.email}
							onChange={onInputHandlerChange}
							onBlur={onInputBlurHandler}
							error={errors.emailError}
							className={
								errors.emailError === ""
									? "login-body__form--input"
									: "login-body__form--input inputError"
							}
						/>
						<p className="login-body__form--error">{errors.emailError}</p>
					</div>

					<div className="login-body__form--main">
						<Input
							itemId="userPasswordID"
							id="userPassword"
							ariaLabelledby="userPasswordID userPassword"
							type="password"
							name="password"
							label="Password"
							defaultValue={formData.password}
							onChange={onInputHandlerChange}
							onBlur={onInputBlurHandler}
							error={errors.passwordError}
							className={
								errors.passwordError === ""
									? "login-body__form--input"
									: "login-body__form--input inputError"
							}
						/>
						<p className="login-body__form--error">{errors.passwordError}</p>
					</div>
					<Button type="2" text={loading ? "Loggin in..." : "Login"} />
				</form>
				<div className="login-body__links">
					<Link to="/register">Register</Link>
					<Link to="/forgot-password" onClick={onSetForgotPassword}>
						Forgot Password?
					</Link>
				</div>
			</div>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		error: state.authReducer.error,
		loading: state.authReducer.loading,
		errMessage: state.authReducer.errMessage,
		isAuth: state.authReducer.isAuth,
	};
};

export default connect(mapStateToProps, null)(Login);
