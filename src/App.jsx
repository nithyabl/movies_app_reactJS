import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Drawer from './components/Drawer.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Trending from './pages/Trending.jsx'
import Favorites from './pages/Favorites.jsx'
import MovieDetail from './pages/MovieDetail.jsx'

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Navbar onMenuClick={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </>
  )
}

export default App
