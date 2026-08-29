import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { LegalPage } from "./LegalPage";
import { ModulePage } from "./ModulePage";
import "./styles.css";

const pageId = document.body.dataset.page || "home";
const modulePages = new Set(["deviation-companion", "deviation-investigator", "capa", "sop-intelligence"]);
const legalPages = new Set(["privacy", "terms", "data-handling"]);

let page = <App />;

if (modulePages.has(pageId)) {
  page = <ModulePage moduleId={pageId} />;
} else if (legalPages.has(pageId)) {
  page = <LegalPage pageId={pageId} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
