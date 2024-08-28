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
    "blockAndLot": "3445",
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


# Challenge 2 - Branch: challenge2

En este desafío de modificó principalmente mediante un plugin de moongoose el uso del método "Paginate" el cual nos permite organizar mejor los productos y la interacción entre el backend y front-end. 

Se modificó la pagina de inicio para mostrar productos paginados cada 8 por defecto. También se incluyeron botones de siguiente y anterior que estan condicionados a si existen o no paginas siguientes o anteriores. 

Se creó un filtro por categorías también paginado para podes ver las mismas. Las categoris con productos en el ejemplo son: Muebles, Electronica, Deportes, y Hogar. 

Se creó una vista premliminar de login para usuarios

Se creo una vist de carrito donde está hardcodeado un usuario comprador de la base al cual se le agregan todos los productos que se seleccionan con el botón agregar al carrito. 

El panel de usuario se puede ver en este ejemplo: http://localhost:8080/users/66298c2971a5c48e51f7ad5e


# DESAFÍO 6 - Branch: sprint6

En este desafío se agregaron bastantes cosas nuevas a la lógica del back-end. 

1- Se condicionó la barra de navegación para verificar si hay o no una sesión iniciada de usuario y de esa manera mostrar los botones correspondietes. Como en el caso del carrito que figura oculto hasta que se inicie sesión. También en la vista de producto se condicionó el botón "Agregar al carrito" para que si no está logueado no se muestre. 

2- Se dejó funcionando el formulario de registro con los correspondientes Middlewares de validación e iterando en cada error según corresponda para mostrarlo debajo de cada campo. 

3- Se dejó funcionando la vista de login también con los middlewares de validación correspondientes y en caso de ser exitoso redirige al panel de usuario tomando del req.session.user_id el id correspondiete del usuario en cuestión. 

4- Se dejó funcionando el botón de "logout" el cual destruye la sesión y vuelve al inicio. 

5- Se dejó funcionando la vista de carrito relacionado con cada usuario de forma dinámica. 

# DESAFÍO 7 - Branch: sprint7

En este desafío se restructuró basicamente el protocolo de registro y de login incorportando estrategias de passport locales con hash de la contraseña para reducir las cantidad de middlewares y optimizar el código. 

También se corrigió que la ruta de /user y de /cart en el router sessions tome el parámetro del objeto de requerimiento de sessions y no ya por params como se venía haciendo. 

Se agregó además a la barra de navegación, cuando se encuentra logeado la posibilidad de cerrar sesión o de volver al panel de usario mediante un menú desplegable. 

El punto de aplicar JWT no se implementó de momento ya que el middleware isAdmin no se está utilziando de momento para nada, ya que en el modelo que se plantea de e-commerce todos los usuarios pueden ser compradores o vendedores, con lo cual aún no está definido que más si va a poder hacer un user admin de otro que no lo es. Se implementará seguramente más adelante. 

# DESAFÍO 8 - Branch: sprint8

En este desafío se restructuraron los routers con el constructor de "Custom Router" para una mejor organización y escalabilidad. 

Se realizaron respuestas predeterminadas y políticas de autenticación "USER", "PUBLIC" y "ADMIN" para el manejo de permisos. 

También se implementó la validacón por JWT, eliminando las sessions de Mongo para validat todo con un token en el lado del cliente. 

Se crearon 2 nuevos endpoints: 

"/api/tickets" llamando al método correspondiente para calcular el total de la compra (agregation) el cual puede verse en el carrito, una vez logueado. 

"api/cart-contact/all" para vaciar y borrar el carrito del cliente.

# Challenge 3 - Branch: challenge_3

En este desafío se incorporó 2 sistemas de persistencia funcionando correctamente (excepto algunas limitaciones como en el caso de File System.) 

Mediante argunmentos y cambios de entorno se puede cambiar entre "npm run dev" o "npm run test". El mismo cambiará de puerto y de sistema de archivo siendo "dev" para mongo y "test" para file system. 

Luego también se incorporó la verificación vía email que sólo funciona con mongo debido a limitaciones de file system pero funciona correctamente. 

# DESAFIO 10 - Branch: sprint_10

En este desafío se crearon 1000 productos con la función "npm run product" que ejecuta un script para crear de forma aleatoria información usando una dependencia de "fakers" para traer información aleatoria. 

También se incorporó compresión al servidor. 

# DESAFIO 11 - Branch: sprint_11

En este desafío se implemento un Custom Logger utilizando la dependendencia "Winston". Se creó un endpoint "api/loggers" donde se puede probar que el logger está funcionando correctamente. 

Se condicionó que si se inicializa el servidor en entorno de desarollo sólo se muestra la consola con los diferentes Logs correspondientes. En cambio si se inicializa en producción entonces los errores se guardan también en un archivo dentro de utils/errors/errors.log

# DESAFIO 12 - Branch sprint_12

En este desafío se implementó la creación de las funciones y vistas para recuperar la contraseña mediante verificación con código por email. 

Para esto se crearon 2 nuevos endpoints de tipo POST y PUT en la ruta api/sessions/password y con sus respectivas vistas en handlebars desde la pagina de login con el link "Olvidé Mi Contraseña".

# DESAFIO 13 - Branch sprint_13

En este desafío se implmento  Swagger para crear la documentación de la API rest de los endpoints de los Productos. Proximamente se completará con los faltates de User, CartContact, entre otros. 

La documentación puede verse en la url de localhost correspondiente y luego /api/docs 

Recordar que en el caso que obtenga el error de "Bad Auth from Policies" debe loguearse con un usuario par probar correctamente la creación, modificacion y eliminación de un producto. 

# DESAFIO 14 - Branch sprint14

En este desafío se implementó una librería llamada supertest para realizar testing avanzados de un flujo del CRUD de product. El mismo puede probarse levantando el servidor con "npm run dev" y en otra terminal con "npm run supertest". 

También se impmentaron pruebas de stress del servidor mediante el uso de la librería Artillery el cual puede probarse levantando el servidor con "npm run dev" y en otra terminal usando "npm run stress". Luego con "npm run report" puede verse un html con el reporte y graficas de la prueba de stress. 
git 

# DESAFIO 15 - Branch sprint_15

En este desafío se implementó la pasarela de pagos de Stripe para procesar los pagos del carrito generando la lógica para verificar si los pagos fueron correctos y luego así crear la orden correspondiente. Se utilizaron cookies como medida de seguridad para evitar ataques de tipo cross-site-scripting. 

La tarjeta de prueba para procesar pagos es: 

Número de tarjeta: 4242 4242 4242 4242
Fecha Vencimiento: 03/25 o cualquiera posterios a la actual
Código de seguridad: 123

Luego de esto se muestra la pantalla de gracias y se verifica que el pago sea correcto, si es así podemos contactar a el o los vendedores dentro de la sección "Compras".

