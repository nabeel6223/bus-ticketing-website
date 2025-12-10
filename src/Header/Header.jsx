import React from "react";
import {
  FaBusAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSignInAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="/"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          <img src="/images/hop_on_logo_2.png" alt="" className="w-40" />
        </a>
        <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <a
            href="/"
            className="hover:text-blue-600 transition duration-150 border-b-2 border-blue-600"
          >
            Home
          </a>
          <a
            href="/search"
            className="hover:text-blue-600 transition duration-150 border-b-2 border-transparent hover:border-blue-600"
          >
            Search Buses
          </a>
          <a
            onClick={() => {
              navigate("/");
              props.ref.current?.scrollIntoView({ behavior: "smooth" });
            }}
            href="#"
            className="hover:text-blue-600 transition duration-150 border-b-2 border-transparent hover:border-blue-600"
          >
            Offers
          </a>
          {/* <a
            href="#"
            className="hover:text-blue-600 transition duration-150 border-b-2 border-transparent hover:border-blue-600"
          >
            Help
          </a> */}
        </nav>
        {/* <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          <FaSignInAlt className="mr-2" /> Login / Sign Up
        </button> */}
      </div>
    </header>
  );
}

export default Header;
