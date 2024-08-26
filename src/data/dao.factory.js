import argsUtil from "../utils/args.js";
import dbConnect from "../utils/db.js";

const persistence = argsUtil.persistence;
let dao = {};
//objeto que voy a cargar dinamicamente con las importaciones de los managers que correspondan

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    //voy a llenar dao con las importaciones de memory
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    const { default: cartsContactManagerMem } = await import(
      "./memory/CartContactManager.memory.js"
    );
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
      cartsContact: cartsContactManagerMem,
    };
    break;
  case "fs":
    console.log("connected to file system");
    //voy a llenar dao con las importaciones de fs
    const { default: productsManagerFs } = await import(
      "./fs/ProductManager.js"
    );
    const { default: cartsContactManagerFs } = await import(
      "./fs/CartContactManager.js"
    );
    const { default: usersManagerFs } = await import("./fs/UserManager.js");
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
      cartsContact: cartsContactManagerFs,
    };
    break;
  default:
    console.log("database connected");
    dbConnect();
    //por defecto manejemos mongo

    const { default: productsManagerMongo } = await import(
      "./mongo/managers/ProductsManager.mongo.js"
    );
    const { default: cartsContactManagerMongo } = await import(
      "./mongo/managers/CartContactManager.mongo.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UsersManager.mongo.js"
    );
    const { default: purchaseManagerMongo } = await import(
      "./mongo/managers/PurchasesManager.mongo.js"
    );    
   
    //se tienen que traer TODOS los manager de todos los recursos y ya tienen que estar HOMOLOGADOS
    //una vez que logré importar los managers, lleno el objeto dao con los recursos correspondientes
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
      cartsContact: cartsContactManagerMongo,
      purchase: purchaseManagerMongo,     
    };
    break;
}

export default dao;
