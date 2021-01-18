import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 90%;

    --primary-Color: #080705;
    --accent-Color: #631D76;
    --bg-Color: #FEFCFD;
  }

  *, button, input {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyles;
