//.....................  callbacks ...........
    //forma mas comun de controlar la asincronia en js
    //al arrayP se le añade el data, que viene en el argumento 
    //y cuando ternmine de ejecutar esto llama a la funcion callback 
    // que recibe un parametro (array modificado)


function addToArray (data, array, callback) {
    if(!array) {
        callback(new Error('No existe el array'), null)
    } 

    setTimeout(()=>{
        array.push(data)
        callback(null, array)
        
    },1000)
    
}
const array = [1,2,3]

addToArray(4, array, (err) =>{

    if(err) return console.log(err.message)
    console.log(array)
})

//si tuvieramos varias funciones anidaass pasaria ....CallBackHell(Pyramid of Doom).... 
    // addToArray(4, array, function (err) {
    //     if (err) ...
    //     addToArray(5, array, function (err) {
    //       if (err) ...
    //       addToArray(6, array, function (err) {
    //         if (err) ...
    //         addToArray(7, array, function () {
    //           // Hasta el infinito y más allá...
    //         })
    //       })
    //     })
    //   });


//para evitar lo anterior se hace el uso de las .... PROMESAS ....

    //la funcion crea un objeto Promise, que recibe como parametros resolve(se llama cuando la fx se ejecute correctamente)
        //y reject(cuando la funcion falle)

function addToArrayP (data, array) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            array.push(data)
            resolve(null, array)
        },1000) 

        if(!array) {
            reject(new Error('No existe el array'), null)
        } 
    })

    return promise
}

const arrayP = [1,2,3]

// addToArrayP(4, arrayP).then(()=>{
//     console.log(arrayP)
// })

//para corregir lo que sucede con el callbackHell 
    //se anidan promesas

addToArrayP(4, arrayP)
  .then(function () {
    return addToArrayP(5, arrayP);
  })
  .then(function () {
    return addToArrayP(6, arrayP);
  })
  .then(function () {
    return addToArrayP(7, arrayP);
  })
  .then(function () {
    console.log(arrayP);
  });


//para tratar errores en las promesas, se hace uso de la funcion catch 
  //esta funcion drecoje lo que enviamos en la funcion reject dentro de la promesa
  //y esta solo se invoca una vez, no cada llamda 

  const arrayp = ''

 
  
  addToArrayP(4, arrayp)
  .then(function () {
    return addToArrayP(5, arrayp);
  })
  .then(function () {
    return addToArrayP(6, arrayp);
  })
  .catch(err => console.log(err.message))