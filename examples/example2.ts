import { ContrastRatioChecker } from "../src"

const hexColors = ["#454", "#d5d5d5"]

const crc = new ContrastRatioChecker()

const ratio = crc.getContrastRatioByHex(hexColors[0], hexColors[1])

const validation = crc.getRatioValidationByHex(hexColors[0], hexColors[1], {
    custom: 5,
})

console.log({ ratio, validation })
