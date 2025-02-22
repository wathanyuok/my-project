// backoffice/src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import { AdminRoutes } from './routes/adminRoute'
import { AuthProvider } from './contexts/AuthContext'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App