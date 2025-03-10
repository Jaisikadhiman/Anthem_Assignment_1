import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const Base_Url = "https://anthem-assignment-1.onrender.com/";
export const addCustomer = createAsyncThunk(
  "customer/addcustomer",
  async (values) => {
    console.log("slice user data::", values);

    const customer = await axios.post(
      `${Base_Url}/api/customer/create`,
      values
    );
    console.log(customer)
    if (customer.status === 200) {
        console.log(200);
        toast.success("Customer Added Successfully");
      }
    return customer.data;
  }
);
export const getCustomers = createAsyncThunk(
  "/customer/getcustomers",
  async () => {
    console.log("hiiiiiiiiiiii");
    const data = await axios.get(`${Base_Url}/api/customer/getall`);
    console.log(data.data);
    return data.data;
  }
);

export const getCustomer = createAsyncThunk(
  "/customer/getcustomer",
  async (id) => {
    console.log(id);
    const data = await axios.get(`${Base_Url}/api/customer/getOne/${id}`);
    console.log("customer:::::::::", data);
    return data.data;
  }
);
export const updateCustomer = createAsyncThunk(
  "/customer/updatecustomer",
  async ({ id, ...data }) => {
    console.log("id", id);
    console.log("data", data);
    const ans = await axios.put(`${Base_Url}/api/customer/update/${id}`, data);
    console.log(ans);
    if (ans.status === 200) {
      console.log(200);
      toast.success("Customer Updated Successfully");
    }
    return ans.data.data;
  }
);
export const deleteCustomer = createAsyncThunk(
  "/customer/deletecustomer",
  async (id) => {
    console.log("id,", id);
    const ans = await axios.delete(`${Base_Url}/api/customer/remove/${id}`);
    console.log(ans);
   
    return ans;
  }
);

const initialState = {
  customers: [],
  error: null,
  loading: false,
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      })
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      })
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload._id
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      }),
});

export default customerSlice.reducer;
