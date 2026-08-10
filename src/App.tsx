import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Projects } from './pages/Projects'
import { Skills } from './pages/Skills'

function App() {
  return (
    <Routes>
      {/* Every route nested here renders inside Layout's Outlet,
          so they all share the navbar and footer. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        {/* The * catches anything that matched nothing above. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
