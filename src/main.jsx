import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import { SaleOrderContextProvider } from "./contexts/SaleOrderContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import axios from "axios";

// tanstack query
const queryClient = new QueryClient();

// multiselect
const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SaleOrderContextProvider>
        <AuthContextProvider>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ChakraProvider>
        </AuthContextProvider>
      </SaleOrderContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
