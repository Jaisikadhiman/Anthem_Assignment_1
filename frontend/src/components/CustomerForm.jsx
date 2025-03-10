import "./customerform.css"
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCustomer } from "../slice/customerSlice";

const CustomerForm = () => {
  const [memberships, setMemberships] = useState([]);
  const dispatch = useDispatch();
  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    status: "Gold",
    membershipID: "",
  };

  // Validation schema using Yup
  const customerSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    status: Yup.string()
      .oneOf(["Gold", "Diamond"])
      .required("Status is required"),
    membershipID: Yup.string().required("Membership is required"),
  });

  // Fetch memberships from backend
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const resp = await axios.get(
          "https://anthem-assignment-1.onrender.com/api/membership/getAll"
        );
        setMemberships(resp.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };
    fetchMemberships();
  }, []);

  // Formik hook
  const formik = useFormik({
    initialValues,
    validationSchema: customerSchema,
    onSubmit: async (values, { resetForm }) => {

      try {
        console.log(values)
        dispatch(addCustomer(values));
        resetForm();
      } catch (error) {
        console.error("Error saving customer:", error);
      }
    },
  });

  return (
    <section className="vh-100 bg-light container-lg">
      <div className="container-lg h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-4">
                  Create New Customer
                </h2>

                <form onSubmit={formik.handleSubmit}>
                  {/* First Name */}
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={formik.values.firstName}
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      //   {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-danger">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={formik.values.lastName}
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-danger">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={formik.values.email}
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      className="form-control"
                      value={formik.values.contactNumber}
                      name="contactNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.contactNumber &&
                      formik.errors.contactNumber && (
                        <div className="text-danger">
                          {formik.errors.contactNumber}
                        </div>
                      )}
                  </div>

                  {/* Membership Dropdown */}
                  <div className="mb-3">
                    <label htmlFor="membershipID" className="form-label">
                      Select Membership
                    </label>
                    <select
                      id="membershipID"
                      className="form-select"
                      value={formik.values.membershipID}
                      name="membershipID"
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        const selectedMembership = memberships.find(
                          (m) => m._id === e.target.value
                        );
                        formik.setFieldValue("membershipID", e.target.value);
                        formik.setFieldValue(
                          "status",
                          selectedMembership ? selectedMembership.name : ""
                        );
                      }}
                    >
                      <option value="">Select Membership</option>
                      {memberships.map((membership) => (
                        <option key={membership._id} value={membership._id}>
                          {membership.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.membershipID &&
                      formik.errors.membershipID && (
                        <div className="text-danger">
                          {formik.errors.membershipID}
                        </div>
                      )}
                  </div>
                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg">
                      Add Customer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerForm;
