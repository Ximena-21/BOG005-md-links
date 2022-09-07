#! /usr/bin/env node

import { mdLinks } from "./index.js"
import { validateLink, statsLinks, statsValidatelinks } from "./src/validateLinks.js"

const argv = process.argv //matriz con propiedades de la linea de comandos

mdLinks(argv[2], argv)
    .then((arrObjectLinks) => {
        if (argv.length < 3) {
            return arrObjectLinks
        }
        if (argv.includes('--validate') || argv.includes('--v')) {
            return validateLink(arrObjectLinks)
        }
        if (argv.includes('--stats') || argv.includes('--s')) {
            return statsLinks(arrObjectLinks)
        }
        if ((argv.includes('--validate') || argv.includes('--v')) && (argv.includes('--stats') || argv.includes('--s'))) {
            return statsValidatelinks(arrObjectLinks)
        }
        console.log('envia una opcion valida')
    })
    .catch((error) => {
        console.log(error)
    })

