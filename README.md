# Tarjeta Digital - Boda Nati & Maxi

Aplicacion full stack para invitacion digital de boda con:

- Landing personalizada por invitado
- Confirmacion RSVP
- Panel admin para invitados, fotos y control del salon
- Muro en vivo de fotos con aprobacion y borrado en tiempo real
- Modo Fiesta, texto dinamico y QR para carga de fotos

## Stack

### Frontend

- React 19 + Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Socket.IO Client

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticacion admin
- Multer + Cloudinary para carga de imagenes
- Socket.IO para eventos en vivo

## Estructura del repositorio

```text
tarjeta-digital/
  backend/            # API REST + sockets + persistencia
  invitacion-boda/    # App web (publica + admin)
```

## Funcionalidades principales

### Experiencia invitado

- Vista de invitacion por link unico (query param o slug)
- Confirmacion de asistencia con cantidad de asistentes
- Mensaje y sugerencia de cancion
- Subida de fotos desde QR del salon

### Panel administrativo

- Login con token JWT
- Alta y baja de invitados
- Copia de links unicos de invitacion
- Moderacion de fotos pendientes (aprobar/eliminar)
- Gestion de fotos aprobadas (eliminar de pantalla)
- Control del salon: pausa, velocidad, texto, QR, modo fiesta

### Pantalla del salon

- Slideshow de fotos aprobadas
- Actualizacion en tiempo real por Socket.IO
- Overlay con mensaje configurable
- QR para que invitados suban fotos

## Como correr el proyecto en local

## 1) Prerrequisitos

- Node.js 18+
- npm 9+
- MongoDB (local o Atlas)
- Cuenta de Cloudinary

## 2) Clonar e instalar dependencias

Desde la raiz del repo:

```bash
cd backend
npm install

cd ../invitacion-boda
npm install
```

## 3) Variables de entorno

### Backend - archivo backend/.env

```env
PORT=5000
MONGO_URI=mongodb+srv://.../tu-db
JWT_SECRET=tu_clave_secreta

# Cloudinary (acepta cualquiera de estos nombres)
CLOUD_NAME=...
CLOUD_API_KEY=...
CLOUD_API_SECRET=...

# Alternativa valida
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...
```

### Frontend - archivo invitacion-boda/.env

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
```

## 4) Levantar backend y frontend

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd invitacion-boda
npm run dev
```

Frontend local: http://localhost:5173

## 5) Crear admin inicial (una sola vez)

Con backend levantado:

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"123456"}'
```

Luego iniciar sesion en /admin/login con esas credenciales.

## Rutas clave

### Publicas

- / -> landing principal
- /:linkUnico -> landing por slug/link
- /fotos -> carga de fotos para invitados
- /salon -> pantalla del salon

### Admin

- /admin/login
- /admin/panel
- /admin/salon

## Endpoints principales

### Auth y admin

- POST /api/auth/login
- POST /api/admin/register
- GET /api/admin/invitados
- DELETE /api/admin/invitados/:id

### Invitados y RSVP

- GET /api/invitados
- POST /api/invitados
- GET /api/invitados/link/:link
- GET /api/invitados/slug/:slug
- POST /api/invitados/confirmar/:link

### Fotos y salon

- POST /api/fotos
- POST /api/fotos/:link
- GET /api/fotos
- GET /api/fotos/pendientes
- PUT /api/fotos/:id/aprobar
- DELETE /api/fotos/:id
- GET /api/salon/config
- POST /api/salon/config

## Flujo en tiempo real (Socket.IO)

- Al aprobar foto: se emite nueva-foto
- Al eliminar foto: se emite eliminar-foto
- Al cambiar config salon: se emite salon-config

## Scripts utiles

### Backend

- npm run dev -> nodemon server.js
- npm start -> node server.js

### Frontend

- npm run dev -> Vite en desarrollo
- npm run build -> build de produccion
- npm run preview -> vista local del build
- npm run lint -> lint de codigo

## Estado actual del proyecto

- Base funcional completa para portfolio
- Carga y moderacion de fotos operativa
- Control de salon operativo
- Interfaz responsive en sitio publico y panel admin

## Autor

Desarrollado por Maximiliano Jose Sulsenti 

## Licencia

Uso personal / portfolio.
