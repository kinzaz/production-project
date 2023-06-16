import App from "./App";
import React from "react";
import ReactDom from "react-dom/client";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
