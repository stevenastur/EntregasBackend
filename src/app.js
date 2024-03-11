import { ProductManager } from "./script/productManager.js";
import express from "express";

const app = express();

const PORT = 8080;

const DB = "./src/db/products.json";

const products = new ProductManager(DB);

app.use(express.urlencoded({ extended: true }));

//Bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de productos de verdulería!");
});

//Carga de products.json con opcion de limitar los resultados.
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;

    let allProducts = await products.getProducts();

    if (limit) {
      allProducts = allProducts.slice(0, limit);
    }

    res.send(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return [];
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const prod = await products.getProducts();
    const idFind = prod.find((prod) => prod.id === pid);

    if (idFind) return res.send(idFind);
  } catch (error) {
    console.log(error, "No se encontro el producto");
    res.status(500).send("Internal Server Error");
    return;
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
