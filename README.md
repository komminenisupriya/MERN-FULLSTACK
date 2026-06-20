# AnimeVerse 🌌

A modern, full-stack MERN application for anime fans to search, filter, rate, review, and organize their favorite titles. This codebase has been structured cleanly to be highly readable, beginner-friendly, and perfect for university project evaluations or computer science interviews.

---

## 🚀 Key Features

1. **Authentication System**:
   - Secure User Registration and Login.
   - Password encryption using **bcryptjs** before storage.
   - Stateless session validation using **JSON Web Tokens (JWT)**.
   - Protected dashboard routes and custom admin dashboard views.

2. **Anime Catalog**:
   - Dynamic search by title keywords.
   - Fast filtering based on genre tags.
   - Star reviews (1 to 5) with custom comments.
   - Auto-computed average anime ratings upon review submissions/deletions.

3. **Personal User Dashboard**:
   - Displays profile overview stats.
   - Watchlist of favorite titles (easily updated or cleared).
   - Feed of all reviews written by the active user (with delete capabilities).

4. **Administrative Panels**:
   - Custom Admin Role access guards.
   - Create, Read, Update, and Delete (CRUD) operations on Anime titles directly.
   - Comprehensive audit list of all reviews left by any user in the system, with removal overrides.

5. **Premium Dark Theme**:
   - Semi-transparent glassmorphic panels and dark gradient backdrops.
   - Purple-to-blue neon glowing accents and responsive layouts.
   - Custom toast popups with zero external dependencies.

---

## 🛠️ Technology Stack

* **Frontend**: React.js (built on Vite), React Router DOM (v6), Axios (REST client), Bootstrap 5 (CSS & JS bundles)
* **Backend**: Node.js, Express.js (REST APIs, custom Middlewares, Router layouts)
* **Database**: MongoDB (Mongoose Object Document Mapper)
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs (password hashing)

---

## 📁 Folder Structure

```
mern/
├── backend/
│   ├── config/
│   │   └── db.js            # Mongoose database connection
│   ├── controllers/
│   │   ├── authController.js # Signup, login, profile, favorite toggle
│   │   ├── animeController.js# Anime lists, search/filter, Admin CRUD
│   │   └── reviewController.js# Submit review, calculate average score, delete review
│   ├── middleware/
│   │   └── authMiddleware.js # JWT payload decryption, Admin guards
│   ├── models/
│   │   ├── User.js          # User collection + schema + password hashing hooks
│   │   ├── Anime.js         # Anime collection schema
│   │   └── Review.js        # Review collection schema
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoint routing mappings
│   │   ├── animeRoutes.js   # Anime catalog routing mappings
│   │   └── reviewRoutes.js  # Review feedback routing mappings
│   ├── .env                 # Environment config variables
│   ├── package.json         # Backend node packages list
│   ├── seeder.js            # Auto-populates catalog, users, reviews
│   └── server.js            # Main backend entrance and server boot
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx   # Dynamic, responsive navigation bar
    │   │   ├── Footer.jsx   # Custom sticky footer
    │   │   └── AnimeCard.jsx# Reusable anime card with ratings and genres
    │   ├── pages/
    │   │   ├── Home.jsx         # Hero banner, quick-search redirector, top ratings
    │   │   ├── Login.jsx        # Glassmorphic Login form
    │   │   ├── Register.jsx     # Registration form with confirmations
    │   │   ├── AnimeList.jsx    # Browse catalog with genre tabs & searches
    │   │   ├── AnimeDetails.jsx # Poster image, ratings, reviews lists, post comment form
    │   │   ├── Dashboard.jsx    # Personal stats, watchlist, reviews history
    │   │   └── Admin.jsx        # Admin tab: Anime CRUD management & reviews moderation
    │   ├── services/
    │   │   └── api.js       # Axios configuration with request interceptor for JWT
    │   ├── App.jsx          # Main client router, Private routes, custom Toasts
    │   └── main.jsx         # React application entry node mounting styles
    ├── index.html           # HTML5 Entry file with SEO adjustments
    ├── package.json         # React packages and bundler configs
    └── vite.config.js       # Vite bundler parameters
```

---

## ⚡ Setup & Launch Instructions

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a local MongoDB instance running (usually at `mongodb://localhost:27017/`).

### 2. Backend Installation & Launch
1. Open a terminal, and change your directory to the `backend/` folder.
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Seed the database with sample data (creates starting anime list and logins):
   ```bash
   node seeder.js
   ```
4. Start the development server using nodemon:
   ```bash
   npm run dev
   ```
   *The backend will run on port `5000` (`http://localhost:5000`).*

### 3. Frontend Installation & Launch
1. Open a second terminal window, and change your directory to the `frontend/` folder.
2. Install client-side packages:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The Vite application will start on port `5173` (typically `http://localhost:5173` or `http://localhost:5174`). Open this link in your browser!*

---

## 🔑 Demo Account Credentials

Use the following logins to test the platform immediately after running `node seeder.js`:

* **Standard User Account**:
  * **Email**: `user@example.com`
  * **Password**: `userpassword123`
  *(Enables logging in, adding to favorites, writing reviews, and viewing your personalized dashboard).*

* **Administrator Account**:
  * **Email**: `admin@example.com`
  * **Password**: `adminpassword123`
  *(Enables full catalog editing/creation, adding new anime, editing titles, and deleting any user reviews in the system).*

---

## 🎓 CSE Interview Discussion Pointers

Here are key technical concepts implemented in this application that are frequently asked about in viva evaluations and interviews:

1. **Pre-Save Password Hashing**:
   - Discuss `backend/models/User.js` pre-save hook. Explain that we never store plain-text passwords. Mongoose hashes the user's password using `bcryptjs` automatically right before committing the document to MongoDB.

2. **JSON Web Tokens (JWT)**:
   - Discuss stateless authentication. When the user logs in, the backend creates a signed token containing their user ID (`jwt.sign()`). The client stores this in `localStorage` and embeds it in the `Authorization` header of all protected requests (`Bearer <token>`).
   - Mention the Axios Request Interceptor in `frontend/src/services/api.js` that automatically attaches this token to headers.

3. **Database Relationships & Mongoose Populating**:
   - Discuss how the User's `favorites` is an array of Mongoose Object IDs referencing the `Anime` collection (`ref: 'Anime'`). 
   - Explain how `User.findById(...).populate('favorites')` converts those IDs into the full anime documents dynamically on query.

4. **Dynamic Rating Computations**:
   - Explain that instead of hard-coding ratings, the backend recalculates the average score in `reviewController.js` using Mongo aggregations or array accumulation (`reduce`) each time a review is added or deleted, maintaining data consistency.
