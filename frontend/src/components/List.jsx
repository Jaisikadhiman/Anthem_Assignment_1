import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteCustomer, getCustomers } from "../slice/customerSlice";
import Swal from "sweetalert2"
const List = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  console.log(customers);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCustomer(id));
       
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    dispatch(getCustomers());
  };
  return (
    <>
      <div>
        <h1>Listtttt</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact Numer</th>
            <th scope="col">Status</th>
            <th scope="col">Membership Id</th>
            <th scope="col" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers?.map((item) => (
              <tr>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.contactNumber}</td>
                <td>{item.status}</td>
                <td>{item.membershipID}</td>

                <td>
                  {" "}
                  <Link to={`/edit/${item._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <MdDelete onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
