import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './paths/Home'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './paths/Login';
import Turmas from './paths/Turmas';
import Turma from './paths/Turma';
import MeuPerfil from './paths/MeuPerfil';
import { Toaster } from 'react-hot-toast';
import PostagensTurma from './paths/PostagensTurma';
import Header from './components/header/Header';

function App() {
  const [nome, setNome] = useState(localStorage.getItem("nome"));
  const [urlFoto, setUrlFoto] = useState(localStorage.getItem("url_foto"))

  return (
    <body className='bg-zinc-900 flex flex-col min-h-svh max-h-screen overflow-hidden'>
      <Toaster/>
    <AuthProvider>
      <Router>
        <Header nome={nome} urlFoto={urlFoto}/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setNome={setNome} setUrlFoto={setUrlFoto}/>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/turmas" element={<Turmas />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/turma/:idTurma" element={<Turma />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/postagensTurma/:idTurma" element={<PostagensTurma />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/MeuPerfil" element={<MeuPerfil setNome={setNome} setUrlFoto={setUrlFoto}/>} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AuthProvider>
    </body>
  );
}

export default App;
