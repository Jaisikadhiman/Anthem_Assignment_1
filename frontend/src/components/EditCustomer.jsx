import "./customerform.css"
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, updateCustomer } from "../slice/customerSlice";
import { useParams } from "react-router-dom";
import axios from "axios"

const EditCustomer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const customer = useSelector((state) => state.customers.customers); // Find customer by ID
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    dispatch(getCustomer(id)); // Fetch customer data
  }, [dispatch, id]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8080/api/membership/getAll"
        );
        console.log(resp)
        setMemberships(resp.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };
    fetchMemberships();
  }, []);

  useEffect(() => {
    if (customer) {
      formik.setValues({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        contactNumber: customer.contactNumber || "",
        status: customer.status || "Gold",
        membershipID: customer.membershipID || "",
      });
    }
  }, [customer]); // Set form values when customer data is available

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

  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      status: "Gold",
      membershipID: "",
    },
    enableReinitialize: true, // Allow reinitializing when customer data is available
    validationSchema: customerSchema,
    onSubmit: async (values) => {
      try {
        console.log("Updated values:", values);
        dispatch(updateCustomer({ id, ...values })); // Send ID along with updated values
      } catch (error) {
        console.error("Error updating customer:", error);
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
                  Edit Customer
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
                      {...formik.getFieldProps("firstName")}
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
                      {...formik.getFieldProps("lastName")}
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
                      {...formik.getFieldProps("email")}
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
                      {...formik.getFieldProps("contactNumber")}
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
                      {...formik.getFieldProps("membershipID")}
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
                      Update Customer
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

export default EditCustomer;
