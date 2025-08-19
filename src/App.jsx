import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CollectionsPage from './pages/CollectionsPage'
import CarDetailsPage from './pages/CarDetailsPage'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/admin-gumesh7344961187879740' element={<AdminPage />} />
          <Route path='/collections' element={<CollectionsPage />} />
          <Route path='/car' element={<CarDetailsPage />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
