import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainPage from "./component/MainPage";
import PageWrapper from "./component/PageWrapper";

ReactDOM.render(
  <React.StrictMode>
    <PageWrapper>
      <MainPage />
    </PageWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
