import { configureStore } from "@reduxjs/toolkit";
import BusListSlice from "./slices/BusListSlice.jsx";
import PassengerListSlice from "./slices/PassengerSlice.jsx";

const store = configureStore({
  reducer: {
    passenger: PassengerListSlice,
    // wallet: WalletSlice,
    busList: BusListSlice,
    // cart: CartSlice,
  },
});

export default store;
