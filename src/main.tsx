import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>{" "}
  </SnackbarProvider>
);
