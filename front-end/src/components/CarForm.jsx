/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const CarForm = ({ onCarAdded }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(null);

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCar = {
      plate_number: plateNumber,
      model,
      year,
    };

    axios.post('http://127.0.0.1:3000/api/v1/cars', newCar, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      }
    })
    .then(response => {
      onCarAdded(response.data);
      setPlateNumber("");
      setModel("");
      setYear("");
      setError(null);
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div className="my-5 mx-80">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-bold text-xl mb-3">Añadir un Auto</h2>
        <div>
          <label className="block mb-2">Placa:</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Año:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Añadir Auto
        </button>
      </form>
    </div>
  );
};

export default CarForm;
