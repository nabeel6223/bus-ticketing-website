import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactDetails,
  setPassengerDetails,
} from "../store/slices/PassengerSlice";
import { useNavigate, useParams } from "react-router-dom";

function PassengerInfo() {
  return (
    <div>
      <ContactAndPassengersForm />
    </div>
  );
}

function ContactAndPassengersForm() {
  const { selectedBusSeats } = useSelector((state) => state.busList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [passenger, setPassenger] = useState(null);
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      contact: {},
      passengers: passenger,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data) => {
    // handle completed form
    console.log("FORM SUBMITTED", data);
    dispatch(setContactDetails(data.contact));
    dispatch(setPassengerDetails(data.passengers));
    navigate(`/confirm/${id}`);
    // Example: reset form after submission
    // reset();
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setPassenger(Array.from({ length: selectedBusSeats.length }));
      reset({
        contact: {},
        passengers: Array.from({ length: selectedBusSeats.length }),
      });

      // setContact(contactDetails);
    };
    fetchDetails();
  }, [selectedBusSeats]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-bold">Contact Details</h2>
        <h3 className="text-md text-gray-500 mb-6">
          Tickets details will be sent to
        </h3>

        <label>
          Name
          <input
            className="border-1 border-gray-300 rounded-md mb-4"
            {...register("contact.name", {
              required: "Contact name is required",
            })}
            style={styles.input}
            placeholder="Full name"
          />
          {errors?.contact?.name && (
            <p style={styles.error}>{errors.contact.name.message}</p>
          )}
        </label>

        <label style={styles.label}>
          Mobile
          <input
            className="border-1 border-gray-300 rounded-md mb-4"
            {...register("contact.mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a 10-digit mobile number",
              },
            })}
            style={styles.input}
            placeholder="e.g. 9876543210"
          />
          {errors?.contact?.mobile && (
            <p style={styles.error}>{errors.contact.mobile.message}</p>
          )}
        </label>

        <label style={styles.label}>
          Email
          <input
            className="border-1 border-gray-300 rounded-md mb-4"
            {...register("contact.email", {
              required: "Email is required",
              pattern: {
                // simple email regex
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            style={styles.input}
            placeholder="you@example.com"
          />
          {errors?.contact?.email && (
            <p style={styles.error}>{errors.contact.email.message}</p>
          )}
        </label>
      </div>

      <div className=" mt-10 bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-bold mb-2">Passenger Details</h2>

        {fields.map((field, index) => (
          <fieldset key={field.id} style={styles.passengerBox}>
            <h3 className="text-md font-bold">Passenger {index + 1}</h3>
            <h4 className="text-md font-medium mb-4">Seat 1</h4>

            <label style={styles.label}>
              Name
              <input
                className="border-1 border-gray-300 rounded-md mb-4"
                {...register(`passengers.${index}.name`, {
                  required: "Passenger name is required",
                })}
                style={styles.input}
                placeholder="Passenger name"
              />
              {errors?.passengers?.[index]?.name && (
                <p style={styles.error}>
                  {errors.passengers[index].name.message}
                </p>
              )}
            </label>

            <label style={styles.label}>
              Age
              <input
                className="border-1 border-gray-300 rounded-md mb-4"
                type="number"
                {...register(`passengers.${index}.age`, {
                  required: "Age is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Age must be 0 or greater" },
                })}
                style={styles.input}
                placeholder="Age"
              />
              {errors?.passengers?.[index]?.age && (
                <p style={styles.error}>
                  {errors.passengers[index].age.message}
                </p>
              )}
            </label>

            <label style={styles.label}>
              Gender
              <select
                className="border-1 border-gray-300 rounded-md mb-4"
                {...register(`passengers.${index}.gender`, {
                  required: "Gender is required",
                })}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors?.passengers?.[index]?.gender && (
                <p style={styles.error}>
                  {errors.passengers[index].gender.message}
                </p>
              )}
            </label>

            {/* <div style={styles.row}>
              <button
                type="button"
                onClick={() => remove(index)}
                style={styles.secondaryBtn}
                disabled={fields.length === 1}
              >
                Remove
              </button>
            </div> */}
          </fieldset>
        ))}
      </div>

      {/* <div style={styles.row}>
        <button
          type="button"
          onClick={() => append({ name: "", age: "", gender: "" })}
          style={styles.primaryBtn}
        >
          Add Passenger
        </button>
      </div> */}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 bg-orange-500 text-white font-bold px-4 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-200 tracking-wider"
        >
          {isSubmitting ? "Comfirming..." : "Confirm Booking"}
        </button>

        {/* <button
          type="button"
          onClick={() =>
            reset({
              contact: { name: "", mobile: "", email: "" },
              passengers: [{ name: "", age: "", gender: "" }],
            })
          }
          style={styles.secondaryBtn}
        >
          Reset
        </button> */}
      </div>
    </form>
  );
}

// minimal inline styles for clarity
const styles = {
  form: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 16,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  label: { display: "block", marginBottom: 12 },
  input: {
    display: "block",
    width: "100%",
    padding: "8px 10px",
    marginTop: 6,
    boxSizing: "border-box",
  },
  hr: { margin: "20px 0" },
  passengerBox: {
    border: "1px solid #ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  row: { display: "flex", gap: 8, marginTop: 12 },
  primaryBtn: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "8px 12px",
    cursor: "pointer",
    background: "#f3f3f3",
    border: "1px solid #ccc",
  },
  error: { color: "crimson", marginTop: 6, fontSize: 13 },
};

export default PassengerInfo;
