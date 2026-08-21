import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import TabNav from './components/TabNav'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Blog from './pages/Blog'
import Fun from './pages/Fun'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-paper">
      <Cursor />
      <TabNav />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/fun" element={<Fun />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
