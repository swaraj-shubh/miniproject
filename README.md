# SecondServe 🍽️

A full-stack food donation platform that connects food donors with receivers to reduce food waste and fight hunger in local communities.

![SecondServe Banner](/frontend/public/donation.jpg)

- 🚀 **Deployment:** [secondserve.shubhh.xyz](https://secondserve.shubhh.xyz/)
- 🚀 **APIs:** [secondserve.onrender.com](https://secondserve.onrender.com)

## 🌟 Features

### Core Functionality
- **Food Donation System**: Restaurants and individuals can easily donate surplus food
- **Real-time Matching**: Connects donors with nearby receivers using geolocation
- **Interactive Maps**: Built-in mapping with routing directions to food locations
- **Image Upload**: Cloudinary integration for food image management
- **Role-based Access**: Separate dashboards for donors, receivers, and admins

### User Roles
- **Donors**: Post available food with details, images, and location
- **Receivers**: Browse and reserve available food donations
- **Admins**: Manage users, monitor all donations, and platform analytics

## 🛠️ Tech Stack

### Frontend
- **React** with modern hooks and functional components
- **Tailwind CSS** for responsive UI design
- **Leaflet & React-Leaflet** for interactive maps
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Third-party Services
- **Cloudinary** for image storage and management
- **OpenStreetMap** for mapping and geolocation services

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/secondserve.git
cd secondserve
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Run the Application**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## 📁 Project Structure

```
secondserve/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Auth & validation
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API calls
│   │   └── App.jsx     # Main app component
│   └── public/         # Static assets
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Food Management
- `POST /api/foods/donate` - Create food donation
- `GET /api/foods/donate` - Get available foods
- `PUT /api/foods/:id/reserve` - Reserve food item
- `GET /api/foods/donated` - Get user's donated foods
- `GET /api/foods/received` - Get user's received foods

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/all` - Get all users (admin only)

## 🗺️ Key Features Explained

### Geolocation & Mapping
- Uses MongoDB's geospatial queries to find nearby food donations
- Interactive maps with routing directions using Leaflet Routing Machine
- Real-time distance calculations between users and food locations

### Image Management
- Secure image uploads to Cloudinary
- Multiple image support for food items
- Automatic optimization and CDN delivery

### Authentication & Security
- JWT-based authentication with protected routes
- Password hashing with bcryptjs
- Role-based access control (donor, receiver, admin)

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenStreetMap for mapping services
- Cloudinary for image management
- MongoDB for database services
- The React and Node.js communities

## 📞 Contact

For questions or support, please contact:
- Email: info@secondserve.com
- Website: https://secondserve.shubhh.xyz/
- GitHub: [SecondServe Repository](https://github.com/your-username/secondserve)

---

**Made with ❤️ to reduce food waste and feed communities**