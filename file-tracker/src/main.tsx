import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { invoke } from "@tauri-apps/api";

setTimeout(() => {
  invoke('close_splashscreen');
}, 5000)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
