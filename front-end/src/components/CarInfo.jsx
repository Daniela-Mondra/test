import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceForm from "./ServiceForm";
import CarEdit from "./CarEdit";

const CarInfo = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [editServiceData, setEditServiceData] = useState(null);

  const fetchCar = () => {
    return axios.get(`http://127.0.0.1:3000/api/v1/cars/${id}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        throw new Error(`Error al obtener la información del auto: ${error.message}`);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchCar()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleServiceAdded = (newService) => {
    setCar(prevCar => ({
      ...prevCar,
      maintenance_services: [...prevCar.maintenance_services, newService],
    }));
    setActiveForm(null);
  };

  const handleServiceUpdated = (updatedService) => {
    setCar(prevCar => ({
      ...prevCar,
      maintenance_services: prevCar.maintenance_services.map(service =>
        service.id === updatedService.id ? updatedService : service
      ),
    }));
    setEditServiceData(null);
  };

  const handleCarUpdated = (updatedCar) => {
    setCar(updatedCar);
    setActiveForm(null);
  };

  const handleEditService = (service) => {
    setEditServiceData(service);
    setActiveForm(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center">
      {car && (
        <div>
          <h1 className="font-bold text-2xl mt-3 p-2">Información del Auto ID: {car.id}</h1>
          <table className="m-3 mx-auto table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Placa</th>
                <th className="border border-gray-300 p-2">Modelo</th>
                <th className="border border-gray-300 p-2">Año</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{car.plate_number}</td>
                <td className="border border-gray-300 p-2">{car.model}</td>
                <td className="border border-gray-300 p-2">{car.year}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h2 className="font-bold text-xl mt-5 p-2">Servicios de Mantenimiento</h2>
      {car && car.maintenance_services.length > 0 ? (
        <table className="m-3 mx-auto table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Fecha</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {car.maintenance_services.map(service => (
              <tr key={service.id}>
                <td className="border border-gray-300 p-2">{service.id}</td>
                <td className="border border-gray-300 p-2">{service.description}</td>
                <td className="border border-gray-300 p-2">{service.status}</td>
                <td className="border border-gray-300 p-2">{service.date}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No hay servicios de mantenimiento para este auto.</div>
      )}

      <div className="mt-5">
        <button
          onClick={() => {
            setActiveForm(activeForm === 'serviceForm' ? null : 'serviceForm');
            setEditServiceData(null);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-5"
        >
          Añadir Servicio
        </button>
        <button
          onClick={() => {
            setActiveForm(activeForm === 'editForm' ? null : 'editForm');
            setEditServiceData(null);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-5 ml-2"
        >
          Editar Auto
        </button>
      </div>

      {activeForm === 'serviceForm' && (
        <ServiceForm carId={parseInt(id)} onServiceAdded={handleServiceAdded} />
      )}

      {activeForm === 'editForm' && (
        <CarEdit car={car} onCarUpdated={handleCarUpdated} />
      )}

      {editServiceData && (
        <ServiceForm
          carId={parseInt(id)}
          service={editServiceData}
          onServiceUpdated={handleServiceUpdated}
        />
      )}
    </div>
  );
};

export default CarInfo;
