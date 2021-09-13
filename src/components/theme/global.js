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
    }
`;
