import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import Input from "../../components/form/input/input";
import Button from "../../components/buttons/buttons";
import { newUser } from "../../store/util/authUtility";
import { resetError } from "../../store/actions/authAction";

function Register(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	const { error, loading, errMessage } = props;

	const [formData, setFormData] = useState({
		userName: "",
		email: "",
		password: "",
		senderStreet: "",
		senderCity: "",
		senderPostCode: "",
		senderCountry: "",
	});

	const [errors, setErrors] = useState({
		userNameError: "",
		emailError: "",
		passwordError: "",
		senderStreetError: "",
		senderCityError: "",
		senderPostCodeError: "",
		senderCountryError: "",
	});

	const [isError, setIsError] = useState(false);
	const [errClassName, setErrClassName] = useState("auth-error");

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const validateForm = () => {
		// let emailError = "";
		// let passwordError = "";
		// let userNameError = "";
		// let senderStreetError = "";
		// let senderCityError = ""

		let emailError = "",
			passwordError = "",
			userNameError = "",
			senderStreetError = "",
			senderCityError = "",
			senderPostCodeError = "",
			senderCountryError = "";

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

		if (!formData.userName) {
			userNameError = "Can't be empty";
		}
		if (!formData.senderStreet) {
			senderStreetError = "Can't be empty";
		}
		if (!formData.senderCity) {
			senderCityError = "It's Empty";
		}
		if (!formData.senderPostCode) {
			senderPostCodeError = "It's Empty";
		}
		if (!formData.senderCountry) {
			senderCountryError = "It's Empty";
		}

		if (
			emailError ||
			passwordError ||
			userNameError ||
			senderStreetError ||
			senderCityError ||
			senderPostCodeError ||
			senderCountryError
		) {
			setErrors({
				emailError: emailError,
				passwordError: passwordError,
				userNameError: userNameError,
				senderStreetError: senderStreetError,
				senderCityError: senderCityError,
				senderPostCodeError: senderPostCodeError,
				senderCountryError: senderCountryError,
			});
			setIsError(true);
			console.log(isError);
			console.log("Error occured here!");
			return false;
		} else {
			setErrors({
				emailError: "",
				passwordError: "",
				userNameError: "",
				senderCityError: "",
				senderPostCodeError: "",
				senderStreetError: "",
				senderCountryError: "",
			});
			setIsError(false);
		}

		setIsError(false);

		return true;
	};

	const onInputChangeHandler = (evt) => {
		const { name, value } = evt.target;

		return setFormData({
			...formData,
			[name]: value,
		});
	};

	const onBlurHandler = () => {
		if (isError) {
			return validateForm();
		}
	};

	const submitForm = (e) => {
		e.preventDefault();

		const isValid = validateForm();

		if (isValid) {
			console.log(formData);
			return dispatch(newUser(formData, history));
		}
	};

	const removeErrorMessage = () => {
		if (error) {
			setTimeout(() => {
				dispatch(resetError());
				setErrClassName("auth-error-remove");
			}, 8000);
		}
	};

	useEffect(() => {
		removeErrorMessage();
		setErrClassName("auth-error");
	}, [error]);

	return (
		<section className="register">
			<div className="register-body">
				<h1 className="register-body__heading">register</h1>
				{error ? (
					<div className={errClassName}>
						<p>{errMessage}</p>
					</div>
				) : (
					""
				)}
				<form className="register-body__form" onSubmit={submitForm}>
					<div className="register-body__form--main">
						<Input
							itemId="fullNameID"
							id="userName"
							ariaLabelledby="fullNameID userName"
							type="text"
							name="userName"
							placeholder="Mark Stephenson"
							label="Enter Full Name"
							defaultValue={formData.userName}
							error={errors.userNameError}
							className={
								errors.userNameError === ""
									? "register-body__form--input"
									: "register-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="register-body__form--error">{errors.userNameError}</p>
					</div>

					<div className="register-body__form--main">
						<Input
							itemId="emailID"
							id="userEmail"
							ariaLabelledby="emailID userEmail"
							type="email"
							name="email"
							placeholder="e.g. email@example.com"
							label="Email"
							defaultValue={formData.email}
							error={errors.emailError}
							className={
								errors.emailError === ""
									? "register-body__form--input"
									: "register-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="register-body__form--error">{errors.emailError}</p>
					</div>

					<div className="register-body__form--main">
						<Input
							itemId="userPasswordID"
							id="userPassword"
							ariaLabelledby="userPasswordID userPassword"
							type="password"
							name="password"
							label="Password"
							defaultValue={formData.password}
							error={errors.passwordError}
							className={
								errors.passwordError === ""
									? "register-body__form--input"
									: "register-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="register-body__form--error">{errors.passwordError}</p>
					</div>

					<div className="register-body__form--main">
						<Input
							itemId="streetID"
							id="senderStreet"
							ariaLabelledby="streetID senderStreet"
							type="text"
							name="senderStreet"
							label="Street"
							defaultValue={formData.senderStreet}
							error={errors.senderStreetError}
							className={
								errors.senderStreetError === ""
									? "register-body__form--input"
									: "register-body__form--input inputError"
							}
							onChange={onInputChangeHandler}
							onBlur={onBlurHandler}
						/>
						<p className="register-body__form--error">
							{errors.senderStreetError}
						</p>
					</div>
					<div className="register-body__form--sub">
						<div className="register-body__form--sub-content">
							{/* <div className="register-body__form--main"> */}
							<Input
								itemId="cityID"
								id="senderCity"
								ariaLabelledby="cityID senderCity"
								type="text"
								name="senderCity"
								label="City"
								defaultValue={formData.senderCity}
								error={errors.senderCityError}
								className={
									errors.senderCityError === ""
										? "register-body__form--input"
										: "register-body__form--input inputError"
								}
								onChange={onInputChangeHandler}
								onBlur={onBlurHandler}
							/>
							<p className="register-body__form--error">
								{errors.senderCityError}
							</p>
							{/* </div> */}
						</div>

						<div className="register-body__form--sub-content">
							{/* <div className="register-body__form--main"> */}
							<Input
								itemId="postCodeID"
								id="senderPostCode"
								ariaLabelledby="postCodeID senderPostCode"
								type="text"
								name="senderPostCode"
								label="Post Code"
								defaultValue={formData.senderPostCode}
								error={errors.senderPostCodeError}
								className={
									errors.senderPostCodeError === ""
										? "register-body__form--input"
										: "register-body__form--input inputError"
								}
								onChange={onInputChangeHandler}
								onBlur={onBlurHandler}
							/>
							<p className="register-body__form--error">
								{errors.senderPostCodeError}
							</p>
							{/* </div> */}
						</div>

						<div className="register-body__form--sub-content">
							{/* <div className="register-body__form--main"> */}
							<Input
								itemId="countryID"
								id="senderCountry"
								ariaLabelledby="countryID senderCountry"
								type="text"
								name="senderCountry"
								label="Country"
								defaultValue={formData.senderCountry}
								error={errors.senderCountryError}
								className={
									errors.senderCountryError === ""
										? "register-body__form--input"
										: "register-body__form--input inputError"
								}
								onChange={onInputChangeHandler}
								onBlur={onBlurHandler}
							/>
							<p className="register-body__form--error">
								{errors.senderCountryError}
							</p>
							{/* </div> */}
						</div>
					</div>
					<Button
						type="2"
						text={loading ? "Registering...." : "Register"}
						dataTestid="Register button"
					/>
				</form>
				<div className="register-body__links">
					<span>Already have an account? </span>
					<Link to="/login">Login</Link>
				</div>
			</div>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: state.authReducer.loading,
		error: state.authReducer.error,
		errMessage: state.authReducer.errMessage,
	};
};

export default connect(mapStateToProps, null)(Register);
