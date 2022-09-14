import  { mdLinks }  from "../index.js"

const path = 'unaCarpeta/otraCarpeta'

describe('mdLinks', () => {

  it('should be a funtion', () => {
    expect(typeof mdLinks).toBe('function')
  });

  it('should return object of link', done => {
    mdLinks(path, {}).then((object)=>{
      const objExpect = [
        {
          href: 'https://nodejs.org/es/',
          text: '[Node.js]',
          file: '/home/ximena21/programming/BOG005-md-links/unaCarpeta/otraCarpeta/tercerCarpeta/pepe.md'
        },
        {
          href: 'https://developers.google.com/v8/',
          text: '[motor de JavaScript V8 de Chrome]',
          file: '/home/ximena21/programming/BOG005-md-links/unaCarpeta/otraCarpeta/tercerCarpeta/pepe.md'
        }
      ];
      expect(object).toEqual(objExpect)
      done();
    });
  });
});


//probar las otars funciones getFiles, readFile y getLinks y hacer que fallen
  // es decir hacer un test que si ingresan un string vacion falle