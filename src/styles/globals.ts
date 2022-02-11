import 'bootstrap/dist/css/bootstrap.min.css';

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f0f0f5 no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px sans-serif;
  }

  button {
    cursor: pointer;
  }

  #root {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
  }

  .main-container {
    padding: 0;
  }

  @media only screen and (max-width: 800px) {
    thead th {
      display: none;
    }

    td, th {
      display: block;
    }

    td[data-th]:before  {
      content: attr(data-th);
      font-weight: bold;
    }
  }
`;
