import { IRgb } from "./types"

export class ContrastRatioChecker {
    constructor() {}

    private isValidHex(hex: string): Boolean {
        try {
            const hexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/gi

            return hexRegExp.test(hex)
        } catch (err) {
            throw Error(`isValidHex failed. ${err}`)
        }
    }

    private getFullHex(hex: string): string {
        try {
            if (hex.length === 6) return hex

            return hex
                .split("")
                .map((char) => `${char}${char}`)
                .join("")
        } catch (err) {
            throw Error(`getFullHex failed. ${err}`)
        }
    }

    private separateStringPerCharGroup(
        string: string,
        groupBy: number
    ): string[] | null {
        try {
            const regExp = new RegExp(`.{1,${groupBy}}`, "g")

            return string.match(regExp)
        } catch (err) {
            throw Error(`separateStringPerCharGroup failed. ${err}`)
        }
    }

    private convertHexToRgb(hex: string): IRgb {
        try {
            if (!this.isValidHex(hex)) {
                throw Error("Invalid hexadecimal string")
            }

            const hexadecimal = hex.slice(1)

            const fullHex = this.getFullHex(hexadecimal)

            const hexParts: any = this.separateStringPerCharGroup(fullHex, 2)

            const rgbObject = hexParts.reduce(
                (prev: any, part: string, index: number) => {
                    const decimal = parseInt(part, 16)

                    switch (index) {
                        case 0:
                            prev.red = decimal

                            return prev
                        case 1:
                            prev.green = decimal

                            return prev

                        case 2:
                            prev.blue = decimal

                            return prev
                    }
                },
                {}
            )

            return rgbObject
        } catch (err) {
            throw Error(`convertHexToRgb failed. ${err}`)
        }
    }

    private getRelativeLuminanceComponent(standardComponent: number): number {
        try {
            if (standardComponent <= 0.03928) {
                return standardComponent / 12.92
            } else {
                return Math.pow((standardComponent + 0.055) / 1.055, 2.4)
            }
        } catch (err) {
            throw Error(`getRelativeLuminanceComponent failed. ${err}`)
        }
    }

    getLuminance(rgb: IRgb): number {
        try {
            const standardRed = rgb.red / 255
            const standardGreen = rgb.green / 255
            const standardBlue = rgb.blue / 255

            const R = this.getRelativeLuminanceComponent(standardRed)
            const G = this.getRelativeLuminanceComponent(standardGreen)
            const B = this.getRelativeLuminanceComponent(standardBlue)

            return 0.2126 * R + 0.7152 * G + 0.0722 * B
        } catch (err) {
            throw Error(`getLuminance failed. ${err}`)
        }
    }

    getContrastRatioByLuminance(l1: number, l2: number): number {
        try {
            const L1 = Math.max(l1, l2)
            const L2 = Math.min(l1, l2)

            return (L1 + 0.05) / (L2 + 0.05)
        } catch (err) {
            throw Error(`getContrastRatioByLuminance failed. ${err}`)
        }
    }

    getContrastRatioByRgb(rgb1: IRgb, rgb2: IRgb): number {
        try {
            const l1 = this.getLuminance(rgb1)
            const l2 = this.getLuminance(rgb2)

            return this.getContrastRatioByLuminance(l1, l2)
        } catch (err) {
            throw Error(`getContrastRatioByRgb failed. ${err}`)
        }
    }

    getContrastRatioByHex(hex1: string, hex2: string): number {
        try {
            const rgb1 = this.convertHexToRgb(hex1)
            const rgb2 = this.convertHexToRgb(hex2)

            return this.getContrastRatioByRgb(rgb1, rgb2)
        } catch (err) {
            throw Error(`getContrastRatioByHex failed. ${err}`)
        }
    }
}
