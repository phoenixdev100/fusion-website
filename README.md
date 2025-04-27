# <div align="center">Fusion Network</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-v14+-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.6.0-yellow?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<div align="center">
  <p>A modern, interactive Minecraft server web platform built with React, Node.js, and MongoDB.</p>
</div>

## ✨ Features

- **🔐 User Authentication**: Secure login and registration with JWT.
- **👥 Admin & User Roles**: Separate dashboards for admins and users.
- **📊 Interactive Dashboard**: Real-time stats, achievements, and activity.
- **🗳️ Vote System**: Integrated voting for server rewards.
- **🛒 Store**: In-game item and rank purchases.
- **🎫 Support System**: Ticket creation and management.
- **📱 Responsive Design**: Modern UI with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS, shadcn/ui

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/phoenixdev100/fusion-website.git/
   cd fusion-website
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=mongodb://localhost:27017/fusionnetwork
     JWT_SECRET=your_jwt_secret_here
     PORT=5000
     ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

### 🚀 Starting the Backend Server

1. **Navigate to the server directory**
   ```sh
   cd src/server
   ```

2. **Start the server**
   ```sh
   node index.js
   ```

3. **Verify the server is running**
   - You should see "MongoDB connected" and "Server running on port 5000" in the terminal.
   - The backend API will be available at `http://localhost:5000/api`.

## 📁 Project Structure

```
fusion-network/
├── src/
│   ├── api/          # API services
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utility functions
│   ├── models/       # Mongoose models
│   ├── pages/        # React pages
│   ├── server/       # Backend server
│   └── App.tsx       # Main React component
├── public/           # Static assets
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## 🔄 Recent Changes

- **📊 User Dashboard**: Added real-time stats, achievements, and activity.
- **👑 Admin Creation**: Added a script to create new admin users.
- **📝 Gitignore**: Updated to ignore common files and directories.
- **🔐 Authentication**: Improved login and registration with email-based auth.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
