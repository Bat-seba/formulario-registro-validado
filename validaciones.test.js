// Importamos las expresiones regulares desde el script.js
const { regexEmail, regexTelefono, regexPass } = require('./script');

test('La Regex de Email debe validar correctamente', () => {
    expect(regexEmail.test('usuario@ejemplo.com')).toBe(true);
    expect(regexEmail.test('usuarioejemplo.com')).toBe(false); 
});

test('La Regex de Teléfono debe validar el formato +34 XXX-XXX-XXX', () => {
    expect(regexTelefono.test('+34 600-111-222')).toBe(true);
    expect(regexTelefono.test('600111222')).toBe(false); 
});

test('La Regex de Password debe exigir seguridad mínima', () => {
    expect(regexPass.test('Admin123!')).toBe(true);
    expect(regexPass.test('12345')).toBe(false); 
});

