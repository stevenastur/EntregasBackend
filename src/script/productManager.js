import fs from "fs";

export class ProductManager {
  
  constructor (){
    this.path = "./src/db/products.json"
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
      // console.log("Producto agregado: ", addNewProduct);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
  }

  async getProducts() {
    try {
      const readFile = await fs.promises.readFile(this.path, "utf-8");

      return JSON.parse(readFile);

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
      // console.log(`Producto con el id ${id} ha sido eliminado con exito!`);
    }
  }
}
const products = new ProductManager();

