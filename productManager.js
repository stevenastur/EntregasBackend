const fs = require("fs");

class ProductManager {
  constructor (){
    this.path = "./products.json"
    this.id = 1
    try {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
    } catch (error) {
        this.products = [];
    }
}

  async addProduct(title, description, price, thumbnail, code, stock) {
    const addNewProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
      this.products.push(addNewProduct);
      console.log("Producto agregado: ", addNewProduct);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
  }

  async getProducts() {
    try {
      const readFile = await fs.promises.readFile(this.path, "utf-8");

      const objetProduct = JSON.parse(readFile);

      return objetProduct;
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  }

  exists(id) {
    return this.products.find((product) => product.id === id);
  }

  async getProductById(id) {
    try {
      const productId = parseInt(id);

      const product = this.products.find((product) => product.id === productId);

      if (product) {
        return product;
      } else {
        console.error(`El ID "${id}" no existe.`);
        return null;
      }
    } catch (error) {
      console.error("Error al buscar por id", error);
      return null;
    }
  }

  async updateProduct(id, data) {
    const findById = this.products.findIndex((product) => product.id === id);

    if (findById === -1) {
      console.error("No se encontró el ID para ser actualizado");
      return null; 
    } else {
      const updateProduct = {
        ...this.products[findById],
        ...data,
        id: this.products[findById].id,
      };

      this.products[findById] = updateProduct;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      // console.log("Producto actualizado: ", updateProduct);
      return updateProduct;
    }
  }

  async deleteProduct(id) {
    const deleteProductById = this.products.findIndex(
      (product) => product.id === id);

    if (deleteProductById === -1) {
      console.error("No se encontro el ID para ser eliminado");
      return;
    } else {
      this.products.splice(deleteProductById, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      console.log(`Producto con el id ${id} ha sido eliminado con exito!`);
    }
  }
}
const products = new ProductManager();

async function addProductDetails() {
  await products.addProduct(
    "Papa blanca",
    "Papa blanca de alta calidad",
    600,
    "papaBlanca.jpg",
    "C002",
    70
  );

  await products.addProduct(
    "Papa negra",
    "Papa negra de alta calidad y economica",
    400,
    "papaNegra.jpg",
    "C003",
    30
  );

  await products.addProduct(
    "batata",
    "Deliciosa batata fresca",
    700,
    "batata.jpg",
    "C004",
    60
  );
  await products.addProduct(
    "Cebolla",
    "Cebolla blanca de alta calidad",
    900,
    "cebollaBlanca.jpg",
    "C017",
    80
  );
}
async function executeOperations() {
  await addProductDetails();

  console.log("Busqueda por ID: \n", await products.getProductById(1));
  console.log ("Producto actualizado: " , await products.updateProduct(3, {
    title: "Zanahoria",
    description: "Deliciosa zanahoria fresca",
    price: 300,
    thumbnail: "zanahoria.jpg",
    code: "C019",
    stock: 100
  }));
  console.log(await products.deleteProduct(1));
  console.log("Listado final:", await products.getProducts());// Listado final con producto modificado y id 1 eliminado
}


executeOperations();