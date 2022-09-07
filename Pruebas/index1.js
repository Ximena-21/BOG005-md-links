//-----node methos------
//todos los metodos vienen de forma asincrona

//traer modulo de fs, con el require.js , instalado por defecto
const fs = require('fs')
const path = require('path') //para validar la ruta se usa el metodo path


// process.argv (captura argumentos) obtiene matriz dell proceso ejecutable
//segundo elemento la ruta del archivo que se ejecuto
//const route = process.argv[1]



//............ Convertir ruta relativa en absoluta ..................

//path.isAbsolute()método determina si path es una ruta absoluta.
//devuelve un true si es absolute
function pathIsAbsolute(myPath) {

  if (path.isAbsolute(myPath)) {
    // console.log('es absoluta',myPath)
    return myPath
  } else {
    //si no lo es convertirla a absoluta con el .resolve
    // console.log('la ruta no es ab soluta, se tiene qeu convertir')
    const pathAbsolute = path.resolve(myPath)
    // console.log(pathAbsolute)
    return pathAbsolute
    /*   //leer la extension de un archivo apartir de su ruta .extname
      const extPath = path.extname(absolutePath)
      console.log(extPath) */
  }
}
// pathIsAbsolute('/home/ximena21/programming/BOG005-md-links/archivo.md')
// pathIsAbsolute('carpetaPrueba')



//............ validar si la ruta existe ..................
//fs.existsSync comprovbar de forma sincronica si un archivo existe en la ruta dada
const validatePath = (myPath) => fs.existsSync(myPath) ? console.log('la ruta dada', myPath + ' es valida') : console.log('Por favor ingrese una ruta valida') //devuelve valor booleano
// validatePath('/home/ximena21/programming/BOG005-md-links/archivo.md')



//saber si la ruta es md 

const fileMd = (myPath) => path.extname(myPath) === '.md' ? myPath : console.log('Archivo no compatible')
// fileMd('index.js')


//............ validar si la ruta es de una carpeta ..............

//como saber si la ruta es de un dietorio
//metodo stats.isDirectory(), devuelve un booleano

function isDirectory(myPath) {

  fs.stat(myPath, (err, stats) => {
    //lanza una excepcion throw
    if (err) throw err

    if (stats.isDirectory()) {
      console.log("es una carpeta", stats.isDirectory());
      return myPath
    } else {

      // console.log({
      //   EsDirectorio: stats.isDirectory() + ' Es un archivo'
      // })
    }
  })

}

isDirectory('archivo.md')
// isDirectory('carpetaPrueba')

// console.log({
//   EsDirectorio: fs.statSync('archivo.md').isDirectory()
// })

//................. leer un directorio ...............

//coivbierto la ruta en absoluta
const pathAbs = pathIsAbsolute('carpetaPrueba')


function readDir(dir) {

  //fs.readdirSync es el metodo para leer el contenido de un directorio sincronicamente
  let directory = fs.readdirSync(dir)//devuelve una matriz con los nombres de los archivos

  // console.log({
  //   directory: directory,
  //   largo: directory.length
  // })

  //filtrar solo los archivos md

  let filesMd = directory.filter(file => path.extname(file) === '.md')

  return filesMd
  // filesMd.forEach((file)=>{
  // })
}

//............. leer archivo ................

function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "UTF-8", (error, file) => {
      if (error) {
        // reject(console.log(error)) 
        resolve({ error: error })
      }
      // resolve(console.log(file))
      resolve(console.log({ succes: file }))
    })
  })
}

// readFile('/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md')

//descomentar
const arrayFilesMd = readDir(pathAbs)
//readDir('/home/ximena21/programming/BOG005-md-links/carpetaPrueba')
// console.log('arrayFilesMd',arrayFilesMd)

// const arrayFilesMdAbsolute = arrayFilesMd.map((path) => pathIsAbsolute (path))

// console.log(arrayFilesMdAbsolute)

//descomentar
/*   let arrayPromesas = []

arrayFilesMd.map((pathFile) => {
  //path.join metodo que devuelve una cadena de la ruta unida
  const myPath = path.join(pathAbs,pathFile)
  arrayPromesas.push(myPath)
  console.log('imprimo cada ruta absoluta para cada archivo',myPath)
  // readFile(myPath)
})

console.log(arrayPromesas)

Promise.all(arrayPromesas).then((arrayRespuestas)=>{
  console.log({Respuesta: arrayRespuestas})
}) */

// readFile('/home/ximena21/programming/BOG005-md-links/archivo.md')




// fs asyncrono
/* 
const fsa = require('fs/promises')

fsa.readFile(file,'utf-8')
.then((texto)=>{
  console.log(texto)
})
.catch((error)=>{
  console.log(error)
})


const arrayFilesMd = readDir('/home/ximena21/programming/BOG005-md-links/carpetaPrueba')

arrayFilesMd.forEach((file)=>{
  console.log(file)
  fsa.readFile(file,'utf-8')
  .then((texto)=>{
    console.log(texto)
  })
  .catch((error)=>{
    console.log(error)
  })
}) */


// ........... RECRSIVIDAD PARA VALIDAR LO QE HAY POR DENTRO DE LA CARPETA..........

const isDir = (route) => fs.statSync(route).isDirectory()

let lista = []

getFiles(pathAbs)
function getFiles(route) {
  //verificar si es un directorio y si lo es lo lea, y luego verifique
  //cada ruta si es un directorio y si es un directorio lo lea osea repita fx
  let arrayReadDir = []

  if (isDir(route)) {
    const dirRead = fs.readdirSync(route)
    console.log('lectura de la carpeta', route)

    if (dirRead.length > 0) {
      const onlyDirs = dirRead.filter((element) => {
        return isDir(pathIsAbsolute(path.join(route, element)))
      })

      const onlyFiles = dirRead.filter((file) => {
        return (path.extname(file) === '.md')
      })

      arrayReadDir = [...arrayReadDir, ...onlyFiles]


      onlyDirs.forEach((folder) => {
        const files = getFiles(pathIsAbsolute(path.join(route, folder)))
        arrayReadDir = [...arrayReadDir, ...files]
      })

      console.log({
        dirRead,
        onlyDirs,
        onlyFiles,
        route,
        arrayReadDir
      })
      return arrayReadDir

    }
  }
  else {
    return [route]
  }

}

//............... Obtener Links ..............

function getLinks(arrayFilesRead) {
  return new Promise((resolve, reject) => {
    let arrLinks = []
    arrayFilesRead.forEach((md) => {
      getObjects(md)
        .then((resp) => {
          arrLinks.push(resp)
          resolve(arrLinks.flat())
        })
    })
  })
}

//Funcion de extrear links
const getObjects = (file) => {

  return new Promise((resolve, reject) => {

    let arrContentObj = []
    let arrMatches = []

    const retMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    
    readFiles(file)
      .then((resp) => {
        arrMatches = resp.match((retMdLinks));
        if (arrMatches !== null) {
          const singleMatch = /\[([^\[]+)\]\((.*)\)/;
          arrMatches.forEach((link) => {
            const match = singleMatch.exec(link)
            arrContentObj.push({
              href: match[2],
              text: match[1].substring(0, 50),
              file,
            })
          })
          resolve(arrContentObj)
        } else {
          console.log(chalk.yellowBright.bold(`  
                        
          ███▀▀▀▀███████████████
          ██░░░░░▄██████████████
          █▌░░░░████░░██░░██░░██
          ██░░░░░▀██████████████
          ███▄▄▄▄███████████████
    Ups, no hemos encontrado ningún enlace en
    ${file}
          `));
        }
      })
      .catch((error) => console.log(error));
  })
}





// ------------------------ primer funcion que hice -------------------
// getFileMd('archivo.md')

// function getFilesMd(inputPath) {

//     const routeAbsolut = getAbsolutePath(inputPath)
//     console.log('routeAbsolute', routeAbsolut)

//     //exite?
//     if (fs.existsSync(routeAbsolut)) {
//         console.log('la ruta dada', routeAbsolut + ' es valida')
//         // console.log('es un archivo md',!path.extname(routeAbsolut) === '.md')
//         //si no tiene extension md

//         if ((path.extname(routeAbsolut) === '.md')) {
//             //leer archivo md
//             console.log('es un archivo md')
//             return [routeAbsolut]
//             /*           if (fs.statSync(routeAbsolut).isDirectory()) {
//                           console.log('es un directorio',fs.statSync(routeAbsolut).isDirectory())
//                           //tiene archivos?
//                           if (fs.readdirSync(routeAbsolut).length > 0) {
//                               console.log('TIENE ARCHIVOS')
//                               // filtre los md
//                               console.log(filterFileMd(fs.readdirSync(routeAbsolut)))
//                               const arrayFilesMd = filterFileMd(fs.readdirSync(routeAbsolut))
//                                   // los lea
//                               let arrayReadFiles = []
//                               arrayFilesMd.map((pathFile) => {
//                                   //path.join metodo que devuelve una cadena de la ruta unida
//                                   const myPath = path.join(routeAbsolut,pathFile)
//                                   // console.log('imprimo cada ruta absoluta para cada archivo',myPath)
//                                   arrayReadFiles.push(myPath) 
//                                   console.log('imprimo cada ruta absoluta para cada archivo',myPath)
//                                   readFile(myPath)
//                                   // console.log('lectura con ReadFile',readFile(myPath))
//                               })

//                               Promise.all(arrayReadFiles).then((arrayRespuestas)=>{
//                                   console.log({Respuesta: arrayRespuestas})
//                               })

//                               // console.log({
//                               //     archivosLeidosEnLista: arrayFilesMd
//                               // })
//                               //debe extraer los link de c/ file

//                           } else {
//                               console.log('Carpeta vacia')
//                           }
//                       } */
//         }

//         if (isDir(routeAbsolut)) {
//             const filesMd = getFiles(routeAbsolut)
//             return filesMd
//         }

//         console.log('La ruta no contiene archivos .md')

//     } else {
//         console.log('Por favor ingrese una ruta valida')
//     }
// }





module.exports = () => {
  // ...
};


//Vvalidar si es absoluta, si no convertirla
  //validar si es correcta
  //si la ruta es un directorio o archivo,
    //solo leer archivo md
  // si es directorio leer lo que tiene y evaluar si tiene mas directorios o solo archivos
    //solo leer archivo md


//extraer links






















