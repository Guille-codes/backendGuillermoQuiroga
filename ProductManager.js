const fs = require("fs");
const path = "./ProductManager.json";

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([], null, "\t"));
}

class ProductManager {
  #Products = [];

  constructor() {
    this.id = 0;
    this.path = "./ProductManager.json";
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));
  

    if (productosObjeto) {
      this.id++;
      const producto = {
        id: this.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const searchProduct = productosObjeto.find(
        (product) => product.code === code
      );
      console.log(searchProduct);

      if (
        !searchProduct &&
        title &&
        description &&
        price &&
        thumbnail &&
        code &&
        stock
      ) {
        productosObjeto.push(producto);
        fs.writeFileSync(
          this.path,
          JSON.stringify(productosObjeto, null, "\t")
        );
        console.log(`Evento 1 creado, id: ${this.id}`);
      } else {
        console.log("ERROR: Ya existe el producto con ese código.");
      }
    } else {
      this.id++;
      const producto = {
        id: this.id,
        title, 
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (title && description && price && thumbnail && code && stock) {
        
        fs.writeFileSync(this.path, JSON.stringify(producto));

        console.log(`Evento creado, id: ${this.id}`);
      } else {
        console.log("ERROR: Complete los datos de entrada.");
      }
    }
  }

  getProducts() {
    const prod = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    console.log(prod);
  }

  getProductById(idProduct) {
    const productosOb = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const producto = productosOb.find((evento) => evento.id === idProduct);

    if (!producto) {
      return console.log("No hay ningún producto.");
    }

    return console.log(producto);
  }

  updateProduct(idProduct, title, description, price, thumbnail, code, stock) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const findProducto = productosObjeto.find(
      (evento) => evento.id === idProduct
    );
    const indexProducto = productosObjeto.indexOf(findProducto);

    const product = {
      id: idProduct,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (findProducto) {
      if (title && description && price && thumbnail && code && stock) {
        productosObjeto.splice(indexProducto, 1, product);
        fs.writeFileSync(
          this.path,
          JSON.stringify(productosObjeto, null, "\t")
        );

        console.log(`Evento modificado - Id: ${this.id}`);
        return console.log(productosObjeto[indexProducto]);
      } else {
        console.log("ERROR: Complete los datos de entrada.");
      }
    } else {
      console.log(`El producto, id ${idProduct} no existe.`);
    }
  }

  deleteProduct(idProduct) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const findProducto = productosObjeto.find(
      (evento) => evento.id === idProduct
    );
    const indexProducto = productosObjeto.indexOf(findProducto);
    if (findProducto) {
      productosObjeto.splice(indexProducto, 1);
      fs.writeFileSync(this.path, JSON.stringify(productosObjeto, null, "\t"));
      console.log(`Se eliminó el producto, id ${idProduct}`)
    } else {
      console.log(`El producto, id ${idProduct} no existe. `);
    }
  }
}

// ----TESTING----

const admProductos = new ProductManager();

admProductos.getProducts()
admProductos.addProduct("Producto de prueba.","Este es un producto de prueba.",200,"Sin imagen","abc123",25)
admProductos.getProducts()
admProductos.getProductById(1)
admProductos.updateProduct(1,"Producto de prueba, actualizado.","Este es un producto de prueba",200,"Sin imagen","abc123",25)
admProductos.deleteProduct(1)

/*
const productos = [
  {
    title: "Remera Nike",
    description: "Remeras lisas.",
    price: "10000",
    thumbnail: "remeranike.com",
    code: "59",
    stock: "30",
  },
  {
    title: "Remera Adidas",
    description: "Remeras lisas.",
    price: "20000",
    thumbnail: "remeraadidas.com",
    code: "28",
    stock: "250",
  },
  {
    title: "Remera Puma",
    description: "Remeras lisas.",
    price: "8500",
    thumbnail: "remerapumas.com",
    code: "11",
    stock: "29",
  },
];
productos.map((el) => {
  admProductos.addProduct(
    el.title,
    el.description,
    el.price,
    el.thumbnail,
    el.code,
    el.stock
  );
});
//admProductos.getProductById(1)
//admProductos.updateProduct(2,"Remeras Pumas","las mas ricas y jugosas",100,"naranja.com",24,100);
//admProductos.deleteProduct(2)
//admProductos.getProducts()*/
