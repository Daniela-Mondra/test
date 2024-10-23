import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");

  const fetchCars = () => {
    axios.get('http://127.0.0.1:3000/api/v1/cars')
      .then(response => {
        setCars(response.data.cars); 
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarIdChange = (e) => {
    setSelectedCarId(e.target.value);
  };

  const handleRedirectToCar = () => {
    if (selectedCarId) {
      navigate(`/busqueda/${selectedCarId}`);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl mt-3 p-2 font-bold">Detalles de un Auto</h1>
      <div className="space-y-4">
        <label className="mr-2">Buscar Auto por ID:</label>
        <select value={selectedCarId} onChange={handleCarIdChange} className="border p-2">
          <option value="">Seleccione un ID</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>{car.id}</option>
          ))}
        </select>
        <button
          onClick={handleRedirectToCar}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
        >
          Ir al Auto
        </button>
      </div>
    </div>
  );
};

export default Home;
