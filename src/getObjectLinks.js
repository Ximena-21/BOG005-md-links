function getLinks(arrReadFiles) {

    const linkRegex = /(\[.*\])\((https?)(:\/\/[^\s\)]+)\)/g

    //se filtran solo los archivos que tengan contenido 
    const arrReadFilesWithData = arrReadFiles.filter((file) => {

        return file.data
    })

    //obtener los link de c/archivo
    const arrGetLinks = arrReadFilesWithData.map((file) => {
        const arrFindLinks = file.data.match((linkRegex))

        const objectLink = {
            links: arrFindLinks,
            path: file.path
        }

        return objectLink
    })

    //quitar null ^
    const linksWithoutNull = arrGetLinks.filter(object => object.links)

    const arrObjectLinks = linksWithoutNull.map((object) => {
        
        const links = object.links
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

        return arrayObjectLink
    })

    //aplanar la mtriz^ 
    const arrObjLinksFlat = arrObjectLinks.flat(2)
    // console.log('array ded objetos de links', arrObjLinksFlat)
    return arrObjLinksFlat
}



export {
    getLinks
}