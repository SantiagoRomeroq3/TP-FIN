import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaCompra from './Components/ListaCompra';
import ConfirmarCompra from './Components/ConfirmarCompra';

const actualizarCategorias = (productos) => {
  return productos.map(producto => {
    if (producto.categoria === 'frutas') {
      producto.categoria = 'frutas/verduras';
    }
    return producto;
  });
};

const App = () => {
  useEffect(() => {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos = actualizarCategorias(productos);
    localStorage.setItem('productos', JSON.stringify(productos));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaCompra />} />
        <Route path="/confirmar-compra" element={<ConfirmarCompra />} />
      </Routes>
    </Router>
  );
};

export default App;

