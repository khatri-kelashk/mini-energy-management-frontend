import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store";
import './index.css';

// start msw in dev (browser)
// if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK === "1") {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
  });
// }


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
