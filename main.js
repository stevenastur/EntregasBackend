class ProductManager {
  constructor() {
    this.products = [];
    let path = (this.path = "./desafio");
  }

  static id = 0;

  addProduct(newProduct) {
    const { title, description, price, thumbnail, code, stock } = newProduct
    
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.error(
          `el codigo "${code}" ya fue registrado, por favor utilizar otro.`
          );
          return;
        }
      }

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
    !this.exists(id)
      ? console.error(`El ID "${id}" no existe.`)
      : console.log(`El ID "${id}" fue encontrado con exito!`);
  }
}
const productos = new ProductManager();

//Primera llamado con arreglo vacio
console.log(productos.getProducts());

//Se agregarn productos
// productos.addProduct("title1", "description1", 4000, "image1", "abc123", 5);
// productos.addProduct("batata", "description2", 7000, "image2", "abc124", 11);
// productos.addProduct("cebolla", "description3", 2000, "image3", "abc125", 13);

const productData1 = {
  title: "Papa blanca",
  description: "Papa blanca de alta calidad",
  price: 600,
  thumbnail: "papaBlanca.jpg",
  code: "C002",
  stock: 70,
};

productos.addProduct(productData1);

const productData2 = {
  title: "Papa negra",
  description: "Papa negra de alta calidad y economica",
  price: 400,
  thumbnail: "papaNegra.jpg",
  code: "C003",
  stock: 30,
};

productos.addProduct(productData2);

const productData3 = {
  title: "batata",
  description: "Deliciosa batata fresca",
  price: 700,
  thumbnail: "batata.jpg",
  code: "C004",
  stock: 60,
};

productos.addProduct(productData3);

//Segunda llamada con 2 productos agregados
console.log(productos.getProducts());

//Valida CODE repetido + 2 productos
const productData4 = {
  title: "zanahoria",
  description: "Deliciosa zanahoria fresca",
  price: 300,
  thumbnail: "zanahoria.jpg",
  code: "C005",
  stock: 100,
};

productos.addProduct(productData4);

//Valida con busqueda por ID
productos.getProductById(2);

//Valida con busqueda por ID con error
productos.getProductById(9);
