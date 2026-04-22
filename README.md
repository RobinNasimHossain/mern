# Wanderlust Travels – MERN Travel Agency Website

A full-stack travel agency website built with the **MERN stack** (MongoDB, Express, React, Node.js). Browse curated travel packages, book trips, explore destinations, and read traveler reviews.

![Wanderlust Travels](https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=400&fit=crop)

## Features

- **Travel Packages** – Browse, search, filter, and sort curated travel packages across 7 categories (adventure, beach, cultural, wildlife, luxury, honeymoon, family)
- **Package Details** – Full itineraries, galleries, included/excluded items, highlights, and pricing
- **Online Booking** – Book trips directly with traveler details and automatic price calculation
- **Reviews & Ratings** – Read verified traveler reviews with star ratings
- **Contact Form** – Reach out to the travel agency with inquiries
- **Responsive Design** – Fully responsive UI with Tailwind CSS
- **Search & Filter** – Search by destination, filter by category, sort by price/rating/duration

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Frontend  | React 18, Vite, Tailwind CSS       |
| Backend   | Node.js, Express 4                  |
| Database  | MongoDB, Mongoose                   |
| Icons     | React Icons                         |
| HTTP      | Axios                               |
| Routing   | React Router v6                     |

## Project Structure

```
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level page components
│   │   ├── api.js       # Axios API client
│   │   ├── App.jsx      # Root component with routing
│   │   └── main.jsx     # Entry point
│   └── index.html
├── server/              # Express backend API
│   ├── src/
│   │   ├── models/      # Mongoose schemas (Package, Booking, Contact, Review)
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/   # Error handling
│   │   ├── app.js       # Express app setup
│   │   ├── config.js    # Environment configuration
│   │   ├── db.js        # MongoDB connection
│   │   ├── index.js     # Server entry point
│   │   └── seed.js      # Database seeder with sample data
│   └── .env.example
└── package.json         # Root scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Install all dependencies (client + server)
npm run install:all
```

### Environment Setup

```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI if needed
```

### Seed the Database

```bash
npm --prefix server run seed
```

This loads 8 curated travel packages and 6 sample reviews.

### Run Development Servers

```bash
# Terminal 1 – API server (port 4000)
npm run dev:server

# Terminal 2 – React dev server (port 5173)
npm run dev:client
```

Visit **http://localhost:5173** to view the website.

## API Endpoints

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| GET    | `/api/health`                   | Health check             |
| GET    | `/api/packages`                 | List packages (filterable) |
| GET    | `/api/packages/categories`      | List categories          |
| GET    | `/api/packages/continents`      | List continents          |
| GET    | `/api/packages/:slug`           | Get package by slug      |
| POST   | `/api/bookings`                 | Create a booking         |
| GET    | `/api/bookings/:id`             | Get booking by ID        |
| POST   | `/api/contact`                  | Submit contact form      |
| GET    | `/api/reviews/package/:id`      | Get reviews for a package |
| GET    | `/api/reviews/featured`         | Get featured reviews     |
| POST   | `/api/reviews`                  | Submit a review          |

## Pages

- **Home** – Hero section, stats, featured packages, popular destinations, testimonials, CTA
- **Packages** – Search, filter by category, sort, browse all packages
- **Package Detail** – Full details with tabs (overview, itinerary, reviews, booking form)
- **About** – Company story, values, team members
- **Contact** – Contact form and office information with map
- **404** – Custom not-found page
