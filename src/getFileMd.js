//-----node methos------ (todos los metodos vienen de forma asincrona)

// const fs = require('fs') //traer modulo de fs, con el require.js , instalado por defecto
// const path = require('path') //para validar la ruta se usa el metodo path
// const links = require('./helpers')

import fs from 'fs'
import path from 'path'

//la ruta es de un directorio? ------> devuelve true/false
const isDir = (route) => fs.statSync(route).isDirectory()

//fx retorna la ruta absoluta
function getAbsolutePath(route) {
    if (path.isAbsolute(route)) {
        return route
    }
    return path.resolve(route)
}


//fx que recibe como argumento la ruta, la evalua y retorna una matriz con archivos md
//fx recursiva, ya que internamente evalua si es un directorio y su contenido si es
//directorio y asi sucesivamente 
function getFiles(route) {

    const routeAbsolut = getAbsolutePath(route)
    // console.log('routeAbsolute', routeAbsolut)

    //exite?
    if (fs.existsSync(routeAbsolut)) {
        // console.log('la ruta dada', routeAbsolut + ' es valida')

        //la ruta es un archivo md? ---> retorna el archivo en una matriz
        if ((path.extname(routeAbsolut) === '.md')) {
            //leer archivo md
            // console.log('Is file md to Read', [routeAbsolut])
            return [routeAbsolut]
        }
        //es un directorio? ---> true ---> inicia a leer el directorio y su contenido
        if (isDir(routeAbsolut)) {

            let arrayReadDir = []
            //lee el directorio --> retorna matriz con lectura
            const dirRead = fs.readdirSync(routeAbsolut)
            // console.log('lectura de la carpeta', routeAbsolut)

            //si el directorio tiene contenido
            if (dirRead.length > 0) {
                //filtra los que son directorios dentro de nvo array
                const onlyDirs = dirRead.filter((element) => {
                    return isDir(path.join(routeAbsolut, element)) //path.join metodo que devuelve una cadena de la ruta unida
                })
                //filtra los que son md ---> nvoArray
                const onlyFiles = dirRead.filter((file) => {
                    return (path.extname(file) === '.md')
                })
                //coje la matriz de los md, y convierte su ruta en absoluta
                const onlyFilesWithAbsolutePath = onlyFiles.map((file) => {
                    return path.join(routeAbsolut, file)
                })

                //se reescribe el array vacio, desestructurando y uniendo el contenido
                //del aarray vacio y los que son md(con su ruta absoluta)
                arrayReadDir = [...arrayReadDir, ...onlyFilesWithAbsolutePath]

                //los que son directorios ejecuta de nuevo la fx (recursividad)
                onlyDirs.forEach((folder) => {
                    const files = getFiles(path.join(routeAbsolut, folder))
                    arrayReadDir = [...arrayReadDir, ...files]
                })

                //al final de hacer todas las evaluaciones
                // retorna  la matriz que va a contener solo los archivos md
                return arrayReadDir

            }
            console.log('La carpeta esta vacia')
        }
        console.log('La ruta no contiene archivos .md')
    }
    else {
        console.log('Por favor ingrese una ruta valida')
    }
}


export {
    getFiles
}