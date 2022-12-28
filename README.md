# ⚙️Markdown Links⚙️

## Índice

* [Resumen del proyecto](#resumen-del-proyecto)
* [Diagrama de flujo](#diagrama-de-flujo)
* [Instalación](#instalación)
* [Guía](#guía)
* [Tecnologias usadas](#tecnologías-usadas)
* [Autor](#Autor)
***

## Resumen del proyecto 📄

MdLinks es una herramienta de línea de comando(CLI) y una librería, que permite extraer los links de un archivo tipo Markdown(md), identifica los links que esten dentro de dichos archivos, y evalua cuales están funcionando y cuales están rotos. Adicionalmente entrega esta información al usuario como estadísticas, de la siguiente información:

  *Total de links* <br>
  *Links únicos* <br>
  *Links rotos* <br>

## Diagrama de flujo 📊

Diagrama de flujo, del paso a paso del paquete creado y lo que se queria obtener de él.

<img src="flujograma.png" width=700 >


## Instalación 🛠️

Para hacer uso de la librería ejecuta en la terminal el siguiente comando: 

  ```
  npm install md-linksPXAA21
  ```
  **Si tiene problemas con el anterior comando, ejecutelo pasandole la ruta de donde quedo clonado el proyecto Md-links**

luego deberas, de ejecutar el siguiente comando para que el ejecutable sea leido
  ```
  npm link
  ```


## Guía 📝 

Para utilizar esta librería puedes ejecutar los siguientes comandos, desde la terminal: 
  ```
 md-links <path> <options>
 ```

- options puede ser:

1. Si necesitas conocer y validar los link encontrados en archivos .md:
   ```
   md-links <path> --validate o --v
   ```

  ***Devuelve:***

  *{*<br>
      *`href`: URL encontrada.*<br>
      *`text`: Texto que aparecía dentro del link (`<a>`).*<br>
      *`file`: Ruta del archivo donde se encontró el link.*<br>
      *`status`: Código de respuesta HTTP.*<br>
      *`ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.*<br>
  *}*

2. Si necesitas conocer estadistica de cuantos link  se encontraron y cuantos son únicos:
    ```
   md-links <path> --stats o --s
   ```

   ***Devuelve:***

    *Total: 3 ; Unique: 3*

3. Si necesitas conocer, validar los link y devolver una estadisticas con los links rotos:
   ```
   md-links <path> --validate --stats o --v --s
   ```

   ***Devuelve:***

    *Total: 3 ; Unique: 3 ; Broken: 1*

4. si solo deseas conocer los link encontrados y donde fueron encontrados, ingresa:
   ```
   md-links <path>
   ```

   ***Devuelve:***

    *{*<br>
        *`href`: URL encontrada.*<br>
        *`text`: Texto que aparecía dentro del link (`<a>`).*<br>
        *`file`: Ruta del archivo donde se encontró el link.*<br>
    *}*

## Tecnologias usadas 💻
* [Node](https://nodejs.org/es/) - Utilizado para ejecutar javascript en consola
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguaje de programación
* [GitHub](https://github.com/)- Usado guardar el repositorio del proyecto

## 7. Autor 🖋️
* **Paula Ximena Anzola** - *Ingeniera ambiental / Frontend Developer* - [Proyectos](https://github.com/Ximena-21) 
