import axios from "axios";
import { useEffect, useState } from "react";
import CarForm from './CarForm';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCars = (page = 1) => {
    return axios.get(`http://127.0.0.1:3000/api/v1/cars?page=${page}`)
      .then((response) => {
        setCars(response.data.cars);
        setTotalPages(response.data.meta.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Error al obtener los autos: ${error.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const handleCarClick = (carId) => {
    setSelectedCar(carId);
    setShowAddCarForm(false);
  };

  const handleAddCarClick = () => {
    setSelectedCar(null);
    setShowAddCarForm(true);
  };

  const handleCarAdded = () => {
    setShowAddCarForm(false);
    fetchCars(currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getMaintenanceServicesForSelectedCar = () => {
    if (selectedCar) {
      const car = cars.find(car => car.id === selectedCar);
      return car ? car.maintenance_services || [] : [];
    }
    return [];
  };

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl mt-3 p-2">Lista de Autos</h1>

      <table className="m-3 mx-auto table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Placa</th>
            <th className="border border-gray-300 p-2">Modelo</th>
            <th className="border border-gray-300 p-2">Año</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id} onClick={() => handleCarClick(car.id)} className="cursor-pointer hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{car.id}</td>
              <td className="border border-gray-300 p-2">{car.plate_number}</td>
              <td className="border border-gray-300 p-2">{car.model}</td>
              <td className="border border-gray-300 p-2">{car.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-5">
        <button onClick={handlePreviousPage} className="hover:cursor-pointer border px-4 py-2 ml-2 bg-gray-200" disabled={currentPage === 1}>Anterior</button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} className="hover:cursor-pointer border px-4 py-2 ml-2 bg-gray-200" disabled={currentPage === totalPages}>Siguiente</button>
      </div>

      {!showAddCarForm && (
        <button
          onClick={handleAddCarClick}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Añadir Auto
        </button>
      )}

      {showAddCarForm && !selectedCar && (
        <CarForm onCarAdded={handleCarAdded} />
      )}

      {selectedCar && !showAddCarForm && (
        <div>
          <h2 className="font-bold text-xl mt-5 p-2">Servicios de Mantenimiento para Auto con ID: {selectedCar}</h2>
          {getMaintenanceServicesForSelectedCar().length > 0 ? (
            <table className="m-3 mx-auto table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Descripción</th>
                  <th className="border border-gray-300 p-2">Estado</th>
                  <th className="border border-gray-300 p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {getMaintenanceServicesForSelectedCar().map(service => (
                  <tr key={service.id}>
                    <td className="border border-gray-300 p-2">{service.id}</td>
                    <td className="border border-gray-300 p-2">{service.description}</td>
                    <td className="border border-gray-300 p-2">{service.status}</td>
                    <td className="border border-gray-300 p-2">{service.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mt-3">No hay servicios de mantenimiento para este auto.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarList;
