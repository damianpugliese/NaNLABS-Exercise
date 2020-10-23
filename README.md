# NaNLABS-Test

> NaNLABS-Test

&nbsp;  

## ***Español:***
&nbsp;
## Inicio Rápido  

Crear un archivo .env el carpeta server y añadir su MONGO_URI (url de MongoDB) y su JWT_SECRET (clave secreta de Jwt). Ej.: MONGO_URI=YOUR_MONGO_URI / JWT_SECRET=miclavesupersecreta.

``` bash
# Instalar dependencias (concurrently) en la carpeta raíz
npm install

# Instalar dependencias en la carpeta server (Express)
npm run server-install

# Instalar dependencias en la carpeta client (React)
npm run client-install

# Correr Cliente (client/React) y Servidor (server/Express) con concurrently simultáneamente
npm run dev

# Correr sólo el Servidor (Express) 
npm run server

# Correr sólo el Cliente (React) 
npm run client

# El Servidor (Express) corre en http://localhost:5000 y el Cliente (React) en http://localhost:3000
```

## Deployment

En el package.json de la carpeta raíz están creados los scripts para hacer el deploy a heroku

## Sitio Web Heroku

https://merntodolist.herokuapp.com/

## App Info

### Autor

Damián Pugliese

### Versión

1.0.0

### Licencia

Este proyecto tiene licencia MIT

---
&nbsp;

## ***English:***
&nbsp;
## Quick Start

Create a .env file in the server folder and add your MONGO_URI (MongoDB url) and your JWT_SECRET (Jwt secret key). Ex: MONGO_URI = YOUR_MONGO_URI / JWT_SECRET = mysupersecretkey.

``` bash
# Install dependencies (concurrently) in the root folder
npm install

# Install dependencies in the server folder(Express)
npm run server-install

# Install dependencies in the client folder (React)
npm run client-install

# Run Client (client / React) and Server (server / Express) simultaneously with concurrently 
npm run dev

# Run only the Server (Express) 
npm run server

# Run only the Client (React) 
npm run client

# The Server (Express) runs at http: // localhost: 5000 and the Client (React) at http: // localhost: 3000
```

## Deployment

In the package.json file at the root folder are the scripts to deploy the app to heroku

## Web Site Heroku

https://merntodolist.herokuapp.com/

## App Info

### Author

Damián Pugliese

### Version

1.0.0

### Licence

This project has licence MIT
