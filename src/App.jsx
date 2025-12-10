import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./home/home";
import { Route, Routes } from "react-router-dom";
import List from "./list/list";
import Header from "./Header/Header.jsx";
import BusDetails from "./Details/BusDetails.jsx";
import PassengerInfo from "./Booking/PassengerInfo.jsx";
import ConfirmPage from "./Booking/ConfirmPage.jsx";
import Footer from "./Footer/Footer.jsx";
import ETicketComponent from "./Booking/Ticket.jsx";

function App() {
  return (
    <>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<List />} />
          <Route path="/details/:id" element={<BusDetails />} />
          <Route path="/form/:id" element={<PassengerInfo />} />
          <Route path="/confirm/:id" element={<ConfirmPage />} />
          <Route
            path="/ticket/:id"
            element={
              <ETicketComponent
                bookingDetails={{
                  ticketId: "HO-54321098",
                  bookingDate: "Wednesday, 18 December 2025",
                  operatorName: "VRL Premium Travels",
                  busType: "AC Sleeper (2+1)",
                  rating: "4.5",
                  departureTime: "22:30",
                  arrivalTime: "07:30",
                  duration: "9h 00m",
                  departureCity: "Mumbai",
                  destinationCity: "Pune",
                  boardingPoint: "Dadar TT (Near Plaza Cinema)",
                  droppingPoint: "Wakad Bridge, Hinjewadi",
                  passengerName: "Aarav Sharma",
                  gender: "Male",
                  age: 32,
                  seatNumbers: ["S12", "S13"],
                  fareSummary: {
                    baseFare: 1200.0,
                    tax: 50.0,
                    discount: 100.0,
                    total: 1150.0,
                  },
                  paymentStatus: "Confirmed",
                }}
              />
            }
          />
          {/* <Route path="*" element={<Navigate to="/properties" replace />} /> */}
        </Routes>
        <Footer />
      </Fragment>
    </>
  );
}

export default App;
