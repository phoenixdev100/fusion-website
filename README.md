<div align="center">
  <img src="https://i.postimg.cc/j2fk9bLq/fusion-logo.png" alt="Fusion Network Logo" width="200" />
  <h1>Fusion Network Website</h1>
  <p>A modern, feature-rich Minecraft server platform with real-time server status</p>

  <div>
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-4.4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </div>
  
  <div>
    <a href="#-live-demo">Demo</a> •
    <a href="#-features">Features</a> •
    <a href="#-screenshots">Screenshots</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-configuration">Configuration</a> •
    <a href="#-contributing">Contributing</a> •
    <a href="#-license">License</a>
  </div>
</div>

## ✨ Features

- **🎮 Real-time Server Status** - Live monitoring of server performance, player counts, and TPS
- **👥 Player Statistics** - View online players with their avatars and stats
- **🌐 Multi-Server Support** - Monitor multiple game modes (Duels, PvP, Lifesteal) from a single dashboard
- **📊 Performance Metrics** - Track server health with TPS and MSPT indicators
- **🎨 Beautiful UI** - Modern, responsive interface with animations and visual feedback
- **📱 Mobile Responsive** - Optimized for all device sizes
- **🔄 Auto-Refresh** - Automatic updates every 30 seconds
- **🎭 Player Privacy** - Option to hide player names for privacy

<div align="center">

## 📸 Screenshots

</div>

<div align="center">
  <img src="https://i.postimg.cc/SxfHkkVJ/Screenshot-2025-05-12-110855.png" alt="Dashboard" width="80%" />
  <p><em><b>Main Server Status Dashboard</b></em></p>
  
  <img src="https://i.postimg.cc/tTYc3Pbx/Screenshot-2025-05-12-110923.png" alt="Player List" width="80%" />
  <p><em><b>Player List with Statistics</b></em></p>
</div>

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phoenixdev100/fusion-website.git
   cd fusion-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Server Configuration
   VITE_API_URL=http://localhost:5173/api
   
   # Refresh Rate (in milliseconds)
   VITE_REFRESH_INTERVAL=30000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```


### Customization

The UI can be customized by editing the Tailwind configuration in `tailwind.config.js`.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your custom colors */ },
        secondary: { /* your custom colors */ },
      },
    },
  },
};
```

## 📁 Project Structure

```
fusion-website/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Base UI components
│   │   └── ...        # Feature-specific components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   │   └── ServerInfo.tsx  # Server status dashboard
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper utilities
│   └── App.tsx        # Main application component
├── .env.example       # Example environment variables
├── index.html         # HTML entry point
├── package.json       # Project dependencies
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Usage

Once the application is running, you can:

1. **View Server Status**: See real-time information about all your Minecraft servers
2. **Monitor Player Activity**: Track who's online across all game modes
3. **Check Performance**: Monitor TPS and other performance metrics

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Minecraft Server Status API](https://api.mcsrvstat.us/) for server status data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [shadcn/ui](https://ui.shadcn.com/) for UI components
├── package.json      # Project dependencies
└── README.md         # Project documentation


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
