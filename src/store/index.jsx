import { configureStore } from "@reduxjs/toolkit";
import BusListSlice from "./slices/BusListSlice";
import PassengerListSlice from "./slices/PassengerSlice";

const store = configureStore({
  reducer: {
    passenger: PassengerListSlice,
    // wallet: WalletSlice,
    busList: BusListSlice,
    // cart: CartSlice,
  },
});

export default store;
