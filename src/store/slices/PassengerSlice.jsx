import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactDetails: {},
  busId: null,
  passengers: [],
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    setContactDetails(state, action) {
      console.log(state);
      state.contactDetails = action.payload ?? {};
    },
    setPassengerDetails(state, action) {
      state.passengers = action.payload ?? [];
    },
  },
});

export const { setContactDetails, setPassengerDetails } =
  passengerSlice.actions;
export default passengerSlice.reducer;
