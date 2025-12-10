import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //search
  fromCity: "",
  toCity: "",
  date: "",
  selectedBusId: null,
  selectedBusSeats: [],
  // showSearchResults1: false,
  // // property state
  // isLoading: false,
  // currentPageProperties: [],
  // states: [],
  // cities: [],
  // localities: [],
  // propertyTypes: [],
  // banks: [],
  // count: 0,
  // // filter
  // selectedStates: [],
  // selectedCities: [],
  // selectedLocality: [],
  // selectedPrice: [],
  // selectedPropertyType: [],
  // selectedBanks: [],
  // trendingProperty: false,
  // auctionStartDate: null,
  // auctionEndDate: null,
  // applicationStartDate: null,
  // applicationEndDate: null,
  // minRange: 0,
  // maxRange: 100,
  // minValue: 0,
  // maxValue: 100,
  // mapToggle: false,
  // selectedSortBy: "",
  // applyFilter: false,
  // curated: true,
  // searchParams: { sortBy: "application_date_desc", type: "published" },
  // // pagination
  // page: 1,
  // totalPages: 0,
  // filterApplied: false,
  // getAutoSuggestions : [],
};

const busListSlice = createSlice({
  name: "busList",
  initialState,
  reducers: {
    deleteParam: (state, action) => {
      const key = action.payload;
      delete state.searchParams[key];
    },
    addParam: (state, action) => {
      const { key, value } = action.payload;
      if (state.searchParams[key] !== undefined) {
        state.searchParams[key] += `,${value}`;
      } else {
        state.searchParams[key] = value;
      }
    },
    setSearchParams(state, action) {
      state.fromCity = action.payload.fromCity ?? "";
      state.toCity = action.payload.toCity ?? "";
      state.date = action.payload.date ?? "";
      // state.page = action.payload.page || 1;
      // state.count = action.payload.count || 0;
      // state.totalPages = action.payload.totalPages || 0;
    },
    setSelectedBusId(state, action) {
      state.selectedBusId = action.payload.id ?? null;
    },
    setSelectedBusSeats(state, action) {
      state.selectedBusSeats = action.payload.seats ?? [];
    },
    clearFilters(state, action) {
      //   state.searchParams = {
      //     query: "",
      //     type: "published",
      //   };
      //   state.curated = true;
      //   state.selectedBanks = [];
      //   state.selectedCities = [];
      //   state.selectedLocality = [];
      //   state.selectedPropertyType = [];
      //   state.selectedStates = [];
      //   state.minValue = state.minRange;
      //   state.maxValue = state.maxRange;
      //   state.trendingProperty = false;
      //   state.applicationStartDate = null;
      //   state.applicationEndDate = null;
      //   state.auctionStartDate = null;
      //   state.auctionEndDate = null;
      //   state.mapToggle = false;
      //   state.selectedSortBy = "";
      //   state.searchInput = "";
      //   state.searchInput1 = "";
    },
  },
});

export const {
  setSearchParams,
  clearFilters,
  setSelectedBusId,
  setSelectedBusSeats,
} = busListSlice.actions;
export default busListSlice.reducer;

export { initialState };
