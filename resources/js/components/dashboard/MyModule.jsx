import React from "react";
import Home from "./Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyModule() {
  return (
    <div style={{ backgroundColor: "lightcyan" }}>
        <ToastContainer />
      <Home />
    </div>
  );
}
