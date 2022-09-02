const fs = require('fs')
const path = require('path')

function pathAbsolute (route) {
    if(!path.isAbsolute(route)){
        console.log({relativaAbsoluta: path.resolve(route)})
        return path.resolve(route)
    }
    console.log('es absoluta',route)
    return route
}


getFileMd('carpetaPrueba')
// getFileMd('archivo.md')

function getFileMd (inputPath) {

    const routeAbsolut = pathAbsolute(inputPath)

    console.log('routeAbsolute',routeAbsolut)

    //exite?
    if (fs.existsSync(routeAbsolut)) {
        console.log('la ruta dada', routeAbsolut + ' es valida')
        // console.log('es un archivo md',!path.extname(routeAbsolut) === '.md')
        //si no tiene extension md
        if (!(path.extname(routeAbsolut) === '.md')) {
            //es un directorio ?
            if (fs.statSync(routeAbsolut).isDirectory()) {
                console.log('es un directorio',fs.statSync(routeAbsolut).isDirectory())
                //tiene archivos?
                if (fs.readdirSync(routeAbsolut).length > 0) {
                    console.log('TIENE ARCHIVOS')
                    // filtre los md
                    console.log(filterFileMd(fs.readdirSync(routeAbsolut)))
                    const arrayFilesMd = filterFileMd(fs.readdirSync(routeAbsolut))
                        // los lea
                    let arrayReadFiles = []
                    arrayFilesMd.map((pathFile) => {
                        //path.join metodo que devuelve una cadena de la ruta unida
                        const myPath = path.join(routeAbsolut,pathFile)
                        // console.log('imprimo cada ruta absoluta para cada archivo',myPath)
                        arrayReadFiles.push(myPath) 
                        console.log('imprimo cada ruta absoluta para cada archivo',myPath)
                        readFile(myPath)
                        // console.log('lectura con ReadFile',readFile(myPath))
                    })

                    Promise.all(arrayReadFiles).then((arrayRespuestas)=>{
                        console.log({Respuesta: arrayRespuestas})
                    })

                    // console.log({
                    //     archivosLeidosEnLista: arrayFilesMd
                    // })
                    //debe extraer los link de c/ file
                
                } else {
                    console.log('Carpeta vacia')
                }
            }
        } else {
            //leer archivo md
            console.log('es un archivo md')
            
        }
        
    } else {
        console.log('Por favor ingrese una ruta valida')
    }
} 

function filterFileMd (matriz) {
  
    let filesMd =  matriz.filter(file => path.extname(file) === '.md')
   
    return filesMd

}

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



  function readDir (dir) {

    let directory = fs.readdirSync(dir)//devuelve una matriz con los nombres de los archivos
  
     
    let filesMd =  directory.filter(file => path.extname(file) === '.md')
   
    return filesMd
  }


