import React, { useEffect, useState } from "react";
import BusCard2 from "../list/components/BusCard2.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { useSelector } from "react-redux";

function ConfirmPage() {
  const seats = 6;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { selectedBusSeats } = useSelector((state) => state.busList);
  const { contactDetails, passengers } = useSelector(
    (state) => state.passenger
  );
  console.log(contactDetails);
  const basePath = import.meta.env.VITE_API_BASE_PATH;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [bus, setBus] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // // 1️Redirect user if the page was refreshed (browser reload)
  // useEffect(() => {
  //   const navEntry = performance.getEntriesByType("navigation")[0];

  //   if (navEntry?.type === "reload") {
  //     navigate(`/details/${id}`);
  //   }
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // if (isDirty) {
      event.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
    };
    // };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const getBusDetails = async () => {
      setLoading(true);
      axios
        .get(`${basePath}/api/bus?id=${id}`, {
          headers: {
            apikey: apiKey,
          },
        })
        .then((resp) => {
          setBus(resp.data.data[0]);
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

  const submitData = async (data) => {
    try {
      let resp = await axios.post(
        `${basePath}/api/booking`,
        {
          busId: id,
          name: contactDetails.name,
          email: contactDetails.email,
          mobile: contactDetails.mobile,
          passengers: passengers,
          seats: selectedBusSeats,
        },
        {
          headers: {
            apikey: apiKey,
          },
        }
      );
      if (!resp.data["error"]) {
        navigate(`/ticket/${resp.data.bookingId}`);
      }
      console.log(resp);
    } catch {}
  };

  if (loading) return <Loader />;
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56 mt-40">
      <h2 className="text-3xl font-bold text-center mt-10 text-gray-800 ">
        Review Booking
      </h2>
      <div className="flex-column align-center">
        <BusCard2
          bus={{
            operatorName: bus["operator"],
            busName: bus["name"],
            rating: bus["rating"],
            // reviews: 1250,
            departureTime: bus["departureTime"],
            arrivalTime: bus["arrivalTime"],
            duration: bus["duration"],
            fare: bus["fare"],
            date: bus["date"],
            departureCity: bus["fromCity"],
            destinationCity: bus["toCity"],
            availableSeats: bus["availableSeats"],
          }}
        />
        <div className=" gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl rounded-lg">
            <div className="text-xl p-2 font-medium text-gray-700 mb-4 bg-gray-300 ">
              Fare Summary
            </div>
            {selectedBusSeats.map((item, index) => {
              return (
                <div className="flex-row justify-space p-2">
                  <div className="text-sm font-bold text-gray-700 ">
                    Seat {item}
                  </div>
                  <div className="text-sm font-bold text-gray-700 ">
                    ₹ {bus["fare"]}
                  </div>
                </div>
              );
            })}

            <div className="flex-row justify-space p-2">
              <div className="text-sm font-bold text-gray-700 ">GST(5%)</div>
              <div className="text-sm font-bold text-gray-700 ">
                ₹{" "}
                {parseFloat(
                  0.05 * selectedBusSeats.length * bus["fare"]
                ).toFixed(2)}
              </div>
            </div>
            <div className="border-1 border-gray-300 m-2 rounded-sm"></div>

            <div className="flex-row justify-space p-4">
              <div className="text-md font-bold text-gray-700 mb-4">
                Total Payable
              </div>
              <div className="text-md font-bold text-gray-700 mb-4">
                ₹{" "}
                {(
                  selectedBusSeats.length * bus.fare +
                  0.05 * selectedBusSeats.length * bus.fare
                ).toFixed(2)}
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl rounded-lg">
            <div className="text-xl p-2 font-medium text-gray-700 mb-4 bg-gray-300 ">
              Contact Details
            </div>
            <div className="flex-row justify-space p-2 gap-2">
              <div className="text-sm font-bold text-gray-700 ">Name</div>
              <div className="text-sm font-bold text-gray-700 ">
                {contactDetails["name"]}
              </div>
            </div>
            <div className="flex-row justify-space p-2 gap-2">
              <div className="text-sm font-bold text-gray-700 ">Mobile</div>
              <div className="text-sm font-bold text-gray-700 ">
                {contactDetails["mobile"]}
              </div>
            </div>
            <div className="flex-row justify-space p-2 gap-2">
              <div className="text-sm font-bold text-gray-700 ">Email</div>
              <div className="text-sm font-bold text-gray-700 ">
                {contactDetails["email"]}
              </div>
            </div>
          </div>
          <div className="  bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl rounded-lg">
            <div className="text-xl p-2 font-medium text-gray-700 mb-4 bg-gray-300 ">
              Passenger(s)
            </div>
            {passengers.map((item, index) => {
              return (
                <div className="flex-row justify-space p-2">
                  <div className="text-sm font-bold text-gray-700 ">
                    Seat {selectedBusSeats[index]}
                  </div>
                  <div className="text-sm font-bold text-gray-700 ">
                    {item["name"]} {item["age"]}({item["gender"]})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={submitData}
          className="mt-10 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default ConfirmPage;
