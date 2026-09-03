import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-study/:slug" element={<ProjectDetail contentType="caseStudy" />} />
      <Route path="/side-project/:slug" element={<ProjectDetail contentType="sideProject" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
