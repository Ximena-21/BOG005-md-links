import fs from 'fs'
import path from 'path'

//Es diirectorio?
const isDir = (route) => fs.statSync(route).isDirectory()

//fx retorna la ruta absoluta
function getAbsolutePath(route) {

    if (path.isAbsolute(route)) {
        // console.log('la ruta es absoluta')
        return route
    }
    console.log(path.resolve(route))
    console.log('RUTAS ABSOLUTA',  path.resolve(route))
    return path.resolve(route)
}


//obtener archivos .md
function getFiles(route) {

    const routeAbsolut = getAbsolutePath(route)

    //exite?
    if (fs.existsSync(routeAbsolut)) {

        //Es un archivo md?
        if ((path.extname(routeAbsolut) === '.md')) {
            return [routeAbsolut]
        }
        //es un directorio?
        if (isDir(routeAbsolut)) {

            let arrayReadDir = []
            //lee el directorio 
            const dirRead = fs.readdirSync(routeAbsolut)

            if (dirRead.length > 0) {
                //filtra los que son directorios dentro de nvo array
                const onlyDirs = dirRead.filter((element) => {
                    return isDir(path.join(routeAbsolut, element))
                })
                //filtra los que son md ---> nvoArray
                const onlyFiles = dirRead.filter((file) => {
                    return (path.extname(file) === '.md')
                })

                //convierte ruta absoluna nvos md
                const onlyFilesWithAbsolutePath = onlyFiles.map((file) => {
                    return path.join(routeAbsolut, file)
                })

                arrayReadDir = [...arrayReadDir, ...onlyFilesWithAbsolutePath]

                //recursividad los que son dir
                onlyDirs.forEach((folder) => {
                    const files = getFiles(path.join(routeAbsolut, folder))
                    arrayReadDir = [...arrayReadDir, ...files]
                })

                // console.log('array archivos md', arrayReadDir)
                return arrayReadDir

            }
            return 'La carpeta esta vacia'
        }
    }
    else {
        return 'Por favor ingrese una ruta valida'
    }
}


export {
    getFiles
}