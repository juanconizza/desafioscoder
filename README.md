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

ENDPOINTS: 

