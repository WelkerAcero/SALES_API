Instalación de dependencias: 
================================================================
npm install || npm i
================================================================
LISTA DE COMANDOS TYPESCRIPT Y DEPENDENCIAS PARA PROJECT
================================================================
npm init -y  -> inicializar proyecto con package.json
npm i -D typescript -> dependencias typescript
npx tsc --init  -> crea el tsconfig.json de typescript
npm i -D ts-node -> instala ts-node (dependencia de desarrollo) 

================================================================
USAREMOS EXPRESSJS PARA EXPONER LA API
================================================================
npm i express

================================================================
Los paquetes de Express y TypeScript son independientes. 
Consecuentemente, TypeScript no reconoce los tipos de las 
clases de Express. Existe un paquete npm en concreto para que 
TypeScript reconozca los tipos de Express.
================================================================
npm install dotenv@^16.0.3
npm i @types/express -s
npm i @types/node 
npm i @types/mysql
================================================================
Instalar Ngrok para exponer API Online: v4.3.3
npm i ngrok@v4.3.3

================================================================
================================================================
Instalación de Nodemon (Opcional)
================================================================
npm i nodemon

================================================================
Instalar el ORM de Prisma: v ^5.0.0
================================================================
npm install prisma@^5.0.0 --save-dev
npx prisma init --datasource-provider mysql
================================================================
El comando [npx prisma init --datasource-provider mysql]
crea una carpeta Prisma, ESTA CARPETA DEBE ELIMINARSE. 
Al clonar el repositorio nos provee de una Carpeta Database que
contiene el schema.prisma con toda la modelación.
================================================================

MIGRAR BASE DE DATOS MEDIANTE PRISMA:
      1. Se debe tener la base de datos creada con el nombre sales_api. Cotejamiento por defecto
      2. El archivo .env debe contener: DATABASE_URL="mysql://root:CLAVE_DE_LA_DB@localhost:3306/sales_api"
      3. Correr el comando: npm run migrate

Al correr el último comando, será igual que ejecutar: 
npx prisma migrate dev --name init --schema=./Database/schema.prisma
=================================================================
Se Instala Módulo de Yargs para crear modelos y controladores 
mediante comando de consola de forma automática:
=================================================================
npm i yargs@17.7.2
=================================================================

Para recibir un valor desde la consola y utilizarlo en un script 
del archivo package.json, puedes utilizar variables de entorno y 
la notación de cross-env para establecer el valor y pasarlo al 
script.

1. Instalación del paquete cross-env como una dependencia de 
desarrollo:
=================================================================
npm install --save-dev cross-env@7.0.3
=================================================================
EN CASO DE HABER BAJADO LOS CAMBIOS DE GIT, PUEDE SALTAR ESTE PASO.
2. En el archivo package.json, se debe modificar el script "model" para 
utilizar cross-env y la variable de entorno. 

Utilizar la notación:
${NOMBRE_VARIABLE} para referenciar la variable en el script:
      "scripts": {
            "model": "node ./config/modelConfig/app.js --model=$npm_config_model"
        },
        
Para asegurar de que el contenido del archivo Model.ts se genere con el 
formato correcto y esté correctamente indentado, puedes utilizar el método 
prettier para formatear el código automáticamente:

npm install --save-dev prettier@2.8.8 
===========================================================================

INSTALARA POLITICA DE CORS PARA EXPONER API:
===========================================================================
npm install cors
===========================================================================