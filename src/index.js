import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App";
import userRoleReducer from "./redux/userSlice"; // Import the role reducer
import "querystring-es3";

// Create the Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));

// Retrieve the app key from the environment variables
const appKey = process.env.REACT_APP_PRIVATE_KEY;
if (!appKey) {
  console.error("Missing REACT_APP_PRIVATE_KEY in environment variables");
}

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Pass the store to the Provider */}
      <PrivyProvider
        appId={appKey} // Replace this with your actual app ID from the Privy dashboard
        config={{
          appearance: {
            theme: "light",
            accentColor: "#676FFF", // Customize this color
            logo: "https://your-logo-url", // Optionally add a logo URL
          },
          embeddedWallets: {
            createOnLogin: "users-without-wallets", // Create wallets for users without one
          },
        }}
      >
        <App />
      </PrivyProvider>
    </Provider>
  </React.StrictMode>
);
