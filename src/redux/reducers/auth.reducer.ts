import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateOTP } from "../../types/authtypes";

const initialState = {
  authenticated: false,
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: "",
  message: "",
};

const apiUrl = `https://rewardify.dotcod.in/api`;

export const generateOtp = createAsyncThunk(
  "login/getOTP",
  async ({ dialCode, contactNo }: generateOTP, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/v1/store-user/auth/generate-otp`,
        { dialCode, contactNo }
      );

      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      }
      localStorage.setItem(
        "deviceInfo",
        JSON.stringify({
          device: "Nexus Phone",
          app: "web",
          device_type: 2,
          os: "unknown",
          ip_address: "103.28.246.86",
          browser: "Chrome",
        })
      );

      return response.data;
    } catch (error: any) {
      //   console.log("Error Response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate OTP"
      );
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "login/verifyOTP",
  async ({}: any, { rejectWithValue }) => {
    try {
      // Retrieve device info from localStorage
      const deviceInfo = localStorage.getItem("deviceInfo");

      const headers = {
        device: deviceInfo ? deviceInfo : "{}",
      };

      const response = await axios.post(
        `${apiUrl}/v1/store-user/auth/login`,
        {
          dialCode: 91,
          contactNo: "7777777777",
          type: 1,
          otp: 1234,
        },

        { headers }
      );

      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      }
      console.log;
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate OTP"
      );
    }
  }
);
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const token = localStorage.getItem("refreshToken");

  if (!token) {
    throw new Error("No refresh token found");
  }

  const response = await axios.post(
    `${apiUrl}/v1/store-user/auth/refreshToken/`,
    {},
    {
      headers: {
        "refresh-token": `Bearer ${token}`,
      },
    }
  );

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.authenticated = false;
      state.loading = false;
      state.updating = false;
      state.updateSuccess = false;
      state.errorMessage = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOtp.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.message = "";
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;

        state.message = action.payload?.message || "OTP sent successfully";
        state.errorMessage = "";
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.loading = false;

        state.errorMessage = action.payload as string;
        state.message = "";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.message = "";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true; // Set authenticated to true on success
        state.message = action.payload?.message || "OTP verified successfully";
        state.errorMessage = "";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false; // Ensure authentication fails if verification fails
        state.errorMessage = action.payload as string;
        state.message = "";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
