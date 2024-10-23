import { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchPlate, setSearchPlate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/maintenance_services?page=${currentPage}`);
        const { maintenance_services, meta } = response.data;

        setServices(maintenance_services);
        setTotalPages(meta.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentPage]);

  if (loading) {
    return <div>Cargando servicios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredByStatus = filterStatus
    ? services.filter(service => service.status === filterStatus)
    : services;

  const filteredServices = filteredByStatus.filter(service =>
    service.car.plate_number.toLowerCase().includes(searchPlate.toLowerCase())
  );

  return (
    <div className="text-center">
      <h1 className="text-2xl mt-3 p-2 font-bold">Servicios de Mantenimiento</h1>

      <div className="flex justify-center mt-4">
        <div className="mb-4">
          <label htmlFor="filterStatus" className="mr-2">Filtrar por estado:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border p-1"
          >
            <option value="">Sin filtro</option>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <div className="ms-10 mb-4">
          <label htmlFor="searchPlate" className="mr-2">Buscar por placa:</label>
          <input
            type="text"
            id="searchPlate"
            value={searchPlate}
            onChange={e => setSearchPlate(e.target.value)}
            className="border p-1"
            placeholder="Número de placa"
          />
        </div>
      </div>

      <table className="m-3 mx-auto table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Placa del Auto</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service.id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2">{service.id}</td>
              <td className="border px-4 py-2">{service.description}</td>
              <td className="border px-4 py-2">{service.status}</td>
              <td className="border px-4 py-2">{service.date}</td>
              <td className="border px-4 py-2">{service.car.plate_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="hover:cursor-pointer border px-4 py-2 mr-2 bg-gray-200"
        >
          Anterior
        </button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="hover:cursor-pointer border px-4 py-2 ml-2 bg-gray-200"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ServicesList;
