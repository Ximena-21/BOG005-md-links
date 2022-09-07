import { getFiles } from "./src/getFileMd.js"
import { getLinks } from "./src/getObjectLinks.js"
import { readFile } from "./src/readFileMd.js"
import { validateLink, statsLinks, statsValidatelinks } from "./src/validateLinks.js"


function mdLinks(usrPath,option) {

    const arrFilesMd = getFiles(usrPath)
    
    const arrReadFiles = arrFilesMd.map((file) => readFile(file))

    //espere todas las promesas
    const arrayLinks = Promise.all(arrReadFiles)
    .then((arrayAnswersFiles) => {
        return getLinks(arrayAnswersFiles) 
    })
    // .then((arrObjectLinks)=>{
    //     if (option.validate === false ){
    //         console.log(arrObjectLinks)
    //         return arrObjectLinks
    //     }
    //     if (option.validate === true) {
    //         return validateLink(arrObjectLinks)
    //     }
    //     console.log('envia una opcion valida')
    // })
    .catch((error) => {
        console.log(error)
    })
  
    return arrayLinks
}

// mdLinks('carpetaPrueba', {validate:true})



export{
    mdLinks 
}





