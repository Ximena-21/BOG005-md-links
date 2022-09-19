#! /usr/bin/env node

import { mdLinks } from "./index.js"
import { validateLink, statsLinks, statsValidatelinks } from "./src/validateLinks.js"

const argv = process.argv //matriz con propiedades de la linea de comandos

mdLinks(argv[2], argv)
.then((arrObjectLinks) => {
        if (argv.length <= 3) {
            console.log(arrObjectLinks)
            return arrObjectLinks
        }

        if ((argv.includes('--validate') || argv.includes('--v')) && (argv.includes('--stats') || argv.includes('--s'))) {
           const validateStats = validateLink(arrObjectLinks).then((objLinksV)=>{
                return statsValidatelinks(objLinksV)
            })

            return validateStats
        }

        if (argv.includes('--validate') || argv.includes('--v')) {
            const validate = validateLink(arrObjectLinks).then((objLinksV)=>{
                console.log(objLinksV)
                return objLinksV
            })
           return validate
        }
        
        if (argv.includes('--stats') || argv.includes('--s')) {
            return statsLinks(arrObjectLinks)
        }
        
        console.log('envia una opcion valida')
    })
    .catch((error) => {
        console.log(error)
    })

