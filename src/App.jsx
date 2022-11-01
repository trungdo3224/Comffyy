import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  HomePage,
  AboutPage,
  ErrorPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage
} from './pages';


function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/about' element={<AboutPage />} />

          <Route path='/cart' element={<CartPage />} />

          <Route path='/products/*' element={<ProductsPage />} />

          <Route path='/products/:id' element={<SingleProductPage />} />

          <Route path='checkout' element={<CheckoutPage />} />

          <Route path='*' element={<ErrorPage />} />
          
        </Routes>
      <Footer />
    </>
  )
}

export default App
