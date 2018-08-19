const hexTo = require('../dist/index');

test('converts hex to rgb string', () => {
  expect(hexTo('#644CEB').toRGB()).toBe('rgb(100, 76, 235)');
});

test('converts hex to cmyk string', () => {
  expect(hexTo('#232323').toCMYK()).toBe('cmyk(0%, 0%, 0%, 86%)');
});

test('converts hex to hsl string', () => {
  expect(hexTo('#00bfff').toHSL()).toBe('hsl(195, 100%, 50%)');
});

test('converts hex to hwb string', () => {
  expect(hexTo('#00bfff').toHWB()).toBe('hwb(195, 0%, 0%)');
});

test('converts hex to rgb object', () => {
  expect(hexTo('#232323').toRGB({ format: 'object' })).toEqual({
    red: 35,
    green: 35,
    blue: 35,
  });
});

test('converts hex to cmyk object', () => {
  expect(hexTo('#232323').toCMYK({ format: 'object' })).toEqual({
    c: 0,
    m: 0,
    y: 0,
    k: 86,
  });
});

test('converts hex to hsl object', () => {
  expect(hexTo('#00bfff').toHSL({ format: 'object' })).toEqual({
    h: 195,
    s: 100,
    l: 50,
  });
});

test('converts hex to hwb object', () => {
  expect(hexTo('#00bfff').toHWB({ format: 'object' })).toEqual({
    h: 195,
    w: 0,
    b: 0,
  });
});
