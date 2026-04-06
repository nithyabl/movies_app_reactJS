# React Movies

A movie browsing app built with React.js, Appwrite, and Tailwind CSS. Browse trending movies, search titles, and explore content using the TMDB API.

## Tech Stack

- **React.js** — UI library
- **Appwrite** — Backend services (database)
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **React-use** — Utility hooks

## Features

- Browse popular movies
- Search movies by title
- Trending movies based on search activity
- Responsive, modern UI

## Quick Start

**Prerequisites:** [Node.js](https://nodejs.org/en) and npm

**Installation**

```bash
npm install
```

**Environment Variables**

Create a `.env.local` file in the project root:

```env
VITE_TMDB_API_KEY=

VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

Get your API key from [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) and set up a database on [Appwrite](https://appwrite.io/).

**Run**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.