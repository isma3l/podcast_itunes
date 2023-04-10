### Aplicación web para la reproducción de podcasts de itunes

Esta prueba consiste en la creación de una mini-aplicación para escuchar podcasts musicales.

La aplicación tendrá únicamente tres vistas:

- Vista principal
- Detalles de un podcast
- Detalles de un capítulo de un podcast

##Pasos iniciales

Para probar la aplicación primero hay que clonar el repositorio del proyecto e instalar las dependencias.

###Clonar el repositorio
Ejecutar el siguiente comando:

`git clone `

###Instalar las dependencias
En la raíz del proyecto clonado ejecutar el siguiente comando:

`yarn install`

###Prueba de la aplicación
Para ejecutar la aplicación usaremos CORS Anywhere para acceder a los podcasts.

Como paso previo a la ejecución de la aplicación, hay que solicitar un acceso temporal en este link:
https://cors-anywhere.herokuapp.com/corsdemo

#### Prueba en modo development

En la raíz del proyecto ejecutar:

`yarn start`

Después de ejecutar el comando se ejecutará un servidor local en http://localhost:3000 y se abrirá el navegador con la aplicacion web.

#### Prueba en modo production

Para esta prueba se requiere empaquetar la aplicación y levantarla mediante un servidor local.

##### Empaquetar la aplicación

Ejecutar el siguiente comando:

`yarn build`

Una vez finalizada la compilación se creará una carpeta llamada build
Esta carpeta es la que se debe usar para realizar las pruebas.

####Sugerencia
Puedes usar el servidor [serve](https://www.npmjs.com/package/serve "serve")
Es sencillo de usar, sólo se debes instalarlo globalmente y pasarle la ruta de la carpeta build.

` yarn global add serve``
 `serve -s build`

Posteriormente para probara la aplicación hay que ingresar en http://localhost:3000/.
