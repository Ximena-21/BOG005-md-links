import fetch from 'node-fetch'


//peticiones con fetch
function validateLink(matrizObjectLinks) {

    const validate = matrizObjectLinks.map((objectLink) => {
 
        return fetch(objectLink.href)
            .then((response) => {
  
                if (response.status >= 200 && response.status <= 399) {

                    objectLink.status = response.status,
                    objectLink.ok = '✅'
                    // console.log(objectLink)

                    return objectLink

                } else if (response.status >= 400 && response.status <= 499) {

                    objectLink.status = response.status,
                    objectLink.ok = '🚫'
                    // console.log('error link', objectLink)
                    // console.log(objectLink)
                    return objectLink
                }
            })
            .catch((error) => console.log(error))
    })

    return Promise.all(validate)
}

function statsLinks (links) {
    console.log({
        Total: links.length,
        Unique: new Set(links.map((link) => link.href)).size
    })
    return {
        Total: links.length,
        Unique: new Set(links.map((link) => link.href)).size //set coleccion de vlores unicos
    }
}

// statsValidatelinks(links)


function statsValidatelinks (links) {
    const failes = links.filter(link => link.ok == '🚫').length

    console.log( {
        Total: links.length,
        Unique: new Set(links.map((link) => link.href)).size,
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