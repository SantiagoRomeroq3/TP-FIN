import React, { useEffect, useState } from 'react';

const ConfirmarCompra = () => {
  const [productos, setProductos] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const totalGuardado = parseFloat(localStorage.getItem('totalAPagar')) || 0;

    const productosConSeleccion = productosGuardados.map(producto => ({ ...producto, seleccionado: true }));

    setProductos(productosConSeleccion);
    setTotalAPagar(totalGuardado);
  }, []);

  const actualizarEstadoYLocalStorage = (nuevosProductos) => {
    const nuevoTotal = nuevosProductos.reduce((total, producto) => {
      return producto.seleccionado ? total + producto._cantidad * producto._precio : total;
    }, 0);

    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    localStorage.setItem('totalAPagar', nuevoTotal.toFixed(2));
    
    setProductos(nuevosProductos);
    setTotalAPagar(nuevoTotal);
  };

  const cambiarSeleccionProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].seleccionado = !nuevosProductos[index].seleccionado;
    actualizarEstadoYLocalStorage(nuevosProductos);
  };

  const confirmarCompra = () => {
    const productosSeleccionados = productos.filter(producto => producto.seleccionado);

    //Esto es para mostrar datos en la consola
    const productosSeleccionadosTexto = productosSeleccionados.map(producto => (
      `Producto: ${producto._nombre}, Cantidad: ${producto._cantidad}, Unidad: ${producto._unidad}, Precio c/u: ${producto._precio}`
    )).join('\n');

    console.log("Productos seleccionados:\n" + productosSeleccionadosTexto);
    console.log("Total a pagar:", totalAPagar.toFixed(2));

    alert('Compra Confirmada');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="confirmar-pago">
      <h1>Resumen de Compra <i className="fa-regular fa-clipboard"></i></h1>
      <table id="resumen">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio c/u</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={producto.seleccionado}
                  onChange={() => cambiarSeleccionProducto(index)}
                />
              </td>
              <td>{producto._nombre || 'Desconocido'}</td>
              <td>{producto._cantidad || '0'}</td>
              <td>{producto._unidad || 'Desconocida'}</td>
              <td>${(producto._precio || 0).toFixed(2)}</td>
              <td>${(producto._cantidad * producto._precio || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3><i className="fa-solid fa-coins"></i> Total a Pagar: ${totalAPagar.toFixed(2)}</h3>
      <button onClick={confirmarCompra}>Confirmar Compra <i className="fa-solid fa-check"></i></button>
    </div>
  );
};

export default ConfirmarCompra;
