type Color = [number, number, number, number];

interface Gl {
  Color(this: void, ...channels: Color): void;
  Rect(this: void, x1: number, y1: number, x2: number, y2: number): void;
  Text(
    this: void,
    text: string,
    x: number,
    y: number,
    size: number,
    options: string
  ): void;
}

declare var gl: Gl;
