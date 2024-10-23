# Fullstack Application: Ruby on Rails (API) & React (Frontend)
Este repositorio contiene dos aplicaciones separadas:

Back-end: Una API construida con Ruby on Rails que maneja autos y servicios de mantenimiento.

Front-end: Una aplicación construida en React que consume los endpoints de la API para mostrar datos y realizar operaciones CRUD.

Estructura del Proyecto

```bash
my-fullstack-app/
├── back-end/   # Carpeta que contiene la aplicación Ruby on Rails
└── front-end/  # Carpeta que contiene la aplicación React
```

## Back-end: Ruby on Rails (API)
La API permite la gestión de autos y servicios de mantenimiento. Aquí están los endpoints disponibles:

### Endpoints de Autos

```bash
Listar todos los autos:
GET /api/v1/cars

Ver detalles de un auto específico:
GET /api/v1/cars/:id

Crear un nuevo auto:
POST /api/v1/cars

Actualizar un auto:
PUT /api/v1/cars/:id o PATCH /api/v1/cars/:id

Eliminar un auto:
DELETE /api/v1/cars/:id

```
### Endpoints de Servicios de Mantenimiento

```bash
Listar todos los servicios de mantenimiento:
GET /api/v1/maintenance_services

Ver detalles de un servicio específico:
GET /api/v1/maintenance_services/:id

Crear un nuevo servicio de mantenimiento:
POST /api/v1/maintenance_services

Actualizar un servicio de mantenimiento:
PUT /api/v1/maintenance_services/:id o PATCH /api/v1/maintenance_services/:id

Eliminar un servicio de mantenimiento:
DELETE /api/v1/maintenance_services/:id

```

### Configuración del Back-end

1. Navega a la carpeta back-end:

```bash
cd back-end
```

2. Instala las dependencias:

```bash
bundle install
```

3. Configura la base de datos:

```bash
rails db:create db:migrate
```

4. Inicia el servidor de Rails:

```bash
rails s
```

La API estará disponible en http://localhost:3000.

## Front-end: React

La aplicación React consume los datos de la API y proporciona una interfaz interactiva para los usuarios.

### Configuración del Front-end

1. Navega a la carpeta front-end:

```bash
cd front-end
```
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo de React:

```bash
npm run dev
```

La aplicación estará disponible en http://127.0.0.1:5173.

## Instrucciones para Ejecutar la Aplicación Completa

1. Primero, inicia el servidor del back-end en la carpeta back-end:

```bash
rails s
```
2. Luego, inicia el servidor del front-end en la carpeta front-end:

```bash
npm run dev
```

Ahora puedes interactuar con la aplicación React, que consumirá la API del back-end para mostrar y gestionar los autos y los servicios de mantenimiento.

