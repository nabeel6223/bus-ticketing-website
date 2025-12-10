import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBus,
  FaTicketAlt,
  FaUser,
  FaIdCard,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaQrcode,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const ETicketComponent = ({ bookingDetails }) => {
  // Destructure booking details for easy access
  const {
    ticketId,
    bookingDate,
    operatorName,
    busType,
    rating,
    departureTime,
    arrivalTime,
    duration,
    departureCity,
    destinationCity,
    boardingPoint,
    droppingPoint,
    passengerName,
    gender,
    age,
    seatNumbers,
    fareSummary, // { baseFare: 1200, tax: 50, discount: 100, total: 1150 }
    paymentStatus,
  } = bookingDetails;

  const basePath = import.meta.env.VITE_API_BASE_PATH;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Scrolls to the top smoothly
    // Or, for an instant jump:
    // window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const getBusDetails = async () => {
      setLoading(true);
      axios
        .get(`${basePath}/api/booking?id=${id}`, {
          headers: {
            apikey: apiKey,
          },
        })
        .then((resp) => {
          setData(resp.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getBusDetails();
  }, []);

  if (loading) return <Loader />;
  else if (data != null)
    return (
      <div className=" bg-white rounded-2xl shadow-2xl overflow-hidden my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56">
        {/* Ticket Header & Status */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaTicketAlt className="text-3xl mr-3 text-orange-400" />
            <h2 className="text-2xl font-extrabold">E-Ticket Confirmation</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium opacity-80">Booking ID:</p>
            <p className="text-xl font-bold text-orange-400">{data["pnr"]}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Trip Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-8 pr-4 lg:border-gray-200">
            {/* Bus & Route Info */}
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaBus className="mr-2 text-blue-600" /> Journey Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Operator</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {data?.["busData"]?.["operator"]}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Bus Name</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {data?.["busData"]?.["name"]}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline & City Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {data?.["busData"]?.["departureTime"]}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {data?.["busData"]?.["fromCity"]}
                  </p>
                </div>
                <div className="flex flex-col items-center mx-6">
                  <FaArrowRight className="text-orange-500 text-xl mb-1" />
                  <p className="text-sm text-gray-500">
                    {data?.["busData"]?.["duration"]}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {data?.["busData"]?.["arrivalTime"]}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {data?.["busData"]?.["toCity"]}
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger & Seat Details */}
            <div className="pt-4 border-t">
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaUser className="mr-2 text-blue-600" /> Passenger & Seat Info
              </h3>
              {data?.["passengerDetails"]?.map((item, index) => {
                return (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Passenger Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {item["name"]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Seats Booked
                      </p>
                      <p className="text-lg font-semibold text-red-600">
                        S {data?.["seats"]?.[index]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Gender / Age
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {item["gender"]} / {item["age"]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Payment and QR Code (1/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            {/* Date and Booking Info */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500 flex items-center mb-1">
                <FaCalendarAlt className="mr-2 text-orange-500" /> Travel Date
              </p>
              <p className="text-xl font-bold text-orange-600">
                {new Date(data["bookingDate"]).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-gray-500 flex items-center mt-3 mb-1">
                <FaClock className="mr-2 text-orange-500" /> Booked On
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {new Date(data["bookingDate"]).toLocaleDateString()} at{" "}
                {new Date(data["bookingDate"]).toLocaleTimeString()}
              </p>
            </div>

            {/* Fare Summary */}
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Fare Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <p>Base Fare</p>
                  <p>
                    ₹{data?.["busData"]?.["fare"] * data?.["seats"]?.length}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Taxes & Fees</p>
                  <p>
                    + ₹
                    {(
                      0.05 *
                      data?.["busData"]?.["fare"] *
                      data?.["seats"]?.length
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between pt-3 border-t font-extrabold text-lg text-green-600">
                  <p>Total Paid</p>
                  <p>
                    ₹
                    {(
                      1.05 *
                      data?.["busData"]?.["fare"] *
                      data?.["seats"]?.length
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code and Status */}
            <div className="text-center p-4">
              <div className="inline-block bg-gray-200 p-4 rounded-lg">
                {/* Placeholder for QR Code image */}
                <FaQrcode className="text-7xl text-gray-700 mx-auto" />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Scan this code for quick check-in.
              </p>
              <p
                className={`mt-3 text-xl font-bold ${
                  paymentStatus === "Confirmed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Footer / Important Notes */}
        <div className="bg-gray-100 p-4 text-xs text-gray-600 text-center">
          Please carry a valid photo ID proof along with this e-ticket. Bus
          departs 15 minutes after the scheduled time.
        </div>
      </div>
    );
};

// Example Data to run the component
const sampleBookingDetails = {
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
  fareSummary: { baseFare: 1200.0, tax: 50.0, discount: 100.0, total: 1150.0 },
  paymentStatus: "Confirmed",
};

// Example App usage (Uncomment to test)
// const AppWrapper = () => <ETicketComponent bookingDetails={sampleBookingDetails} />;
// export default AppWrapper;

export default ETicketComponent;
