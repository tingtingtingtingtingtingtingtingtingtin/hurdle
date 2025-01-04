import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/layout.jsx";
import "./components/layout.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>,
);
