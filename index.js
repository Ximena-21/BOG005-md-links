const fs = require('fs')
const path = require('path')

function pathAbsolute (route) {
    if(!path.isAbsolute(route)){
        console.log({rutaAbsolut: path.resolve(route)})
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
        if ((path.extname(routeAbsolut) === '.md') === false) {
            //es un directorio ?
            if (fs.statSync(routeAbsolut).isDirectory()) {
                console.log('es un directorio',fs.statSync(routeAbsolut).isDirectory())
                //tiene archivos?
                if (fs.readdirSync(routeAbsolut).length > 0) {
                    console.log('TIENE ARCHIVOS')
                    // filtre los md
                    console.log(filterFileMd(fs.readdirSync(routeAbsolut)))
                    return filterFileMd(fs.readdirSync(routeAbsolut))
                        // los lea
                    
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



