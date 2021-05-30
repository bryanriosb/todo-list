# todo-list
Es un proyecto compuesto por una aplicación web Angular 11, una app Ionic 5 Android y API REST con Spring Boot Framework para la gestión de tares clasificadas por proyectos y gesionados por roles (Administrador, Lider y Usuario).

## Caracteristicas Roles
Adminitrador: CRUD.
Lider: CR - Crea | Acualizar tareas y Obtiene información de usuarios.
Usuario: R - Obtine información de las tareas asignadas y Actualiza el progreso.

## Installation

API REST - Spring Boot
Antes de iniciar con la instalación es necesario la creación de la base de datos con PostgreSQL y nombre ```todo_db``` la cual deberá correr en el puerto que está por defecto ```5432```. En caso tal de tener la necesidad de modificar lo puedo lograr a través de archivo ```src/main/resources/application.properties```.

Se crearon pruebas unitarias para crear tres usuarios de prueba con los tres roles. Para logralo tan solo ejecuta el archivo que se muestra en la siguiente ruta.
```sh
todo-list/api-todo-list/src/test/java/com/todo/
ApiTodoListApplicationTests.java
```
Posterior a estos pasos puede levantar el servidor de Spring Boot.

Para la instalación del proyecto de ``` Angular 11```  e ``` Ionic 5``` , tenga en cuenta que se está usando ```@angular/cli@11``` y ```Node 12+```.

### Angular 
```
cd todo-list/todo-angular/
npm i
```

### Ionic 5
Este proeycto se desarrolló con ```Capacitor```
```
cd todo-list/todo-app/
npm i
```
APK
https://drive.google.com/file/d/1G42rs94yH8X1W_aevBxXlVmnC1KqEVKB/view?usp=sharing





