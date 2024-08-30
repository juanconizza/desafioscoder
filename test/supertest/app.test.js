import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.utils.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

describe("Testing de MANANTIALES MARKET API", function () {
  this.timeout(20000);

  const userAdmin = {
    name: "Ana Esther",
    lastName: "Schreiner",
    dni: 327220002,
    blockAndLot: "3401",
    phone: 3516829095,
    email: "anatesting@gmail.com",
    password: "Audio123",
    role: 1,
    verify: true,
  };

  const user = {
    name: "Roberto",
    lastName: "Sinderecho",
    dni: 25451223,
    blockAndLot: "4401",
    phone: 3516957845,
    email: "roberto-sinderecho@gmail.com",
    password: "Audio123",
    verify: true,
  };

  const product = {
    title: "Producto de Prueba Testing",
    photo: "default_picture.png",
    category: "Electrónica",
    description: "producto de prueba en testing",
    price: 5000,
    stock: 3,
  };

  let token = "";
  let adminToken = "";

  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Creación de un producto por parte del usuario", async () => {
    const response = await requester
      .post("/products")
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Leemos el producto creado", async () => {
    const foundProduct = await productsRepository.readByRepository({
      title: product.title,
    });
    const response = await requester.get("/products/" + foundProduct._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Actualización de un producto por parte del usuario", async () => {
    const foundProduct = await productsRepository.readByRepository({
      title: product.title,
    });
    const response = await requester
      .put("/products/" + foundProduct._id)
      .send({
        title: "Producto de Prueba Testing",
        photo: "default_picture.png",
        category: "Electrónica",
        description: "Agregamos la Descripción",
        price: 5000,
        stock: 3,
      })
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un producto por parte del usuario", async () => {
    const foundProduct = await productsRepository.readByRepository({
      title: product.title,
    });
    const response = await requester
      .delete("/products/" + foundProduct._id)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Cerrado de sesión", async () => {
    const response = await requester
      .post("/sessions/logout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un producto sin haber iniciado sesión", async () => {
    const response = await requester.delete(
      "/products/66aa8eeb3077cb2132f4ee75"
    );
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Eliminación de un usuario sin haber iniciado sesión", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    const response = await requester.delete("/users/" + foundUser._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(401);
  });

  it("Inicio de sesión de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación de un usuario", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    const response = await requester
      .delete("/users/" + foundUser._id)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(403);
  });

  it("Registro de un usuario admin", async () => {
    const response = await requester.post("/sessions/register").send(userAdmin);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesión del usuario admin", async () => {
    const response = await requester.post("/sessions/login").send(userAdmin);
    const { _body, headers } = response;
    adminToken = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación del usuario no admin", async () => {
    const foundUser = await usersRepository.readByEmailRepository(user.email);
    const response = await requester
      .delete("/users/" + foundUser._id)
      .set("Cookie", adminToken);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Eliminación del usuario admin", async () => {
    const foundAdminUser = await usersRepository.readByEmailRepository(userAdmin.email);
    const response = await requester
      .delete("/users/" + foundAdminUser._id)
      .set("Cookie", adminToken);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
