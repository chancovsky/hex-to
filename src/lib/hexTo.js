// @flow

export default class hexTo {
  alpha: number;
  hex: string;
  constructor(hex: string) {
    if (typeof hex !== 'string') {
      throw new TypeError('Expected a hex type of string');
    }

    this.hex = hex.replace(/^#/, '');
    this.alpha = 255;
  }

  toRGB(
    options: { format?: string } = {},
  ): { red: number, green: number, blue: number } | string {
    if (this.hex.length === 8) {
      this.alpha = parseInt(this.hex.slice(6, 8), 16) / 255;
      this.hex = this.hex.substring(0, 6);
    }

    if (this.hex.length === 4) {
      this.alpha = parseInt(this.hex.slice(3, 4).repeat(2), 16) / 255;
      this.hex = this.hex.substring(0, 3);
    }

    if (this.hex.length === 3) {
      this.hex =
        this.hex[0] +
        this.hex[0] +
        this.hex[1] +
        this.hex[1] +
        this.hex[2] +
        this.hex[2];
    }

    const num: number = parseInt(this.hex, 16);
    const red: number = num >> 16;
    const green: number = (num >> 8) & 255;
    const blue: number = num & 255;

    return options.format === 'object'
      ? { red: red, green: green, blue: blue }
      : `rgb(${red}, ${green}, ${blue})`;
  }

  toCMYK(
    options: { format: string } = { format: 'string' },
  ): string | { c: number, m: number, y: number, k: number } {
    const rgb:
      | string
      | { red: number, green: number, blue: number } = this.toRGB({
      format: 'object',
    });

    if (typeof rgb === 'string') {
      throw new TypeError('Expected rgb type of object');
    }

    const r: number = rgb.red / 255;
    const g: number = rgb.green / 255;
    const b: number = rgb.blue / 255;

    const max: number = Math.max(r, g, b);
    let k: number = 1 - max;

    const c: number = ((1 - r - k) / (1 - k)) * 100;
    const m: number = ((1 - g - k) / (1 - k)) * 100;
    const y: number = ((1 - b - k) / (1 - k)) * 100;
    k = Math.round(k * 100);
    return options.format == 'string'
      ? `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
      : { c: c, m: m, y: y, k: k };
  }

  toHSL(
    options: { format: string } = { format: 'string' },
  ): string | { h: number, s: number, l: number } {
    const rgb:
      | string
      | { red: number, green: number, blue: number } = this.toRGB({
      format: 'object',
    });

    if (typeof rgb === 'string') {
      throw new TypeError('Expected rgb type of object');
    }
    let h: number = 0;
    let l: number = 0;
    let s: number = 0;
    const r: number = rgb.red / 255;
    const g: number = rgb.green / 255;
    const b: number = rgb.blue / 255;
    const arr: Array<number> = [r, g, b];
    let min = r;
    let max = r;
    let maxColor = 0;

    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i + 1] <= min) {
        min = arr[i + 1];
      }
      if (arr[i + 1] >= max) {
        max = arr[i + 1];
        maxColor = i + 1;
      }
    }

    if (maxColor === 0) {
      h = (arr[1] - arr[2]) / (max - min);
    }
    if (maxColor == 1) {
      h = 2 + (arr[2] - arr[0]) / (max - min);
    }
    if (maxColor == 2) {
      h = 4 + (arr[0] - arr[1]) / (max - min);
    }

    if (isNaN(h)) {
      h = 0;
    }
    h = h * 60;
    if (h < 0) {
      h = h + 360;
    }
    l = (min + max) / 2;
    if (min == max) {
      s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
    }
    return options.format == 'string'
      ? `hsl(${Math.round(h)}, ${s * 100}%, ${l * 100}%)`
      : { h: Math.round(h), s: s * 100, l: l * 100 };
  }

  toHWB(
    options: { format: string } = { format: 'string' },
  ): string | { h: number, w: number, b: number } {
    const rgb:
      | string
      | { red: number, green: number, blue: number } = this.toRGB({
      format: 'object',
    });

    if (typeof rgb === 'string') {
      throw new TypeError('Expected rgb type of object');
    }

    const hsl: string | { h: number, s: number, l: number } = this.toHSL({
      format: 'object',
    });

    if (typeof hsl === 'string') {
      throw new TypeError('Expected hsl type of object');
    }

    const h: number = hsl.h;
    const w = (1 / 255) * Math.min(rgb.red, Math.min(rgb.green, rgb.blue));
    const b = 1 - (1 / 255) * Math.max(rgb.red, Math.max(rgb.green, rgb.blue));

    return options.format == 'string'
      ? `hwb(${h}, ${w * 100}%, ${b * 100}%)`
      : { h: h, w: w * 100, b: b * 100 };
  }
}
