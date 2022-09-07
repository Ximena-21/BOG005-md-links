
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

    //se filtra par quitar los null que se generaron con el .match al no encontrar links
    const linksWithoutNull = arrGetLinks.filter(object => object.links)


    const objectLinksPrueba = linksWithoutNull.map((object) => {
        const links = object.links

        // console.log('cada array de links de c/archivo md', links)
        const pathLink = object.path
        const onlyRegex = /(\[.*\])\((https?:\/\/[^\s\)]+)\)/

        const arrayObjectLink = links.map((link) => {
            const arrayLink = onlyRegex.exec(link)

            return {
                href: arrayLink[2],
                text: arrayLink[1].slice(0, 50),
                file: pathLink
            }
        })

        // console.log('matriz objeto d c/link ',arrayObjectLink)
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