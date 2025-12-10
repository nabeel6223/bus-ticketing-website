import React, { useEffect, useState } from "react";
import BusCard from "./components/busCard.jsx";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../store/slices/BusListSlice.jsx";

function List() {
  const basePath = import.meta.env.VITE_API_BASE_PATH;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState([]);
  const { fromCity, toCity, date } = useSelector((state) => state.busList);
  const [from, setFrom] = useState(fromCity);
  const [to, setTo] = useState(toCity);
  const [travelDate, setTravelDate] = useState(date);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      setSearchParams({
        fromCity: from,
        toCity: to,
        date: travelDate,
      })
    );
    // navigate("/list");
    // You can now use these values for API call or navigation
  };

  useEffect(() => {
    const getBusList = async () => {
      setLoading(true);
      axios
        .get(
          `${basePath}/api/buses?from=${fromCity}&to=${toCity}&date=${date}`,
          {
            headers: {
              apikey: apiKey,
            },
          }
        )
        .then((resp) => {
          setBuses(resp.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getBusList();
  }, [fromCity, toCity, date]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <section
        className="relative h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/banner_2.png)",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute mt-50 inset-0 flex flex-col items-center justify-center p-4">
          {/* Search Widget Container */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Input: From City */}
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="From City"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className=" bg-white w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Input: To City */}
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="To City"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className=" bg-white w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Input: Date */}
                <div className="relative flex-1">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className=" bg-white w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-500"
                  />
                </div>

                {/* Button: Search */}
                <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200 shadow-md">
                  Search Buses
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-20 sm:my-30 my-50">
        {buses.length > 0 ? (
          buses.map((item) => {
            return (
              <BusCard
                bus={{
                  busId: item["id"],
                  operatorName: item["operator"],
                  busName: item["name"],
                  rating: item["rating"],
                  departureTime: item["departureTime"],
                  arrivalTime: item["arrivalTime"],
                  duration: item["duration"],
                  fare: item["fare"],
                  date: item["date"],
                  departureCity: item["fromCity"],
                  destinationCity: item["toCity"],
                  availableSeats: item["availableSeats"],
                }}
              />
            );
          })
        ) : (
          <>
            <img
              src="/images/no_bus_found_illustration.png"
              alt=""
              className="object-center mx-auto h-60 col-span-4"
            />
          </>
        )}
      </div>
    </>
  );
}

export default List;
