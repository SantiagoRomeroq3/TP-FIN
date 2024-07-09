import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Producto from '../Class/Producto'; 

const ListaCompra = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [productoNuevo, setProductoNuevo] = useState({
    nombre: '',
    cantidad: '',
    unidad: '',
    precio: '',
    categoria: ''
  });

  const agregarProducto = () => {
    const { nombre, cantidad, unidad, precio, categoria } = productoNuevo;

    try {
      const nuevoProducto = new Producto(nombre, parseFloat(cantidad), unidad, parseFloat(precio), categoria);
      setProductos([...productos, nuevoProducto]);
      const nuevoTotal = totalAPagar + (nuevoProducto.cantidad * nuevoProducto.precio);
      setTotalAPagar(nuevoTotal);

      setProductoNuevo({
        nombre: '',
        cantidad: '',
        unidad: '',
        precio: '',
        categoria: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const eliminarProducto = (index) => {
    const productoAEliminar = productos[index];
    const nuevoTotal = totalAPagar - (productoAEliminar.cantidad * productoAEliminar.precio);
    setProductos(productos.filter((_, i) => i !== index));
    setTotalAPagar(nuevoTotal);
  };

  const hacerPago = () => {
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('totalAPagar', totalAPagar.toFixed(2));
    navigate('/confirmar-compra');
  };

  const handleReset = () => {
    setProductoNuevo({
      nombre: '',
      cantidad: '',
      unidad: '',
      precio: '',
      categoria: ''
    });
    setProductos([]);
    setTotalAPagar(0);
  };

  return (
    <div className="App">
      <form id="lista" onReset={handleReset}>
        <h1>LISTA DE COMPRAS <i className="fa-solid fa-shop"></i></h1>
        
        <p>Ingrese los productos que desee comprar</p>

        <input 
          type="text" 
          id="nombre" 
          placeholder="Nombre del producto" 
          value={productoNuevo.nombre} 
          onChange={(e) => setProductoNuevo({ ...productoNuevo, nombre: e.target.value })} 
        />
        <input 
          type="number" 
          id="cantidad" 
          placeholder="Cantidad" 
          value={productoNuevo.cantidad} 
          onChange={(e) => setProductoNuevo({ ...productoNuevo, cantidad: e.target.value })} 
        />
        <select 
          id="unidad" 
          value={productoNuevo.unidad} 
          onChange={(e) => setProductoNuevo({ ...productoNuevo, unidad: e.target.value })}>
          <option disabled value="">Unidad de medida</option>
          <option value="unidades">Unidades</option>
          <option value="libras">Libras</option>
          <option value="litros">Litros</option>
        </select>
        <input 
          type="number" 
          id="precio" 
          placeholder="Precio" 
          value={productoNuevo.precio} 
          onChange={(e) => setProductoNuevo({ ...productoNuevo, precio: e.target.value })} 
        />
        <select 
          id="categoria" 
          value={productoNuevo.categoria} 
          onChange={(e) => setProductoNuevo({ ...productoNuevo, categoria: e.target.value })}>
          <option disabled value="">Categoría</option>
          <option value="frutas/verduras">Frutas/Verduras</option>
          <option value="líquidos">Líquidos</option>
          <option value="pastas y arroces">Pastas y Arroces</option>
          <option value="otros">Otros</option>
        </select>
        <button type="button" onClick={agregarProducto}>Agregar <i className="fa-solid fa-plus"></i></button>
        <button type="reset">Cancelar <i className="fa-solid fa-xmark"></i></button>
      </form>

      <h2>Productos</h2>
      <table id="productos">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio c/u</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.unidad}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
              <td>
                <button onClick={() => eliminarProducto(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3><i className="fa-solid fa-coins"></i> Total a Pagar: ${totalAPagar.toFixed(2)}</h3>
      <button onClick={hacerPago}>Ver carrito <i className="fa-solid fa-cart-shopping"></i></button>
    </div>
  );
};

export default ListaCompra;