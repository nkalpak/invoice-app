import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./providers/app-provider";
import { GlobalErrorBoundary } from "./lib/react-error-boundary";
import { Amplify } from "aws-amplify";
import { config } from "./utils/config";

Amplify.configure({
  Auth: {
    region: config("VITE_COGNITO_REGION"),
    userPoolId: config("VITE_COGNITO_USER_POOL_ID"),
    userPoolWebClientId: config("VITE_COGNITO_POOL_WEB_CLIENT_ID"),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <GlobalErrorBoundary>
        <App />
      </GlobalErrorBoundary>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
