class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  addProduct(title, description, price, image, code, stock) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.error(`el codigo "${code}" ya fue registrado, por favor utilizar otro.`);
        break;
      }
    }

    const newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
        ProductManager.id++;
        this.products.push({
            ...newProduct,
            id: ProductManager.id,
        });
    } else {
        console.error("Algun campo no esta completo, completelo por favor!");
    }

  }

  getProducts() {
    return this.products;
  }

  exists(id) {
    return this.products.find((producto) => producto.id === id);
  }

  getProductById(id) {
    !this.exists(id) ? console.error(`El ID "${id}" no existe.`) : console.log(`El ID "${id}" fue encontrado con exito!`);
  }
}
const productos = new ProductManager();

//Primera llamado con arreglo vacio
console.log(productos.getProducts());

//Se agregarn productos
productos.addProduct("title1", "description1", 4000, "image1", "abc123", 5);
productos.addProduct("title2", "description2", 7000, "image2", "abc124", 11);
productos.addProduct("title3", "description3", 2000, "image3", "abc125", 13);

//Segunda llamada con 2 productos agregados
console.log(productos.getProducts());

//Valida CODE repetido + 2 productos
productos.addProduct("title4", "description4", 1000, "image4", "abc123", 2);

//Valida con busqueda por ID
productos.getProductById(2);


//Valida con busqueda por ID con error
productos.getProductById(9);