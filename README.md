# hex-to

A simple tool for converting hex color values to multiple different types.

## tl;dr (Getting Started)

Currently, hex-to is distributed via npm with no dependencies.

    npm install --save hex-to

## Usage

```javascript
const convert = require('hex-to');

console.log(convert('#644CEB').toRGB()); // `rgb(100, 76, 235)`
```

### Supported types

| Input   | toRGB() | toHSL() | toCMYK() | toHWB() | 
| ----------------- | :------: | :--------: | :-------------: | :-----------:|
| hex              |    ✅    |     ✅     |       ✅        |      ✅       |   

### Building Source Code
All code editing is done within the `\src` directory and when you are ready to try a new build just use `npm run build` and a new build will be created in the `\dist` directory.

### Unit Tests

Unit test have been done using a basic Jest implementation.  These tests can found under the `\test` directory and can be run using `npm run test`.

## Authors

* [Connor Hancovsky](http://connorhancovsky.com)


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
