# DESAFIO 1 - Branch: sprint1

En este desafío armamos dos Clases constructuras para crear un array de Usuarios y de Productos para nuestro Backend. Tambien un método de read (lectura) para leer dicho array y mostrarlo por consola. 

Ejecutar en consola con el comando: node UserManager.js "o" node ProductManger.js

# DESAFIO 2 - Branch: sprint2

En este desafío se crearon 2 metodos de manejo de datos, uno en memoria y otro en archivos .json utilizando File System nativo de Javascript. 

El método de memoria está en la carpeta "memory" y se pued ejecutar por con sola con el comando "node" y el nombre del archivo.

El método fs se encuentra en la carpeta "files" y se puede ejecutar comentando o descomentando los metodos señalados al final del código con el comando "node" y el nombre del archivo correspondiente. 

Este método (fs) crea 2 archivos (products y users) segun corresponda con un array de objetos con la información de cada producto en venta o cada usuario registrado. 

# DESAFIO 3 - Branch: sprint3

En este desafío creamos un sevidor con el framework "Express js" para poder acceder a nuestras clases "Product Manager" y "User Manager" y poder utilizar el metodo GET para acceder mediante la URL a ciertos end points donde se retornan diferente información. 

Para la prueba luego de instalar las dependencias con el comando "npm install" y la dependencia de nodemon (npm i -D nodemon) 

Luego, utilizando el navedador en el puerto 8080 (localhost:8080) podemos acceder a las siguientes URLs: 

** ENDPOINTS ** : 

* Obtener todos los productos:

localhost:8080/api/products

* Obtener todos los productos filtrados por la categoria: 

localhost:8080/api/products?category="nombre de la categoria sin comillas"  (Muebles, Electrónica, Electrodomésticos, Deportes y Fitness)

* Obtener un producto por id:

localhost:8080/api/products/"id sin comillas" (ej: dd483ca53281b05cc2f7963c )

* Obtener todos los usuarios:

localhost:8080/api/users

* Obtener todos los usuarios con un determinado rol:

localhost:8080/api/users?role="rol sin comillas" (ej: admin, user)

* Obtener un usuario por su ID:

localhost:8080/api/users/"id sin comillas" (ej: bfe183fbaa6627663d723e49 )

# Challenge 1 -  Branch: challenge1

En esta primera entrega del proyecto final de desarollo la implementación de Router de Express para el correcto enrutamiento de la api y así poder dividirla en usuarios y productos. El mismo se encuentra en la carpeta "routers" donde tenemos la carpeta "api" y "views". 

Se implementaron endpoints de tipo get, post, put y delete tanto para usuarios como para productos.

Para probar los metodos se necesita la herramienta POSTMAN la cual puede descargarse de: https://www.postman.com/

A continuación dejamos las rutas correspondientes:

* Users:

GET (read), leer todos los usuarios:  localhost:8080/api/users
GET (readOne), leer 1 usuario usando el ID:  localhost:8080/api/users/:uid
POST (create), crear 1 usuario nuevo: localhost:8080/api/users
PUT (update), modificar un usuario por ID: localhost:8080/api/users/:uid
DELETE (destroy), eleminar un usuario por ID: localhost:8080/api/users/:uid

La estructura básica para probar los usuarios usando POSTMAN es un objeto JSON como muestra a continuación: 

{
    "name": "Pedro",
    "lastName": "Lopez",
    "dni": 34567890,
    "manzanaYLote": "3445",
    "phone": 5554564565,
    "email": "pedro@example.com",
    "password": "Password789",
}

(el ID y el role se generan de forma automática)

* Products:

GET (read), leer todos los productos:  localhost:8080/api/products
GET (readOne), leer 1 producto usando el ID:  localhost:8080/api/products/:pid
POST (create), crear 1 producto nuevo: localhost:8080/api/products
PUT (update), modificar un producto por ID: localhost:8080/api/products/:pid
DELETE (destroy), eleminar un producto por ID: localhost:8080/api/products/:pid

La estructura básica para probar los productos usando POSTMAN es un objeto JSON como muestra a continuación: 

{
    "title": "Impresora Multifunción WiFi",
    "photo": "impresora_multifuncion_wifi.jpg",
    "category": "Informática",
    "description": "Impresora multifunción WiFi con escáner y copiadora integrados. Imprime documentos y fotos desde cualquier dispositivo.",
    "price": 150,
    "stock": 1
    
}

El ID se genera automáticamente y si el stock no se coloca siempre marca 1 por defecto. 

Luego también se implementaron 4 Middlewares con el siguiente uso: 

* errorHandler.js: Maneja todos los errores de las estructuras try/catch tanto de users como de products. 
* pathHandler.js: Maneja todas las rutas que sean erroneas para arrojar un error predefinido 404.
* validateProductsProps.js. Valida que los campos obligatorios y validaciones adicionales de los productos además de dejar por defecto algunos valores si no se completan.
* validateUsersProps.js: Valida que los campos obligatorios y validaciones adicionales de los usuarios además de dejar por defecto algunos valores si no se completan.

También implementamos Morgan para poder llevar por consola un seguimientos de las acciones (GET, POST, PUT, DELETE) en tiempo real. 

# DESAFIO 4 - Branch: sprint4

En este desafío se implementó el uso de un sistema de plantillas llamado Handlebars para crear webs dinámicas y el uso de una dependencia llamada socket.io para crear un servidor TCP en simultaneo con el HTTP y podes renderizar los productos en tiempo real. 

En el inicio vemos que implementamos handlebars para renderizar todos los productos de forma inversa (reverse) para que se vean siempre los ultimos publicados desde el array de products se la base de datos. 

En el link de "Publicar un Producto" puede verse la implementación de TCP al podes subir un nuevo artículo. En este formulario se utilizó el metodo POST y se instaló una dependencia llamada Multer para poder subir las fotos al servidor y renombrarlo de manera que quede optimizada para SEO (utilizando el titulo que el usuario le da al articulo) y de esa forma agregarlo dinamicamente al json de productos utilizando el metodo de create() del file system implementado anteriormente. 

También se implementó la logica de uso de socket io para poder renderizar los productos en tiempo real invirtiendo el array para que se vean siempre los ultimos articulos publicados.  

En la vista de userPanel en la URL localhost:8080/panel/5f4622f176b53228532d4a51 (ejemplo con id de user) se puede ver que se verifica si hay un usuario con ese ID y si es así se le muestra la información del usuario registrado. Esto servirá mas adelante para crear el panel privado que cada usuario tendrá para acceder a los articulos publicados de cada uno. Otros ids de ejemplo que pueden probar son: cb21b4de175a5e3cc535b66d / 515a45be8a4e3b8ca70fdddc / ad1f164bdeedf7e255a6a8dc.

Por ultimo en el link de "Login / Registro" se implemento de momento solo un formulario que a futuro se utilizará para el registro de los nuevos usuarios. 

# DESAFIO 5 - Branch: sprint5

En este desafío se implemento la creación de un nuevo manager de "Cart Contact" que se utilizará en la app para crear un chat entre los vendedores y los compradores (ya que el sitio será al estilo de alamaula y olx). Donde si bien se podrá realizar un carrito de compras al finalizar el mismo abrirá conversación y notificará vía email a los interesados para que puedan hablar y contactarse por la plataforma. 

El Cart Contact Manager se implementó tanto en la persistencia Memory, File System y la nube de MongoDb. Se crearon los metodos CRUD con los modelos y clases constructoras correspondiente tanto para Cart Contact como también para Product Manager y User Manager.  

Luego se creó una ruta dentro de la api como /api/cart-contact donde se pueden probar los metods CRUD correspondientes con postman. 

También implementé la vista de producto en la ruta /products/pid donde se puede ver el resumen del producto y el botón agregar al carrito. También en el index se vinculó dinamicamente el id para que se pueda acceder a cada producto. 

La App quedó funcionando todo en la base de datos de la nube de Mongo Db y se importó la base de File System. Las colecciones creadas son: products, users, carts_contact.




