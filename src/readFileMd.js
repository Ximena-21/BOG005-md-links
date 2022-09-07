import fs from 'fs'

//fx lee los archivos ---> retorna promesa al leer
function readFile(pathFile) {

    return new Promise((resolve, reject) => {
    
        fs.readFile(pathFile, "UTF-8", (error, dataFile) => {
            if (error) {
                // reject(console.log(error)) 
                resolve({error: error})
            }
     
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