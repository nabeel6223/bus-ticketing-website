import React from "react";
import { FaStar, FaClock, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus }) => {
  // Destructure the bus object properties
  const navigate = useNavigate();

  const {
    busId,
    operatorName,
    busName,
    rating,
    reviews,
    departureTime,
    arrivalTime,
    duration,
    fare,
    date,
    departureCity,
    destinationCity,
    availableSeats = 0,
  } = bus;

  return (
    <div className=" w-[calc(25%-24px)] bg-white p-6 mb-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
      {/* Header: Operator, Type & Ratings */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{busName}</h3>
          <p className="text-sm text-gray-500 mt-1">{operatorName}</p>
        </div>
        <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          <FaStar className="w-3 h-3 mr-1" />
          {rating}{" "}
        </div>
      </div>
      <p className="text-sm text-gray-500 flex items-center mb-1">
        <FaClock className="mr-1 w-3 h-3" /> {duration} ({availableSeats} seats)
      </p>
      <p className="text-sm text-gray-500 flex items-center mt-1">
        <FaCalendarAlt className="mr-1 w-3 h-3" /> {date}
      </p>
      {/* Timings, Duration, and Cities */}
      <div className="flex justify-between items-center text-center sm:text-left my-4">
        {/* 1. Departure Time and City */}
        <div className="flex-1">
          <p className="text-xl font-extrabold text-blue-600">
            {departureTime}
          </p>
          <p className="text-gray-600 font-medium mt-1">{departureCity}</p>
        </div>

        {/* 2. Duration and Journey Date */}
        <div className="flex-1 flex flex-col items-center mx-4">
          <FaArrowRight className="text-2xl text-orange-500 my-1" />
        </div>

        {/* 3. Arrival Time and City */}
        <div className="flex-1">
          <p className="text-xl font-extrabold text-blue-600">{arrivalTime}</p>
          <p className="text-gray-600 font-medium mt-1">{destinationCity}</p>
        </div>
      </div>

      {/* Fare and Action Button */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t gap-4 border-gray-100">
        <div>
          <p className="text-md text-gray-500 font-medium">Starting Fare</p>
          <p className="text-2xl font-extrabold text-red-600">₹ {fare}</p>
        </div>
        <button
          onClick={() => {
            navigate(`/details/${busId}`);
          }}
          className="bg-[#5965ff] text-white font-bold px-4 py-3 rounded-lg shadow-md  transition duration-200 tracking-wider"
        >
          View Seats
        </button>
      </div>
    </div>
  );
};

// // Example Usage (for demonstration)
// const App = () => {
//   const sampleBusData = {
//     operatorName: "VRL Premium Travels",
//     busType: "AC Sleeper (2+1) | Wi-Fi, Water Bottle",
//     rating: "4.5",
//     reviews: 1250,
//     departureTime: "22:30",
//     arrivalTime: "07:30",
//     duration: "9h 00m",
//     fare: "₹750",
//     date: "Sun, 15 Dec",
//     departureCity: "Mumbai",
//     destinationCity: "Pune",
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">Bus Search Results</h2>
//       <BusResultCard bus={sampleBusData} />
//       {/* Add more BusResultCard components here */}
//     </div>
//   );
// };

export default BusCard;
