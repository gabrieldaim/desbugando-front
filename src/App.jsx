import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/header_footer/Header'; 
import Footer from './components/header_footer/Footer'; 
import Home from './paths/Home'; 
import Turmas from './paths/Turmas';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './paths/Login';

function App() {
  return (
    <body className='bg-zinc-900 flex flex-col min-h-svh max-h-screen overflow-hidden'>
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/turmas" element={<Turmas />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
    </body>
  );
}

export default App;
