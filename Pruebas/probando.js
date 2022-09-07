module.exports = () => {
    // ...
  };
  
  //traer modulo de fs, con el require.js , instalado por defecto
    //todos los metodos vienen de forma asincrona
  const fs = require('fs')
  
  function readFile (myPath, cb) {
    //funcion del fs para leer archivos
    fs.readFile(myPath, (err, data)=>{
      console.log(data.toString())
    })
  
  
  }
  
  //dirname para decrile que el archivo lo tenemos en el directorio
  readFile(__dirname + '/archivo.md')
  
  
  
  // .............. validar ruta de archivo absoluta o relativa ............
  
  //validar si la ruta es absoluta?, 
  //path.isAbsolute()método determina si path es una ruta absoluta.
  //devuelve un true si es absolute
  const path = require('path')
  
  function pathIsAbsolute (myPath) {
    if(path.isAbsolute(myPath)) {
      console.log('es absoluta',myPath)
    }else {
      //si no lo es convertirla a absoluta con el .resolve
      console.log('la ruta no es ab soluta, se tiene qeu convertir')
      const absolutePath = path.resolve(myPath)
      console.log('ruta convertida',absolutePath)
  
      //leer la extension de un archivo apartir de su ruta .extname
      const extPath = path.extname(absolutePath)
      console.log(extPath)
    }
  
    
  }
  
  pathIsAbsolute('archivo.md')
  
  
  //como saber si la ruta es de un dietorio
    //metodo stats.isDirectory(), devuelve un booleano
  
  // const fs = require('fs')
  
  //una manera de validar si es una carpeta... haciendo uso de throw
  function isDirectory (myPath){
    fs.stat(myPath, (err,stats) => {
      if(err) throw err
      
      if (stats.isDirectory()) {
        console.log("es una carpeta");
      } else {
          console.log("es un archivo");
      }
    })
  
  }
  
  isDirectory('archivo.md')
  isDirectory('carpetaPrueba')
  
  
  // otra manera de probar si es directorio, pero solo devuelve un true o false pero 
    //si lo valida y automaticamente lanza el error
   console.log( 'probando esto', fs.lstatSync('archivo').isDirectory() ) 
  
  
  
  
  
  
  
  
  
  