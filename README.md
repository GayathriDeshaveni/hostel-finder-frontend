# 🏠 HostelFinder

A full-stack web application that helps students find verified hostels near their college — with smart search, filters, and a clean OYO-style UI.

## 🌐 Live Demo
👉 [https://hostel-finder-frontend-one.vercel.app](https://hostel-finder-frontend-one.vercel.app)



## ✨ Features

- 🔍 **Search** hostels by city or college name
- 🎛️ **Filter** by gender, price range, and amenities (WiFi, Food, AC, Laundry)
- 🏠 **Hostel Detail Page** with images, amenities, contact info
- ❤️ **Save Favourites** (login required)
- 🔐 **JWT Authentication** (Register/Login)
- 👨‍💼 **Admin Panel** — Add, Edit, Delete hostels with image upload
- 🖼️ **Cloudinary** image upload for hostel photos
- ⭐ **Star Ratings** for hostels
- 📱 **Responsive UI** — OYO/MakeMyTrip inspired design

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- Cloudinary (image upload)
- Multer

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Images → Cloudinary

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Cloudinary account

### Backend Setup
```bash
cd hostel-finder-backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd hostel-finder-frontend
npm install
```

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
SKIP_PREFLIGHT_CHECK=true
```

Run frontend:
```bash
npm start
```

## 📁 Project Structure

```
hostel-finder-backend/
├── config/         # Database connection
├── middleware/     # JWT auth middleware
├── models/         # User & Hostel models
├── routes/         # API routes
└── server.js

hostel-finder-frontend/
├── src/
│   ├── components/ # Navbar, HostelCard, Footer
│   ├── context/    # Auth context
│   ├── pages/      # Home, Search, Detail, Admin
│   └── config.js   # API URL config
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/hostels | Get all hostels (with filters) |
| GET | /api/hostels/:id | Get single hostel |
| POST | /api/hostels | Add hostel (admin) |
| PUT | /api/hostels/:id | Update hostel (admin) |
| DELETE | /api/hostels/:id | Delete hostel (admin) |
| GET | /api/favourites | Get user favourites |
| POST | /api/favourites/:id | Add to favourites |
| DELETE | /api/favourites/:id | Remove from favourites |
| POST | /api/upload | Upload image to Cloudinary |

## 👩‍💻 Developer

**Gayathri Deshaveni**
- GitHub: [@GayathriDeshaveni](https://github.com/GayathriDeshaveni)

