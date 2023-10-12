import { ContrastRatioChecker } from "../src"

const crc = new ContrastRatioChecker()

const rgbColors = [
    { red: 255, green: 184, blue: 202 },
    { red: 120, green: 0, blue: 122 },
]

const ratio = crc.getContrastRatioByRgb(rgbColors[0], rgbColors[1])

const validation = crc.getRatioValidationByRgb(rgbColors[0], rgbColors[1], {
    custom: 8,
    fontSizePx: 23,
    bold: false,
})

console.log({ ratio, validation })
