<div align="center">
  <h1>🌍 Meridian</h1>
  <p><strong>Beautiful Global Time Zone Converter & Meeting Planner</strong></p>
  <p>Compare times across 200+ cities worldwide, plan meetings, and never miss a call.</p>
  
  [![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)](https://vitejs.dev/)
  [![pnpm](https://img.shields.io/badge/pnpm-10.13-F69220?logo=pnpm)](https://pnpm.io/)
</div>

--- WARN  Moving @types/node that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving @vitejs/plugin-react that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving autoprefixer that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving postcss that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving tailwindcss that was installed by a different package manager to "node_modules/.ignored"
 WARN  4 other warnings

## ✨ Features

- 🌐 **200+ Cities Worldwide** - Comprehensive timezone coverage
- ⏰ **Real-time Clock** - Live updates every second
- 🎯 **Time Travel Mode** - Adjust time to plan future meetings
- 📌 **Pin Favorites** - Quick access to frequently used timezones
- 🔍 **Smart Search** - Find cities and countries instantly
- 🌓 **Dark Mode** - Beautiful light and dark themes
- 📊 **Time Comparison** - Visual timeline for two timezones
- ⏱️ **Focus Timer** - Built-in Pomodoro-style timer
- 📅 **Meeting Planner** - Share meeting times with your team
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - Optimized for performance

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ (or 22+ recommended)
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/meridian.git
   cd meridian
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
# Build the project
pnpm run build

# Preview production build
pnpm run preview
```

The built files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing
- **pnpm** - Package manager

## 📁 Project Structure

```
meridian/
├── src/
│   ├── components/        # React components
│   │   ├── Controls/      # Search, TimeTravel controls
│   │   ├── Display/        # UTC display
│   │   ├── Layout/         # Header, Footer, Logo
│   │   ├── Modals/         # Meeting, Timer modals
│   │   ├── TimeGrid/       # Time zone cards
│   │   └── Tools/          # Time zone comparator
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # Entry point
│   ├── index.css           # Global styles
│   ├── constants.ts        # Timezone data
│   └── types.ts            # TypeScript types
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --brand-primary: #2563eb;  /* Primary brand color */
  --surface-50: #f8fafc;     /* Background */
  /* ... more variables */
}
```

### Adding Timezones

Edit `src/constants.ts` to add or modify timezone entries:

```typescript
{ id: 'custom', city: 'City Name', country: 'Country', iana: 'Timezone/Name', flag: '🏳️' }
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ by [Designbyte Studio](https://studio.designbyte.dev)
- Timezone data powered by IANA Time Zone Database
- Icons and UI inspired by modern design systems

## 🔗 Links

- **Live Demo**: [meridian.designbyte.dev](https://meridian.designbyte.dev)
- **Designbyte Studio**: [studio.designbyte.dev](https://studio.designbyte.dev)
- **Report Issues**: [GitHub Issues](https://github.com/yourusername/meridian/issues)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://studio.designbyte.dev" target="_blank">Designbyte Studio</a></p>
</div>
