import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  store: [],
  payments: [],
  settlements: [],
  orders: [],
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: "",
  message: "",
  profile: [],
};

const deviceDetails = localStorage.getItem("deviceInfo");

const apiUrl = `https://rewardify.dotcod.in/api`;
// console.log("reducer token", token);
export const getStore = createAsyncThunk("dashboard/getStore", async () => {
  const token = localStorage.getItem("refreshToken");
  const response = await axios.get(`${apiUrl}/v1/store-user/store`, {
    headers: {
      device: deviceDetails,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getPayments = createAsyncThunk(
  "dashboard/getPaymentDetails",
  async () => {
    const token = localStorage.getItem("refreshToken");
    const response = await axios.post(
      `${apiUrl}/v1/store-user/payment/list`,
      {},
      {
        headers: {
          device: deviceDetails,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getProfile = createAsyncThunk("dashboard/getProfile", async () => {
  const token = localStorage.getItem("refreshToken");
  const response = await axios.get(`${apiUrl}/v1/store-user/store/user/`, {
    headers: {
      device: deviceDetails,
      Authorization: token,
    },
  });
  return response.data;
});
export const getSettlements = createAsyncThunk(
  "dashboard/getSettlements",
  async () => {
    const token = localStorage.getItem("refreshToken");
    const response = await axios.post(
      `${apiUrl}/v1/store-user/settlements/list`,
      {},
      {
        headers: {
          device: deviceDetails,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getOrders = createAsyncThunk(
  "dashboard/getOrderDetails",
  async () => {
    const token = localStorage.getItem("refreshToken");
    const response = await axios.post(
      `${apiUrl}/v1/store-user/order/list`,
      {},
      {
        headers: {
          device: deviceDetails,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getStore
    builder.addCase(getStore.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getStore.fulfilled, (state, action) => {
      state.loading = false;
      state.store = action.payload;
    });
    builder.addCase(getStore.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });

    // Handle getPayments
    builder.addCase(getPayments.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
    builder.addCase(getPayments.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });

    // Handle getSettlements
    builder.addCase(getSettlements.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getSettlements.fulfilled, (state, action) => {
      state.loading = false;
      state.settlements = action.payload;
    });
    builder.addCase(getSettlements.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });

    // Handle getOrders
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });
    //getprofile
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });
  },
});

export default dashboardSlice.reducer;
