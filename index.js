import { getFiles } from "./src/getFileMd.js"
import { getLinks } from "./src/getObjectLinks.js"
import { readFile } from "./src/readFileMd.js"
import { validateLink, statsLinks, statsValidatelinks } from "./src/validateLinks.js"

//fx lee todos los archivos de una matriz, usando readFile()
    //devuelve en una matriz, los archivos leidos
function mdLinks(usrPath,option) {

    //obtener archivos md
    const arrFilesMd = getFiles(usrPath)
    //leer cada archivo 
    const arrayPromises = arrFilesMd.map((file) => readFile(file))

    //devuelve un promise.all para que espere a que todas las promesas se obtengan
    const arrayLinks = Promise.all(arrayPromises)
    .then((arrayAnswers) => {
        return getLinks(arrayAnswers) //obtener {c/link} de archivos md
        // console.log('error debe enviar una opcion valida')
    })
    .then((arrObjectLinks)=>{
        if (option.validate === false || option.stats === false){
            console.log(arrObjectLinks)
            return arrObjectLinks
        }
        if (option.stats === true && option.validate === true){
            return statsValidatelinks(arrObjectLinks)
        }
        if (option.validate === true) {
            return validateLink(arrObjectLinks)
        }
        if(option.stats === true){
           return statsLinks(arrObjectLinks)
        }
        console.log('envia una opcion valida')
    })
    .catch((error) => {
        console.log(error)
    })
  
    // console.log(arrayLinks)
}

mdLinks('archivo.md', {stats:true, validate:false})



export{
    mdLinks 
}





