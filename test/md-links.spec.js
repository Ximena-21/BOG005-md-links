import  { mdLinks }  from "../index.js"

const path = '/home/ximena21/programming/Md-links/test/testMock'
const emptyPath = '/home/ximena21/programming/Md-links/test/testMock/carpeta'
const noMdPath = '/home/ximena21/programming/Md-links/test/testMoc'

describe('mdLinks', () => {

  it('should be a funtion', () => {
    expect(typeof mdLinks).toBe('function')
  });

  it('should return empty folder', () => {
    const msg = mdLinks(emptyPath, {})
    expect(msg).toBe('La carpeta esta vacia')
  });

  it('should return path no-validate', () => {
    const msg = mdLinks(noMdPath, {})
    expect(msg).toBe('Por favor ingrese una ruta valida')
  });

  it('should return object of link', done => {
    mdLinks(path, {}).then((object)=>{
      const objExpect = [
        {
          href: 'https://nodejs.org/es/',
          text: '[Node.js]',
          file: '/home/ximena21/programming/Md-links/test/testMock/mock/tercerCarpeta/pepe.md'
        },
        {
          href: 'https://developers.google.com/v8/',
          text: '[motor de JavaScript V8 de Chrome]',
          file: '/home/ximena21/programming/Md-links/test/testMock/mock/tercerCarpeta/pepe.md'
        }
      ];
      expect(object).toEqual(objExpect)
      done();
    });
  });
});
