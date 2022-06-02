const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    fs.promises.writeFile(archivo, "");
  }
  async save(objeto) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      if (archivoGuardado.length === 0) {
        objeto.id = 1;
        await fs.promises.writeFile(this.archivo, JSON.stringify([objeto]));
      } else {
        archivoGuardado = JSON.parse(archivoGuardado);
        objeto.id = archivoGuardado.length + 1;
        archivoGuardado.push(objeto);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(archivoGuardado)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      let objetoEncontrado = archivoGuardado.find(
        (producto) => producto.id === id
      );
      if (objetoEncontrado) {
        console.log(objetoEncontrado);
      } else {
        console.log(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      console.log(archivoGuardado);
    } catch (error) {
      console.log(error);
    }
  }
  async deletById(id) {
    try {
      let archivoGuardado = await fs.promises.readFile(this.archivo, "utf-8");
      archivoGuardado = JSON.parse(archivoGuardado);
      archivoGuardado = archivoGuardado.filter((producto) => producto.id != id);
      fs.writeFileSync(this.archivo, JSON.stringify(archivoGuardado));
      console.log(archivoGuardado);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFileSync(this.archivo, "");
    } catch (error) {
      console.log(error);
    }
  }
}

let objeto1 = {
  title: "fideos",
  price: 200,
  url: "",
};
let objeto2 = {
  title: "ferenet",
  price: 1500,
  url: "",
};
let objeto3 = {
  title: "agua",
  price: 150,
  url: "",
};

const productos = new Contenedor("productos.txt");

async function asincrona() {
  try {
    await productos.save(objeto1);
    await productos.save(objeto2);
    await productos.save(objeto3);
  } catch (error) {
    console.log(error);
  }
}

asincrona();
// productos.getById(3);
// productos.getAll();
// productos.deletById(1);
// productkos.deleteAll();
