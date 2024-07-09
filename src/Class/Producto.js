const CategoriasPermitidas = [
  'frutas/verduras', 'líquidos', 'pastas y arroces', 'otros'
];

class Producto {
  constructor(nombre, cantidad, unidad, precio, categoria) {
    this._nombre = nombre;
    this._cantidad = cantidad;
    this._unidad = unidad;
    this._precio = precio;
    this._categoria = categoria.toLowerCase(); 

    //Validar que categorías estan permitidas
    if (!CategoriasPermitidas.includes(this._categoria)) {
      throw new Error(`La categoría ${categoria} no está permitida.`);
    }

    //Validar la unidad permitida
    this.validarUnidad();
  }

  get nombre() {
    return this._nombre;
  }
  set nombre(value) {
    this._nombre = value;
  }

  get cantidad() {
    return this._cantidad;
  }
  set cantidad(value) {
    this._cantidad = value;
  }

  get unidad() {
    return this._unidad;
  }
  set unidad(value) {
    this._unidad = value;
    this.validarUnidad();
  }

  get precio() {
    return this._precio;
  }
  set precio(value) {
    this._precio = value;
  }

  get categoria() {
    return this._categoria;
  }
  set categoria(value) {
    this._categoria = value.toLowerCase();
    this.validarUnidad(); //Validar unidad al cambiar la categoría
  }

  get total() {
    return this._cantidad * this._precio;
  }

  //Validación de unidad permitida
  validarUnidad() {
    const unidadesPermitidas = {
      'frutas/verduras': ['unidades', 'libras'],
      'líquidos': ['unidades', 'litros'],
      'pastas y arroces': ['libras'],
      'otros': ['unidades', 'libras', 'litros']
    };

    if (!unidadesPermitidas[this._categoria].includes(this._unidad)) {
      throw new Error(`La unidad ${this._unidad} no está permitida para la categoría ${this._categoria}.`);
    }
  }
}

export default Producto;

