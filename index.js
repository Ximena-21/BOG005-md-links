import { getFiles } from "./src/getFileMd.js"
import { getLinks } from "./src/getObjectLinks.js"
import { readFile } from "./src/readFileMd.js"


function mdLinks(usrPath,option) {

    const arrFilesMd = getFiles(usrPath)
    
    const arrReadFiles = arrFilesMd.map((file) => readFile(file))

    //espere todas las promesas
    const arrayLinks = Promise.all(arrReadFiles)
    .then((arrayAnswersFiles) => {
        // console.log('respuesta de promesas',arrayAnswersFiles)
        return getLinks(arrayAnswersFiles) 
    })
    .catch((error) => {
        console.log(error)
    })
    return arrayLinks
}

mdLinks('/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otraCarpeta')



export{
    mdLinks 
}





