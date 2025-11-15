# ਪੰਜਾਬੀ ਚੈਕਰ (Punjabi Checker)

A fun, educational game for kids to learn Punjabi letters while playing! This interactive touchscreen-friendly game helps children become familiar with the Gurmukhi alphabet in an engaging way.

## Features

- **Multiplayer Support**: 2-10 players can play simultaneously
- **Kid-Friendly Interface**: Large, colorful buttons perfect for touchscreens
- **Educational Background**: Floating Punjabi alphabets (Gurmukhi script) for passive learning
- **Sound Effects**:
  - Doorbell sound on button press
  - Celebration music for winners
- **Game Timer**: Track how long each game lasts
- **Score Tracking**: Winner is the player with the LEAST points
- **Beautiful Design**: Colorful gradients and animations to keep kids engaged

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Web Audio API** - For sound effects
- **Google Fonts** - Noto Sans Gurmukhi for authentic Punjabi text

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd punjabichechker-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## How to Play

1. **Setup**: Enter the number of players (2-10) and their names
2. **Play**: Each player taps their button when prompted. Each tap adds 1 point
3. **End Game**: Click "End Game" when ready to finish
4. **Winner**: The player with the LEAST points wins!

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build your project:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to complete deployment

### Deploy to Netlify

1. Build your project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy
```

4. For production deployment:
```bash
netlify deploy --prod
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://<your-username>.github.io/<repo-name>",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/'
})
```

4. Deploy:
```bash
npm run deploy
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains your production-ready files
3. Upload the contents of `dist` to any static hosting service

## Educational Value

This game helps children:
- Recognize Punjabi letters (Gurmukhi script)
- Develop hand-eye coordination
- Learn through play
- Practice reading Punjabi characters

## Browser Support

Works best on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
