# Backend - Tarjeta Digital

API REST para invitados, confirmaciones, fotos y control de la pantalla del salon.

## Tecnologias

- Node.js + Express
- MongoDB + Mongoose
- JWT para rutas protegidas de admin
- Multer en memoria
- Cloudinary para almacenamiento de imagenes
- Socket.IO para eventos en vivo

## Scripts

- npm run dev
- npm start

## Variables de entorno

Crear backend/.env con:

```env
PORT=5000
MONGO_URI=mongodb+srv://.../tu-db
JWT_SECRET=tu_clave_secreta
CLOUD_NAME=...
CLOUD_API_KEY=...
CLOUD_API_SECRET=...
```

Tambien se aceptan:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

## Endpoints base

- /api/invitados
- /api/confirmaciones
- /api/fotos
- /api/salon
- /api/auth
- /api/admin

## Eventos Socket.IO

- nueva-foto
- eliminar-foto
- salon-config

## Nota

La guia completa del proyecto esta en README.md de la raiz.