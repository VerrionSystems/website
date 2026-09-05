import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { LegalPage } from "./LegalPage.jsx";
import "./styles.css";
import "./legal.css";

const pageId=document.body.dataset.page;
const legal=['privacy','terms','data-handling'].includes(pageId);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {legal ? <LegalPage pageId={pageId}/> : <App />}
  </React.StrictMode>,
);
