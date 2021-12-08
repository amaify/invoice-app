import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) =>
					props.theme.mode === "light" ? "#f8f8fb" : "#141625"};

        .control-header__title, 
        .invoice-empty__heading h2, 
        .invoice-empty__heading p, 
        .control-filter__title span {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"}
        }


        .control-filter__dropdown {
            background-color: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#252945"};

            box-shadow: ${(props) =>
							props.theme.mode === "light"
								? "0px 10px 20px rgba(72, 84, 159, 0.25)"
								: "0px 10px 20px rgba(0, 0, 0, 0.25)"}
        };

        .control-filter__dropdown--container {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .form {
            background-color: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#141625"}
        }

        .form-heading {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"}; 
        }

        .form-elements__group--input,
        .form-elements__group--subInput,
        .form-elements__group .added-item {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#1E2139"};

            border: ${(props) =>
							props.theme.mode === "light"
								? "1px solid #DFE3FA"
								: "1px solid #252945"};
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .form-elements__group--items-form p {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#DFE3FA"};
        }

        .form input[type="text"],
        .form input[type="email"],
        .form input[type="number"] {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .form-elements__group--input::placeholder {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};

            opacity: ${(props) => (props.theme.mode === "light" ? "0.4" : "1")};
        }

        .form-elements__group label,
        .form-elements__group--period .payment-terms label {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7e88c3" : "#DFE3FA"};
        }

        .form-elements__group--period .invoice-date label {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7e88c3" : "#DFE3FA"};

            opacity: ${(props) => (props.theme.mode === "light" ? "1" : "0.4")};
        }

        .form-elements__group--period .payment-terms .payment-terms__items,
        .form-elements__group--period .invoice-date .invoice-date__items {
            border: ${(props) =>
							props.theme.mode === "light"
								? "1px solid #DFE3FA"
								: "1px solid #252945"};
        }

        .form-elements__group--period .payment-terms .payment-terms__items span {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .form-elements__group--period .invoice-date .invoice-date__items p span {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};

            opacity: ${(props) => (props.theme.mode === "light" ? "1" : "0.4")};
        }

        .form-elements__group--period .payment-terms__list {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#252945"};
            
            box-shadow: ${(props) =>
							props.theme.mode === "light"
								? "0px 10px 20px rgba(72, 84, 159, 0.25)"
								: "0px 10px 20px rgba(0, 0, 0, 0.25)"};
        }

        .form-elements__group--period .payment-terms__list--item {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#DFE3FA"};
        }

        .form-elements__group--period .payment-terms__list--item:not(:last-child)::after {
            background: ${(props) =>
							props.theme.mode === "light" ? "#dfe3fa" : "#1E2139"};
        }

        .calendar {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#252945"};

            box-shadow: ${(props) =>
							props.theme.mode === "light"
								? "0px 10px 20px rgba(72, 84, 159, 0.25)"
								: "0px 10px 20px rgba(0, 0, 0, 0.25)"};
        }

        .calendar-month__heading,
        .calendar-year {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#DFE3FA"};
        }

        .calendar-monthdays {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#DFE3FA"};
        }

        .button-6 {
            background: ${(props) =>
							props.theme.mode === "light" ? "#f9fafe" : "#252945"};

            color: ${(props) =>
							props.theme.mode === "light" ? "#7e88c3" : "#DFE3FA"};
        }

        .button-6:hover {
            background: ${(props) =>
							props.theme.mode === "light" ? "#dfe3fa" : "#353849"};
        }

        .invoice-tiles__content,
        .details-tiles__tile {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#1E2139"};
        }

        .invoice-tiles__content--id {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .invoice-tiles__content--payment-due {
            color: ${(props) =>
							props.theme.mode === "light" ? "#888EB0" : "#DFE3FA"};
        }

        .invoice-tiles__content--client-name {
            color: ${(props) =>
							props.theme.mode === "light" ? "#858BB2" : "#FFFFFF"};
        }

        .invoice-tiles__content--total-amount {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .invoice-tiles__content--status-draft {
            background: ${(props) =>
							props.theme.mode === "light"
								? "rgba(55, 59, 83, 0.06)"
								: "rgba(223, 227, 250, 0.06)"}
        }

        .invoice-tiles__content--status-draft p span:first-child {
            background: ${(props) =>
							props.theme.mode === "light" ? "#373b53" : "#FFFFFF"}
        }

        .invoice-tiles__content--status-draft p span:last-child {
            color: ${(props) =>
							props.theme.mode === "light" ? "#373b53" : "#FFFFFF"}
        }

        .details-tiles__link a {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"}
        }

        .button-8 {
            background: ${(props) =>
							props.theme.mode === "light" ? "#f9fafe" : "#252945"};

            color: ${(props) =>
							props.theme.mode === "light" ? "#7e88c3" : "#DFE3FA"}
        }

        .button-8:hover {
            background: ${(props) =>
							props.theme.mode === "light" ? "#dfe3fa" : "#FFFFFF"};

            color: ${(props) => (props.theme.mode === "light" ? "" : "#7E88C3")}
        }

        .details-body__wrapper {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#1E2139"};
        }

        .details-body__heading--title-id {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .details-body__heading--title-text {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-body__heading--address {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-body__billing--title {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-body__billing--date-1 p:last-child,
        .details-body__billing--date-2 p:last-child,
        .details-body__billing--email-email,
        .details-body__billing--address-name {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .details-body__billing--address-address {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-items {
            background: ${(props) =>
							props.theme.mode === "light" ? "#F9FAFE" : "#252945"};
        }

        .details-items__heading--title {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-items__list--items-item-2,
        .details-items__list--items-item-3 {
            color: ${(props) =>
							props.theme.mode === "light" ? "#7E88C3" : "#DFE3FA"};
        }

        .details-items__list--items-item-1,
        .details-items__list--items-item-4 {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .details-items__amount {
            background: ${(props) =>
							props.theme.mode === "light" ? "#373B53" : "#0C0E16"};
        }

        .details-tiles__tile--status-status__draft p span:first-child {
            background: ${(props) =>
							props.theme.mode === "light" ? "#373B53" : "#FFFFFF"};
        }


        .details-tiles__tile--status-status__draft p span:last-child{
            color: ${(props) =>
							props.theme.mode === "light" ? "#373b53" : "#FFFFFF"};
        }

        .no-items {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"};
        }

        .skeleton {
            background: ${(props) =>
							props.theme.mode === "light" ? "#ffffff" : "#1E2139"};
        }

        .skeleton .loading {
            background: ${(props) =>
							props.theme.mode === "light" ? "#c1c1c1" : "#ffffff"};
        }

        .skeleton .loading::before {
            background: ${(props) =>
							props.theme.mode === "light"
								? "linear-gradient(to right, transparent, #dedede, transparent);"
								: "linear-gradient(to right, transparent, #c1c1c1, transparent);"};
        }

        .modal-content {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#1E2139"};
        }

        .modal-content__text h1 {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#FFFFFF"}; 
        }

        .modal-content__text p {
            color: ${(props) =>
							props.theme.mode === "light" ? "#888eb0" : "#DFE3FA"};
        }

        .modal-content__error p {
            color: ${(props) =>
							props.theme.mode === "light" ? "#888eb0" : "#DFE3FA"};
        }

        .details-tiles__tile--buttons-mobile {
            background: ${(props) =>
							props.theme.mode === "light" ? "#FFFFFF" : "#1E2139"};
        }

        .form-link p {
            color: ${(props) =>
							props.theme.mode === "light" ? "#0C0E16" : "#DFE3FA"};
        }
    }
`;
