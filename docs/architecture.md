# StockPilot Architecture

## Tech Stack

### Frontend
- React.js
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Zod
- Recharts
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer (for future image uploads)

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Application Architecture

```
React (Frontend)
        │
        │ Axios (HTTP Requests)
        ▼
Express.js API
        │
Controllers
        │
Mongoose
        │
MongoDB Atlas
```

## Authentication

- JWT-based Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-based access (Future Scope)

## API Design

The application follows RESTful API principles.

Example:

GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

GET /api/categories

GET /api/suppliers

GET /api/warehouses
