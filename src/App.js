import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Todo from './pages/Todo'
import Done from './pages/Done'
import NoMatch from './pages/NoMatch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Todo />} />
        <Route path="done" element={<Done />} />
        {/* 404 */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
