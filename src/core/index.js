export class ContrastRatioChecker {
  constructor() {}

  getRelativeLuminanceComponent = (standardComponent) => {
    if (standardComponent <= 0.03928) return standardComponent / 12.92;

    return Math.pow((standardComponent + 0.055) / 1.055, 2.4);
  };

  getLuminance = (red, green, blue) => {
    const standardRed = red / 255;
    const standardGreen = green / 255;
    const standardBlue = blue / 255;

    const R = this.getRelativeLuminanceComponent(standardRed);
    const G = this.getRelativeLuminanceComponent(standardGreen);
    const B = this.getRelativeLuminanceComponent(standardBlue);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  getContrastRatioByLuminance = (l1, l2) => {
    const L1 = Math.max(l1, l2);
    const L2 = Math.min(l1, l2);

    return (L1 + 0.05) / (L2 + 0.05);
  };

  getContrastRatioByRgb = (rgb1, rgb2) => {
    try {
      const l1 = this.getLuminance(rgb1.red, rgb1.green, rgb1.blue);
      const l2 = this.getLuminance(rgb2.red, rgb2.green, rgb2.blue);

      return this.getContrastRatioByLuminance(l1, l2);
    } catch (err) {
      throw Error(`getContrastRatioByRgb failed. ${err}`);
    }
  };

  getContrastRatioByHex = (hex1, hex2) => {
    try {
      const rgb1 = this.convertHexToRgb(hex1);
      const rgb2 = this.convertHexToRgb(hex2);

      return this.getContrastRatioByRgb(rgb1, rgb2);
    } catch (err) {
      throw Error(`getContrastRatioByHex failed. ${err}`);
    }
  };

  convertHexToRgb(hex) {
    try {
      if (!this.isValidHex(hex)) {
        throw Error("Invalid hexadecimal string");
      }

      const hexadecimal = hex.slice(1);

      const fullHex =
        hexadecimal.length === 3
          ? hexadecimal
              .split()
              .map((char) => `${char}${char}`)
              .join()
          : hexadecimal;

      const hexParts = fullHex.match(/.{1,2}/g);

      const rgbObject = hexParts.reduce((prev, part, index) => {
        const decimal = parseInt(part, 16);

        switch (index) {
          case 0:
            prev.red = decimal;

            return prev;
          case 1:
            prev.green = decimal;

            return prev;

          case 2:
            prev.blue = decimal;

            return prev;
        }
      }, {});

      return rgbObject;
    } catch (err) {
      throw Error(`convertHexToRgb failed. ${err}`);
    }
  }

  isValidHex(hex) {
    try {
      if (!(typeof hex === "string")) throw Error("Only strings are accepted");

      const hexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/gi;

      return hexRegExp.test(hex);
    } catch (err) {
      throw Error(`isValidHex failed. ${err}`);
    }
  }
}
