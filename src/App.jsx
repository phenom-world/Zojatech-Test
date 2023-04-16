import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/Login";
import OrganizationList from "./pages/OrganizationList";
import SignUp from "./pages/SignUp";
import { persistor } from "./redux/store";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<SignUp />} path="/regster" />
        <Route element={<OrganizationList />} path="/organization" />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </PersistGate>
  );
}

// temporary not found page holder
const NotFound = () => {
  return (
    <>
      {" "}
      <div>You&apos;ve entered a black hole, find your way out</div>
    </>
  );
};
export default App;
