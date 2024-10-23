/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const ServiceForm = ({ carId, service, onServiceAdded, onServiceUpdated }) => {
  const [formData, setFormData] = useState({
    description: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        description: service.description,
        status: service.status,
        date: service.date,
      });
    } else {
      setFormData({
        description: "",
        status: "",
        date: "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service) {
      axios.put(`http://127.0.0.1:3000/api/v1/maintenance_services/${service.id}`, {
        ...formData,
        car_id: carId,
      })
      .then((response) => {
        onServiceUpdated(response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el servicio:", error);
      });
    } else {
      axios.post(`http://127.0.0.1:3000/api/v1/maintenance_services`, {
        ...formData,
        car_id: carId,
      })
      .then((response) => {
        onServiceAdded(response.data);
      })
      .catch((error) => {
        console.error("Error al añadir el servicio:", error);
      });
    }
  };

  return (
    <div className="my-5 mx-80">
      <form onSubmit={handleSubmit}>
        <h2 className="font-bold text-xl mb-3">{service ? "Editar Servicio" : "Añadir Servicio"}</h2>
        <div>
          <label className="block m-2">Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block m-2">Estado:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="">Selecciona una opción</option>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>
        <div>
          <label className="block m-2">Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-5">
          {service ? "Actualizar" : "Añadir"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
