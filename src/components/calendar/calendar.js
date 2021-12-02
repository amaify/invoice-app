import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import SelectMonthList from "./calendarMonths/calendarMonths";
import SelectYearList from "./calendarYears/calendarYears";
import SelectCalendarDays from "./calendarDays/calendarDays";

import moment from "moment";

import ArrowLeft from "../../assets/images/icon-arrow-left.svg";
import ArrowRight from "../../assets/images/icon-arrow-right.svg";
import { getDate, setEditDate } from "../../store/actions/formAction";

function Calendar(props) {
	let [showMonthPopUp, setMonthPopUp] = useState(false);
	let [showYearPopUp, setYearPopUp] = useState(false);
	let [showTableElements, setTableElements] = useState(true);
	let [today, setToday] = useState(moment());
	let [dateContext, setDateContext] = useState(moment());

	const dispatch = useDispatch();
	const { editForm } = props;

	var weekDays = moment.weekdaysShort();
	var months = moment.monthsShort();

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const daysInMonth = () => dateContext.daysInMonth();
	const currentDate = () => dateContext.get("date");
	const currentDay = () => dateContext.get("D");

	const firstDayOfMonth = () => {
		let mainDate = dateContext;
		let firstDay = moment(mainDate).startOf("month").format("d");
		return firstDay;
	};

	const setMonth = (month) => {
		let monthNumber = months.indexOf(month);
		let monthContext = Object.assign({}, dateContext);
		dateContext = moment(monthContext).set("month", monthNumber);
		setDateContext(dateContext);
	};

	const nextMonth = () => {
		let newContext = Object.assign({}, dateContext);
		dateContext = moment(newContext).add(1, "month");

		setDateContext(dateContext);
	};

	const prevMonth = () => {
		let newContext = Object.assign({}, dateContext);
		dateContext = moment(newContext).subtract(1, "month");

		setDateContext(dateContext);
	};

	const selectMonthData = (e, data) => {
		setMonth(data);
		setMonthPopUp(false);
	};

	const showMonths = () => {
		setYearPopUp(false);
		setTableElements(true);
		!showMonthPopUp ? setMonthPopUp(true) : setMonthPopUp(false);
	};

	const showYear = () => {
		setTableElements(false);
		setMonthPopUp(false);
		!showYearPopUp ? setYearPopUp(true) : setYearPopUp(false);
	};

	const setNewYear = (year) => {
		let yearContext = Object.assign({}, dateContext);
		dateContext = moment(yearContext).set("year", year);
		setDateContext(dateContext);
		setYearPopUp(false);
	};

	const setNewDate = (date) => {
		let newDateContext = Object.assign({}, dateContext);
		dateContext = moment(newDateContext).set("date", date);
		setDateContext(dateContext);
	};

	const onDateChange = (data) => {
		setNewDate(data);
		let dateElement = `${currentDate()} ${month()} ${year()}`;
		props.selectedDate(dateElement);
		if (!editForm) {
			// console.log(dateElement);
			dispatch(getDate(dateElement));
		} else {
			let updateDate = new Date(dateElement).toISOString().split("T")[0];
			dispatch(setEditDate(updateDate));
		}
		props.displayCalendar();
	};

	return (
		<div
			className={`calendar ${
				props.showCalendar ? "display-calendar" : "hide-calendar"
			}`}
		>
			<div className="calendar-container">
				<div className="calendar-controls">
					<figure
						onClick={() => prevMonth()}
						className="calendar-controls__prev"
					>
						<img src={ArrowLeft} alt="Arrow facing left" />
					</figure>
					<div className="calendar-controls__duration">
						<h3 className="calendar-month__heading" onClick={showMonths}>
							{month()}
						</h3>
						<h3 className="calendar-year" onClick={showYear}>
							{year()}
						</h3>
					</div>

					<figure
						onClick={() => nextMonth()}
						className="calendar-controls__next"
					>
						<img src={ArrowRight} alt="Arrow facing right" />
					</figure>
				</div>
				{/* {showMonthPopUp ? (
					<h3 className="calendar-body__text">Select a Month</h3>
				) : (
					""
				)} */}
				<table className="calendar-table">
					<tbody className="calendar-body">
						{showMonthPopUp ? (
							// <SelectList data={months} />
							<SelectMonthList
								data={months}
								selectMonthData={selectMonthData}
							/>
						) : showTableElements ? (
							// trElements
							<SelectCalendarDays
								firstDayOfMonth={firstDayOfMonth}
								daysInMonth={daysInMonth}
								currentDate={currentDate}
								onDateChange={onDateChange}
							/>
						) : null}
						{showYearPopUp ? (
							<SelectYearList data={year()} setNewYear={setNewYear} />
						) : showTableElements ? null : (
							// trElements
							<SelectCalendarDays
								firstDayOfMonth={firstDayOfMonth}
								daysInMonth={daysInMonth}
								currentDate={currentDate}
								onDateChange={onDateChange}
							/>
						)}
					</tbody>
				</table>
			</div>
			{/* {dateElement} */}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
	};
};

export default connect(mapStateToProps, null)(Calendar);
