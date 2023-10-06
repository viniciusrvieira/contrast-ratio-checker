import { ContrastRatioChecker } from "../src"

const crc = new ContrastRatioChecker()

const contrastRatioByHex = crc.getContrastRatioByHex("#fff", "#000")
const contrastRatioByRgb = crc.getContrastRatioByRgb(
    { red: 255, green: 184, blue: 202 },
    { red: 0, green: 0, blue: 122 }
)

console.log({ contrastRatioByHex, contrastRatioByRgb })
