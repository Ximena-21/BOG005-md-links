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
  function pathIsAbsolute (myPath) {

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

const fileMd =  (myPath) => path.extname(myPath) === '.md' ? myPath : console.log('Archivo no compatible')
// fileMd('index.js')


//............ validar si la ruta es de una carpeta ..............

//como saber si la ruta es de un dietorio
    //metodo stats.isDirectory(), devuelve un booleano

    function isDirectory (myPath){
       
      fs.stat(myPath, (err,stats) => {
        //lanza una excepcion throw
        if(err) throw err
        
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


function readDir (dir) {

  //fs.readdirSync es el metodo para leer el contenido de un directorio sincronicamente
  let directory = fs.readdirSync(dir)//devuelve una matriz con los nombres de los archivos

  // console.log({
  //   directory: directory,
  //   largo: directory.length
  // })

  //filtrar solo los archivos md

  let filesMd =  directory.filter(file => path.extname(file) === '.md')
 
  return filesMd
  // filesMd.forEach((file)=>{
  // })
}

//............. leer archivo ................

function readFile (pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "UTF-8", (error, file) => {
      if (error) {
        // reject(console.log(error)) 
        resolve({error: error})
      }
      // resolve(console.log(file))
      resolve(console.log({succes: file}))
    })
  })
}

// readFile('/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md')

const arrayFilesMd = readDir(pathAbs)
//readDir('/home/ximena21/programming/BOG005-md-links/carpetaPrueba')
// console.log('arrayFilesMd',arrayFilesMd)

// const arrayFilesMdAbsolute = arrayFilesMd.map((path) => pathIsAbsolute (path))

// console.log(arrayFilesMdAbsolute)

const arrayPromesas = arrayFilesMd.map((pathFile) => {
  //path.join metodo que devuelve una cadena de la ruta unida
  const myPath = path.join(pathAbs,pathFile)
  // console.log('imprimo cada ruta absoluta para cada archivo',myPath)
  readFile(myPath)
})

// Promise.all(arrayPromesas).then((arrayRespuestas)=>{
//   console.log({Respuesta: arrayRespuestas})
// })

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


//............... Obtener Links ..............

function getLinks (arrayFilesRead) {
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

  




















