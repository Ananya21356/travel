# 🌍 Travel Log Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for documenting and sharing your travel experiences. Keep track of your trips, destinations, memories, and travel stories in one beautiful interface.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📝 **Trip Management** - Create, view, update, and delete travel logs
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Built with React and Tailwind CSS
- 🔒 **Protected Routes** - Secure access to user-specific content
- 📸 **Trip Details** - View comprehensive information about each trip

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router** 6.14.2 - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18.2 - Web application framework
- **MongoDB** with **Mongoose** 7.5.0 - Database and ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ananya21356/travel.git
cd travel
```

### 2. Install Dependencies

Install all dependencies for both client and server:

```bash
npm run install-all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Important:** Replace the placeholder values with your actual configuration:
- `MONGODB_URI`: Your MongoDB connection string (local or Atlas)
- `JWT_SECRET`: A secure random string for JWT signing

### 4. Start the Application

#### Development Mode (Recommended)

Run both client and server concurrently:

```bash
npm run dev
```

This will start:
- Server on `http://localhost:5000` (with nodemon for auto-restart)
- Client on `http://localhost:3000` (with hot reload)

#### Production Mode

```bash
npm start
```

#### Run Separately

Start server only:
```bash
npm run start:server
```

Start client only:
```bash
npm run start:client
```

## 📁 Project Structure

```
travel-log/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/    # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TravelCard.jsx
│   │   │   └── TravelForm.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── TripDetail.jsx
│   │   ├── Services/      # API service functions
│   │   │   └── api.js
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Node.js/Express backend
│   ├── controllers/       # Route controllers
│   │   ├── authcontroller.js
│   │   └── travelController.js
│   ├── middlewares/       # Custom middlewares
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── Models/            # MongoDB models
│   │   ├── User.js
│   │   └── Travel.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── travelRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── package.json           # Root package.json
├── .gitignore
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Travel Logs
- `GET /api/travels` - Get all travel logs
- `GET /api/travels/:id` - Get a specific travel log
- `POST /api/travels` - Create a new travel log (Protected)
- `PUT /api/travels/:id` - Update a travel log (Protected)
- `DELETE /api/travels/:id` - Delete a travel log (Protected)

### User
- `GET /api/users/profile` - Get user profile (Protected)

## 🎨 Features in Detail

### Authentication System
- Secure password hashing with bcrypt
- JWT token-based authentication
- Token expiration validation
- Persistent login sessions

### Travel Logs
- Create detailed travel entries
- View all your trips in a card layout
- Edit and update existing trips
- Delete unwanted entries
- View comprehensive trip details

### User Interface
- Clean and modern design
- Dark mode support with persistent preference
- Responsive layout for all screen sizes
- Intuitive navigation

## 🔒 Security Features

- Password encryption using bcryptjs
- JWT token authentication
- Protected API routes with middleware
- Environment variables for sensitive data
- CORS configuration for API security

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ananya**
- GitHub: [@Ananya21356](https://github.com/Ananya21356)

## 🙏 Acknowledgments

- React documentation
- Express.js community
- MongoDB documentation
- Tailwind CSS

---

Made with ❤️ by Ananya
