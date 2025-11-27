import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Layout from './components/layout/Layout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AuthPage from './pages/AuthPage'
import HotelsPage from './pages/HotelsPage'
import HotelDetailPage from './pages/HotelDetailPage'
import SearchResultsPage from './pages/SearchResultsPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'
import BookingsPage from './pages/BookingsPage'
import PaymentPage from './pages/PaymentPage'
import PromotionsPage from './pages/PromotionsPage'
import ContactPage from './pages/ContactPage'
import NotificationsPage from './pages/NotificationsPage'
import TestAPI from './pages/TestAPI'
import TestPage from './pages/TestPage'
import SimpleHotelDetailPage from './pages/SimpleHotelDetailPage'
import HotelManagementPage from './pages/HotelManagementPage'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

// Auth Route Component (redirect to home if already logged in)
const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  return !isAuthenticated() ? children : <Navigate to="/" replace />
}

function App() {
  const { initializeAuth } = useAuthStore()
  
  // Initialize auth on app start
  React.useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/hotels" element={<Layout><HotelsPage /></Layout>} />
        <Route path="/hotels/:id" element={<Layout><HotelDetailPage /></Layout>} />
        <Route path="/simple-hotel/:id" element={<Layout><SimpleHotelDetailPage /></Layout>} />
        <Route path="/search" element={<Layout><SearchResultsPage /></Layout>} />
        <Route path="/promotions" element={<Layout><PromotionsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/favorites" element={<Layout><FavoritesPage /></Layout>} />
        <Route path="/test-api" element={<Layout><TestAPI /></Layout>} />
        
        {/* Auth Routes */}
        <Route path="/login" element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout><ProfilePage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Layout><BookingsPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/payment/:bookingId" element={
          <ProtectedRoute>
            <Layout><PaymentPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout><NotificationsPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/test" element={<Layout><TestPage /></Layout>} />
        <Route path="/admin/hotels" element={<HotelManagementPage />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App