import fs from 'fs'

//fx lee los archivos ---> retorna promesa al leer
function readFile(pathFile) {
    return new Promise((resolve, reject) => {
        //metodo fs.readFile lee todo el archivo en el bufer, para cargar se necesita require()
            //fs.readFile(<nameFile or Path>, <codificacion, predeterminado(utf-8)>, <callback(el error si ocurre, contenido del archivo /data/)>)
        fs.readFile(pathFile, "UTF-8", (error, dataFile) => {
            if (error) {
                // reject(console.log(error)) 
                resolve({error: error})
            }
            console.log({
                data: dataFile,
                path: pathFile
            })
            resolve({
                data: dataFile,
                path: pathFile
            })
        })
    })
}

export {
    readFile
}