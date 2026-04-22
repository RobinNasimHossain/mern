# Wanderlust Travels - Travel Agency Website

A full-stack MERN (MongoDB, Express, React, Node.js) travel agency website for showcasing travel packages, providing booking services, and offering travel information.

## Features

- **Travel Packages** — Browse curated travel packages with filtering, sorting, and search
- **Package Details** — Detailed views with itineraries, galleries, pricing, and what's included
- **Online Booking** — Book travel packages with a simple form and receive a booking reference
- **Destinations** — Explore destinations organized by continent
- **Contact Form** — Get in touch with the travel agency team
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Modern UI** — Built with Tailwind CSS, Google Fonts, and smooth animations

## Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, React Router, Axios, React Icons |
| Backend   | Node.js, Express.js                |
| Database  | MongoDB (Mongoose ODM)             |
| Deployment| Fly.io (API), Vercel (Frontend)    |

## Project Structure

```
travel-agency/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── App.jsx          # App routes
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind + global styles
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                  # Express backend
│   ├── src/
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── index.js         # Server entry point
│   │   └── seed.js          # Database seeder
│   └── package.json
├── package.json             # Root package with dev scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Install all dependencies (root + server + client)
npm run install-all

# Seed the database with sample travel packages
npm run seed

# Start development (runs server + client concurrently)
npm run dev
```

The frontend runs on `http://localhost:5173` and the API on `http://localhost:4000`.

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
MONGODB_URI=mongodb+srv://your-connection-string
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

For production frontend, set `VITE_API_URL` in the client build environment.

## API Endpoints

| Method | Endpoint                | Description              |
|--------|------------------------|--------------------------|
| GET    | /api/packages          | List all packages (with filters) |
| GET    | /api/packages/:slug    | Get a single package     |
| POST   | /api/bookings          | Create a booking         |
| GET    | /api/bookings/lookup/:ref | Look up a booking by reference |
| POST   | /api/contact           | Submit a contact message |
| GET    | /api/health            | Health check             |

## License

MIT
