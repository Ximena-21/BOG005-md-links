module.exports = () => {
  // ...
};

//traer modulo de fs, con el require.js , instalado por defecto
  //todos los metodos vienen de forma asincrona
const fs = require('fs')

function readFile (path, cb) {
  //funcion del fs para leer archivos
  fs.readFile(path, (err, data)=>{
    console.log(data.toString())
  })


}

//dirname para decrile que el archivo lo tenemos en el directorio
readFile(__dirname + '/archivo.md')



// .............. validar ruta de archivo absoluta o relativa ............

const path = require('path')



//validar si la ruta es absoluta?, 
  //path.isAbsolute()método determina si path es una ruta absoluta.
  //devuelve un true si es absolute
if(path.isAbsolute(path)) {
  //...
}

//si no lo es convertirla a absoluta con el .resolve
const absolutePath = path.resolve('relative path')





//leer la extension de un archivo apartir de su ruta .extname



