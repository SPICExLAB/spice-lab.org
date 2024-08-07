import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: scroll !important;
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* For Firefox */
  }

  body {
    overflow-x: hidden;
    margin-right: calc(-1 * (100vw - 100%)); /* Prevent content shift */
  }

  /* Customizing scrollbar appearance for WebKit browsers */
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* Reset or Normalize CSS */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Your existing font and color styles */
  body {
    color: #232129;
    font-family: 'Avenir', sans-serif;
  }

  h1 {
    margin-bottom: 40px;
  }
  h2 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 2rem;
  }
`;

export default GlobalStyle;
