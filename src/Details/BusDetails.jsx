import React, { useEffect, useState } from "react";
import BusCard from "../list/components/busCard";
import BusCard2 from "../list/components/BusCard2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBusId,
  setSelectedBusSeats,
} from "../store/slices/BusListSlice";

function BusDetails() {
  const seats = 6;
  const { selectedBusSeats } = useSelector((state) => state.busList);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const basePath = import.meta.env.VITE_API_BASE_PATH;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [bus, setBus] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookedSeats = [4, 9, 1, 10];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Scrolls to the top smoothly
    // Or, for an instant jump:
    // window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

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

  useEffect(() => {
    setSelectedSeats(selectedBusSeats);
    console.log(selectedBusSeats);
  }, [selectedBusSeats]);

  return (
    <div className="width-100 ml-40 mr-40 mt-20">
      <div className="flex-row width-100 padding-20 gap-20 ">
        <div className="seat-selection flex-column gap-4 bg-gray-200 p-10 rounded-3xl">
          {Array.from({ length: seats }).map((item, index) => {
            return (
              <div className="flex-row gap-20">
                <div className="flex-column">
                  <div
                    onClick={() => {
                      if (bookedSeats.includes(3 * (index + 1) - 2)) return;
                      if (!selectedSeats.includes(3 * (index + 1) - 2)) {
                        setSelectedSeats((prev) => [
                          ...prev,
                          3 * (index + 1) - 2,
                        ]);
                      } else {
                        setSelectedSeats((prev) =>
                          prev.filter((item) => item !== 3 * (index + 1) - 2)
                        );
                      }
                    }}
                    className="rounded-md cursorPointer flex-column justify-end"
                    style={{
                      width: 45,
                      height: 90,
                      border: "1px solid black",
                      backgroundColor: selectedSeats.includes(
                        3 * (index + 1) - 2
                      )
                        ? "green"
                        : bookedSeats.includes(3 * (index + 1) - 2)
                        ? "gray"
                        : "white",
                    }}
                  >
                    <div className="border-2 border-gray-300 m-2 rounded-sm"></div>
                  </div>
                  <div className="text-sm text-center text-gray-800 ">
                    {bookedSeats.includes(3 * (index + 1) - 2)
                      ? "Sold"
                      : `₹ ${bus["fare"]}`}
                  </div>
                </div>

                <div className="flex-row flex-gap-8">
                  <div className="flex-column">
                    <div
                      onClick={() => {
                        if (bookedSeats.includes(3 * (index + 1) - 1)) return;
                        if (!selectedSeats.includes(3 * (index + 1) - 1)) {
                          setSelectedSeats((prev) => [
                            ...prev,
                            3 * (index + 1) - 1,
                          ]);
                        } else {
                          setSelectedSeats((prev) =>
                            prev.filter((item) => item !== 3 * (index + 1) - 1)
                          );
                        }
                      }}
                      className="rounded-md cursorPointer flex-column justify-end"
                      style={{
                        width: 45,
                        height: 90,
                        border: "1px solid black",
                        backgroundColor: selectedSeats.includes(
                          3 * (index + 1) - 1
                        )
                          ? "green"
                          : bookedSeats.includes(3 * (index + 1) - 1)
                          ? "gray"
                          : "white",
                      }}
                    >
                      <div className="border-2 border-gray-300 m-2 rounded-sm"></div>
                    </div>
                    <div className="text-sm text-center text-gray-800 ">
                      {bookedSeats.includes(3 * (index + 1) - 1)
                        ? "Sold"
                        : `₹ ${bus["fare"]}`}
                    </div>
                  </div>
                  <div className="flex-column">
                    <div
                      onClick={() => {
                        if (bookedSeats.includes(3 * (index + 1))) return;
                        if (!selectedSeats.includes(3 * (index + 1))) {
                          setSelectedSeats((prev) => [
                            ...prev,
                            3 * (index + 1),
                          ]);
                        } else {
                          setSelectedSeats((prev) =>
                            prev.filter((item) => item !== 3 * (index + 1))
                          );
                        }
                      }}
                      className="rounded-md cursorPointer flex-column justify-end"
                      style={{
                        width: 45,
                        height: 90,
                        border: "1px solid black",
                        backgroundColor: selectedSeats.includes(3 * (index + 1))
                          ? "green"
                          : bookedSeats.includes(3 * (index + 1))
                          ? "gray"
                          : "white",
                      }}
                    >
                      <div className="border-2 border-gray-300 m-2 rounded-sm"></div>
                    </div>
                    <div className="text-sm text-center text-gray-800 ">
                      {bookedSeats.includes(3 * (index + 1))
                        ? "Sold"
                        : `₹ ${bus["fare"]}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-grow">
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
          {selectedSeats.length > 0 && (
            <div>
              <div>
                <h2 className="text-3xl font-bold text-left text-gray-800 ">
                  Price Breakup
                </h2>
                <h2 className="text-xl text-left mb-10 text-gray-800 ">
                  Tax Excluded
                </h2>
                <div className="flex-column gap-4">
                  {selectedSeats.map((item, index) => {
                    return (
                      <div className="flex gap-40">
                        <span>Seat {item}</span>
                        <span>₹ {bus["fare"]}</span>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="border-2 w-auto border-gray-300 m-2 rounded-sm"></div>
                 */}
                <div className="flex gap-40">
                  <span>Total</span>
                  <span>₹ {bus["fare"] * selectedSeats.length}</span>
                </div>
              </div>
              <br />
              <button
                onClick={() => {
                  dispatch(setSelectedBusId({ id: id }));
                  dispatch(setSelectedBusSeats({ seats: selectedSeats }));
                  navigate(`/form/${id}`);
                }}
                className="bg-orange-500 text-white font-bold px-4 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-200 tracking-wider"
              >
                Fill Passenger Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusDetails;
