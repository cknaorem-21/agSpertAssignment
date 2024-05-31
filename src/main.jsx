import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import { SaleOrderContextProvider } from "./contexts/SaleOrderContext.jsx";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SaleOrderContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SaleOrderContextProvider>
  </React.StrictMode>
);
