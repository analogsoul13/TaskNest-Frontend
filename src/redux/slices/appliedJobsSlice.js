import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApplicationsApi } from "../../services/allApis";

export const fetchAppliedJobs = createAsyncThunk(
  'appliedJobs/fetch',
  async (token, thunkAPI) => {
    try {
      // Build headers correctly here
      const headers = {
        Authorization: `Bearer ${token}`
      };

      const response = await getApplicationsApi(headers);
      console.log('API response:', response);
      console.log('API response.data:', response.data);
      return response.data; // contains full job application info
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState: {
    jobs: [],             // full application data
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
         console.log("Applied jobs fetched:", action.payload);
        state.jobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch applied jobs!';
      });
  }
});

export default appliedJobsSlice.reducer;
