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
    }
`;
