import fetch from 'node-fetch'

const mtizPrueba = [
    {
        href: 'https://nodejs.org/es/',
        text: '[Node.js]',
        file: '/home/ximena21/programming/BOG005-md-linkscarpetaPrueba/cualquierFile.md'
    },
    {
        href: 'https://nodejs.org/es/',
        text: '[Node.js]',
        file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/cualquierFile.md'
    },
    {
        href: 'https://nodejs.org/es/',
        text: '[Node.js]',
        file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/cualquierFile.md'
    },
    {
        href: 'https://nodejs.org/es/',
        text: '[Node.js]',
        file: '/home/ximena21/programming/BOG005-md-linkscarpetaPrueba/cualquierFile.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docsWeb/JavaScript/Reference/Global_Objects/Array/Reduce',
        text: '[Array.prototype.reduce() - MDN]',
        file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md'
    }
]

// validateLink(mtizPrueba)

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

// const links = [
//       {
//         href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
//         text: '[Arreglos]',
//         file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md',
//         status: 200,
//         ok: '✅'
//       },
//       {
//         href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
//         text: '[Array - MDN]',
//         file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md',
//         status: 404,
//         ok: '🚫'
//       },
//       {
//         href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
//         text: '[Array.prototype.sort() - MDN]',
//         file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md',
//         status: 200,
//         ok: '✅'
//       },
//       {
//         href: 'https://developer.mozilla.org/es/docsWeb/JavaScript/Reference/Global_Objects/Array/Reduce',
//         text: '[Array.prototype.reduce() - MDN]',
//         file: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md',
//         status: 404,
//         ok: '🚫'
//       },
// ]

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