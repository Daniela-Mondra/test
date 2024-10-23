/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const CarEdit = ({ car, onCarUpdated }) => {
  const [plateNumber, setPlateNumber] = useState(car.plate_number);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:3000/api/v1/cars/${car.id}`, {
        plate_number: plateNumber,
        model,
        year,
      });
      onCarUpdated(response.data);
    } catch (error) {
      setError(`Error al actualizar el auto: ${error.message}`);
    }
  };

  return (
    <div className="my-5 mx-80">
      <h2 className="font-bold text-xl mb-3">Editar Información del Auto</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block m-2">Placa:</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block m-2">Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block m-2">Año:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-5">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default CarEdit;
