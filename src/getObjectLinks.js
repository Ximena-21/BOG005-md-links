
const matriz = [
    {
    data: '## 2. Resumen del proyecto\n' +
    '\n' +
    'En este proyecto crearás una herramienta de línea de comando (CLI) así como tu\n' +
    'propia librería (o biblioteca - library) en JavaScript.\n' +
    '\n' +
    'En esta oportunidad nos alejamos un poco del navegador para construir un\n' +
    'programa que se ejecute usando Node.js. Aprenderemos sobre procesos\n' +
    '(`process.env`, `process.argv`, ...), cómo interactuar con el sistema archivos,\n' +
    'cómo hacer consultas de red, etc.\n' +
    '\n' +
    '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript\n' +
    'construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\n' +
    'Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,\n' +
    'ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder\n' +
    'interactuar con el sistema en sí, archivos, redes, ...\n' +
    '\n' +
    'Diseñar tu propia librería es una experiencia fundamental para cualquier\n' +
    'desarrollador porque que te obliga a pensar en la interfaz (API) de tus\n' +
    '_módulos_ y cómo será usado por otros developers. Debes tener especial\n' +
    'consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.',
  path: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/cualquierFile.md'
},
{
  data: '## 3. Objetivos de aprendizaje\n' +
    '\n' +
    'Reflexiona y luego marca los objetivos que has llegado a entender y aplicar en tu proyecto. Piensa en eso al decidir tu estrategia de trabajo.\n' +
    '\n' +
    '### JavaScript\n' +
    '\n' +
    '- [ ] **Diferenciar entre tipos de datos primitivos y no primitivos**\n' +
    '\n' +
    '- [ ] **Arrays (arreglos)**\n' +
    '\n' +
    '  <details><summary>Links</summary><p>\n' +
    '\n' +
    '  * [Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)\n' +
    '  * [Array - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)\n' +
    '  * [Array.prototype.sort() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)\n' +
    '  * [Array.prototype.forEach() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)\n' +
    '  * [Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)\n' +
    '  * [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)\n' +
    '  * [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)\n' +
    '</p></details>',
  path: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otroArchivo.md'
},
{
  data: '## Este proyecto se debe "resolver" de manera individual.\n' +
    '\n' +
    '* La **librería** y el **script ejecutable** (herramienta de línea de comando -\n' +
    '  CLI) deben estar implementados en JavaScript para ser ejecutados con\n' +
    '  Node.js. **Está permitido usar librerías externas**.',
  path: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otraCarpeta/unArchivomd.md'
},
{
  data: '',
  path: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/otraCarpeta/tercerCarpeta/pepe.md'
},
{
  data: '',
  path: '/home/ximena21/programming/BOG005-md-links/carpetaPrueba/segundaCarpeta/algo.md'
}

  ]

getLinks(matriz)
function getLinks(arrReadFiles) {

    const linkRegex = /(\[.*\])\((https?)(:\/\/[^\s\)]+)\)/g

    //se filtran solo los archivos que tengan contenido 
    const arrReadFilesWithData = arrReadFiles.filter((file) => {

        return file.data
    })

    // console.log(arrReadFilesWithData)

    //se lee la data de cada archivo para obtener los links
    //se obtienen los links de cada archivo
    const arrGetLinks = arrReadFilesWithData.map((file) => {
        const arrFindLinks = file.data.match((linkRegex))

        const objectLink = {
            links: arrFindLinks,
            path: file.path
        }

        return objectLink
    })
    console.log('matriz con objetos de links encontrados en c/archivo', arrGetLinks)

    //se filtra par quitar los null que se generaron con el .match al no encontrar links
    const linksWithoutNull = arrGetLinks.filter(object => object.links)


    const objectLinksPrueba = linksWithoutNull.map((object) => {
        const links = object.links

        // console.log('cada array de links de c/archivo md', links)
        const pathLink = object.path
        const onlyRegex = /(\[.*\])\((https?:\/\/[^\s\)]+)\)/

        const arrayObjectLink = links.map((link) => {
            const arrayLink = onlyRegex.exec(link)
            console.log(arrayLink)
            return {
                href: arrayLink[2],
                text: arrayLink[1].slice(0, 50),
                file: pathLink
            }
        })

        console.log('matriz objeto d c/link ',arrayObjectLink)
        return arrayObjectLink
    })

    // .flat aplana matrices anidadas [[1,2],[3,4],[5]] --> [1,2,3,4,5] 
    const arrObjLinksFlat = objectLinksPrueba.flat(2)

    // console.log(arrObjLinksFlat)

    return arrObjLinksFlat

}



export {
    getLinks
}