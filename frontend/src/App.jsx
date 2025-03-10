
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerForm from "./components/CustomerForm";
import EditCustomer from "./components/EditCustomer";
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<CustomerForm />} />
        <Route path="/list" element={<List />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
       
     
      </Routes>
    </Router>
  );
};

export default App;