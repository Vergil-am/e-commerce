import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qk3ei1ro2sxsvt5m.us.auth0.com"
      clientId="NnhTr5e6WjnR12gNib5w68Z9fL3Moxda"
      cacheLocation={'localstorage'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'http://localhost:5000/',
        scope: "openid"

      }}
      
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);
