import React, { useState } from "react";
import {
  FaBusAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSignInAlt,
  FaArrowRight,
  FaChevronRight,
  FaSyncAlt,
  FaClock,
  FaCloudversify,
  FaKey,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import { FaHelmetSafety, FaShield } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSearchParams } from "../store/slices/BusListSlice";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      setSearchParams({
        fromCity: fromCity,
        toCity: toCity,
        date: travelDate,
      })
    );
    navigate("/search");
    // You can now use these values for API call or navigation
  };
  // Sample data for demonstration
  const popularRoutes = [
    { from: "Mumbai", to: "Pune", price: "₹450" },
    { from: "Bangalore", to: "Chennai", price: "₹600" },
    { from: "Delhi", to: "Manali", price: "₹950" },
    { from: "Hyderabad", to: "Vijayawada", price: "₹500" },
  ];

  const trustedOperators = [
    {
      name: "VRL Travels",
      logoUrl: "/public/images/intrcity_smartbus_logo.png",
      price: "₹450",
    }, // Replace with actual paths
    {
      name: "SRS Travels",
      logoUrl: "/public/images/nuelogo.png",
      price: "₹650",
    },
    {
      name: "Orange Tours",
      logoUrl: "/public/images/ss-logo.png",
      price: "₹550",
    },
    {
      name: "KPN Travels",
      logoUrl: "/public/images/zingbus-company-logo.png",
      price: "₹850",
    },
  ];

  return (
    <div>
      {/* --- 1. Header/Navigation --- */}

      {/* --- 2. Hero Section & Search Bar --- */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero_image.png)",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Search Widget Container */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <h1 className="text-2xl sm:text-5xl font-bold text-black mb-8 text-left drop-shadow-lg mb-20">
              Your Next Journey <br /> Starts Here.
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Input: From City */}
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="From City"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className=" bg-white w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Input: To City */}
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="To City"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
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

      {/* --- 3. Popular Routes --- */}
      <section className="py-16 bg-white mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-700  mb-3">
                  {route.from}{" "}
                  <div className="flex items-center justify-start text-center">
                    <FaChevronRight className=" text-sm text-grey-500" />{" "}
                    <span className="text-md font-bold text-gray-500 mx-2">
                      {route.to}
                    </span>
                  </div>
                </h3>
                <br />
                <p className="text-sm font-bold text-gray-500">Starting From</p>
                <p className="text-2xl font-bold text-gray-700 mb-4">
                  {route.price}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    dispatch(
                      setSearchParams({
                        fromCity: route.from,
                        toCity: route.to,
                        // date: travelDate,
                      })
                    );
                    navigate("/search");
                  }}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. Trusted Operators --- */}
      <section className="py-16 bg-white mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            Trusted Operators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustedOperators.map((opr, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="my-10 h-8 flex justify-center">
                  <img src={opr.logoUrl} className="" alt="" />
                </div>
                {/* <h3 className="text-xl font-semibold text-gray-700  mb-3">
                  {route.from}{" "}
                  <div className="flex items-center justify-start text-center">
                    <FaChevronRight className=" text-sm text-grey-500" />{" "}
                    <span className="text-md font-bold text-gray-500 mx-2">
                      {route.to}
                    </span>
                  </div>
                </h3> */}
                <br />
                <p className="text-sm font-bold text-gray-500">Starting From</p>
                <p className="text-2xl font-bold text-gray-700 mb-4">
                  {opr.price}
                </p>
                <div className="flex gap-2 mb-4">
                  <FaStar className="  text-yellow-500 text-sm" />
                  <FaStar className="  text-yellow-500 text-sm" />
                  <FaStar className="  text-yellow-500 text-sm" />
                  <FaStar className="  text-yellow-500 text-sm" />
                  <FaStar className="  text-gray-300 text-sm" />
                </div>
                {/* <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 font-medium">
                  View Buses
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="my-10 h-8 flex justify-center align-center">
                <FaClock className="  text-grey-700 text-3xl" />
                <p className="mx-4 text-xl font-bold text-gray-700">
                  Real Time Seat Availability
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="my-10 h-8 flex justify-center align-center">
                <FaShield className=" text-3xl text-grey-500" />
                <p className="mx-4 text-xl font-bold text-gray-700">
                  Safe & Verified Operators
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="my-10 h-8 flex justify-center align-center">
                <FaKey className=" text-3xl text-grey-500 " />
                <p className="mx-4 text-xl font-bold text-gray-700">
                  Secure Payments
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="my-10 h-8 flex justify-center align-center">
                <FaPhone className=" text-3xl text-grey-500" />
                <p className="mx-4 text-xl font-bold text-gray-700">
                  24/7 Customer Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={props.ref}
        className="py-16 bg-white mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 2xl:mx-56 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            Offers & Discounts
          </h2>
          <img src="/images/discount_banner.png" alt="" />
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 ">
            Customer Reviews
          </h2>
          <div className="mx-4">
            <p className="text-xl mb-2 font-bold text-gray-700">Amit Tiwari</p>
            <div className="flex gap-2 mb-4">
              <FaStar className="  text-yellow-500 text-sm" />
              <FaStar className="  text-yellow-500 text-sm" />
              <FaStar className="  text-yellow-500 text-sm" />
              <FaStar className="  text-yellow-500 text-sm" />
              <FaStar className="  text-yellow-500 text-sm" />
            </div>
            <p className="text-xl mb-4 font-medium text-gray-700">
              I have a great experience on Hop On. Appreciate the service and
              buses were comfortable with all the mentioned amenities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
