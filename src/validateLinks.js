import fetch from 'node-fetch'


//fx() , que hace la petiicion asincrona mediante la API fetch, la cual hace la peticion 
    //usando promesas
function validateLink(matrizObjectLinks) {
    // console.log(matrizObjectLinks)
    const validate = matrizObjectLinks.map((objectLink) => {
        // se le pasa la url a fetch, el cual se retorna ya que es una promesa 
            //es aceptada cuando haya rta y rechazada por un fallo de red o si 
            //no se completa la peticion
        return fetch(objectLink.href)
            .then((response) => {
                //la resuesta que nos devuelve la peticion contiene unas propiedades 
                //que nos trae informaciond de la feticion 
                if (response.status >= 200 && response.status <= 399) {

                    objectLink.status = response.status,
                    objectLink.ok = '✅'
                    console.log('link correcto', objectLink)

                    return objectLink

                } else if (response.status >= 400 && response.status <= 499) {

                    objectLink.status = response.status,
                    objectLink.ok = '🚫'
                    console.log('error link', objectLink)
                    return objectLink
                }
            })
            .catch((error) => console.log(error))
    })
    console.log(Promise.all(validate))
    return Promise.all(validate)
}


function statsLinks (links) {
    console.log({
        Total: links.length,
        Unique: new Set(links.map((href) => href)).size
    })
    return {
        Total: links.length,
        Unique: new Set(links.map((href) => href)).size //set coleccion de vlores unicos
    }
}

// statsValidatelinks(links)


function statsValidatelinks (links) {
    const failes = links.filter(link => link.ok === '🚫').length
    console.log( {
        Total: links.length,
        Unique: new Set(links.map((href) => href)).size,
        Broken: failes
    })
    return {
        Total: links.length,
        Unique: new Set(links.map((href) => href)).size,
        Broken: failes
    }
}

export {
    validateLink,
    statsLinks,
    statsValidatelinks,
}