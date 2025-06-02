// main.jsx أو main.js (حسب اسم الملف في مشروعك)

import React from "react";
import ReactDOM from "react-dom/client"; // لاحظ استخدام `react-dom/client`
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
