# Contrast Ratio Checker

A package based on WCAG 2.0 to easily check contrast ratio.

The equations for luminance and contrast ratio are based on [WCAG 2.0](https://www.w3.org/TR/WCAG20/) as shown below:

https://www.w3.org/TR/WCAG20/#relativeluminancedef

http://www.w3.org/TR/WCAG20/#contrast-ratiodef

## Installation:

```
npm install contrast-ratio-checker
```

## Usage:

To calculate luminance:

```js
const crc = new ContrastRatioChecker()

const rgb = { red: 255, green: 129, blue: 0 }

crc.getLuminance(rgb) // expected result: 0.36960513804637335
```

To calculate contrast ratio by luminance:

```js
const crc = new ContrastRatioChecker()

const rgb1 = { red: 255, green: 129, blue: 0 }
const rgb2 = { red: 100, green: 0, blue: 58 }

const l1 = crc.getLuminance(rgb1)
const l2 = crc.getLuminance(rgb2)

//luminance order doesnt matter
crc.getContrastRatioByLuminance(l1, l2) // expected result: 5.235369975583679
```

To calculate contrast ratio by RGB Object:

```js
const crc = new ContrastRatioChecker()

const rgb1 = { red: 255, green: 129, blue: 0 }
const rgb2 = { red: 100, green: 0, blue: 58 }

crc.getContrastRatioByRgb(rgb1, rgb2) // expected result: 5.235369975583679
```

To calculate contrast ratio by HEX string:

```js
const crc = new ContrastRatioChecker()

const hex1 = "#e5e5e5"
const hex2 = "#ab0" //shorthands are accepted

crc.getContrastRatioByHex(hex1, hex2) // expected result: 1.698093107780376
```

### License

Copyright © 2023, [Vinícius R. Vieira](https://github.com/viniciusrvieira). Released under the [MIT License](/LICENSE).
