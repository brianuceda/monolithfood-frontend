# Utiliza la imagen de Node.js 18.16.1 como base
FROM node:18.16.1 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Instala la versión específica de npm
RUN npm install -g npm@9.8.1

# Instala Angular CLI
RUN npm install -g @angular/cli@16.1.4

# Instala las dependencias del proyecto
RUN npm install

# Instala las dependencias adicionales
RUN npm install apexcharts ng-apexcharts
RUN npm install echarts -S
RUN npm install ngx-echarts -S
RUN npm install primeng

# Construye la aplicación para producción
RUN ng build --configuration production

# Utiliza la imagen de Apache
FROM httpd:latest

# Copia los archivos construidos al directorio público de Apache
COPY --from=build /app/dist/monolith-food-frontend /usr/local/apache2/htdocs/