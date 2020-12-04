import { injectGlobal } from "@emotion/css";

import Font from "../assets/fonts/FrenchFriesILTD-Regular.woff";
import Background from "../assets/images/i-like-food.svg";

export default () => injectGlobal`
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");

    @font-face {
    font-family: "FrenchFries";
    src: url(${Font}) format("woff");
    }

    body {
    padding: 0;
    margin: 0;
    font-family: "Inter", sans-serif;
    color: #2e2e2e;
    }

    body::after {
    content: "";
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: url(${Background});
    z-index: -2;
    opacity: 0.05;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    font-family: "FrenchFries", sans-serif;
    }
`;
