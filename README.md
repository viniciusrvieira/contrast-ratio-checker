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

To calculate `luminance`:

```js
const crc = new ContrastRatioChecker()

const rgb = { red: 255, green: 129, blue: 0 }

crc.getLuminance(rgb) // result: 0.36960513804637335
```

To calculate `contrast ratio by luminance`:

```js
const crc = new ContrastRatioChecker()

const rgb1 = { red: 255, green: 129, blue: 0 }
const rgb2 = { red: 100, green: 0, blue: 58 }

const l1 = crc.getLuminance(rgb1)
const l2 = crc.getLuminance(rgb2)

//luminance order doesnt matter
crc.getContrastRatioByLuminance(l1, l2) // result: 5.235369975583679
```

To calculate `contrast ratio by RGB Object`:

```js
const crc = new ContrastRatioChecker()

const rgb1 = { red: 255, green: 129, blue: 0 }
const rgb2 = { red: 100, green: 0, blue: 58 }

crc.getContrastRatioByRgb(rgb1, rgb2) // result: 5.235369975583679
```

To calculate `contrast ratio by HEX string`:

```js
const crc = new ContrastRatioChecker()

const hex1 = "#e5e5e5"
const hex2 = "#ab0" //shorthands are accepted

crc.getContrastRatioByHex(hex1, hex2) // result: 1.698093107780376
```

### Validation

---

> WCAG 2.0 says that to a text be considered large, it needs 18pt or 14pt bold.
>
> `level AA (minimum)` says that if text is large, ratio needs to be `>= 3, otherwise >= 4.5`.
>
> `level AAA (enhanced)` says that if text is large, ratio needs to be `>= 4.5, otherwise >= 7`.
>
> **Source**:
>
> https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
>
> https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html

To get validation using `contrast ratio` as input:

```js
const crc = new ContrastRatioChecker()

const ratio = 4.7

crc.getWcagRatioValidation(ratio) // result: { WCAG_AA: true, WCAG_AAA: false }

//accepts as args: ratio, font size in px and bold (boolean)

crc.getWcagRatioValidation(ratio, 30) // result: { WCAG_AA: true, WCAG_AAA: true }
```

To get validation using `hex string` as input:

```js
const crc = new ContrastRatioChecker()

const hex1 = "#e5e5e5"
const hex2 = "#555" //shorthands are accepted

// ratio ~5.91

crc.getRatioValidationByHex(hex1, hex2) // result: { WCAG_AA: true, WCAG_AAA: false }

crc.getRatioValidationByHex(hex1, hex2, { fontSizePx: 19, bold: true }) // result: { WCAG_AA: true, WCAG_AAA: true }

// using custom ratios:

crc.getRatioValidationByHex(hex1, hex2, {
    fontSizePx: 19,
    bold: true,
    custom: 6,
}) // result: { WCAG_AA: true, WCAG_AAA: true, CUSTOM: false }
```

To get validation using `RGB Object` as input:

```js
const crc = new ContrastRatioChecker()

const rgb1 = { red: 255, green: 184, blue: 202 }
const rgb2 = { red: 120, green: 0, blue: 122 }

// ratio ~6.23

crc.getRatioValidationByRgb(rgb1, rgb2) // result: { WCAG_AA: true, WCAG_AAA: false }

crc.getRatioValidationByRgb(rgb1, rgb2, { fontSizePx: 19, bold: true }) // result: { WCAG_AA: true, WCAG_AAA: true }

// using custom ratios:

crc.getRatioValidationByRgb(rgb1, rgb2, {
    fontSizePx: 19,
    bold: true,
    custom: 6,
}) // result: { WCAG_AA: true, WCAG_AAA: true, CUSTOM: true }
```

### License

Copyright © 2023, [Vinícius R. Vieira](https://github.com/viniciusrvieira). Released under the [MIT License](/LICENSE).
