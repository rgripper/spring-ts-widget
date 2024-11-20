type Color = [number, number, number, number];

interface Gl {
  Color(...channels: Color): void;
  Color(color: Color): void;

  Rect(x1: number, y1: number, x2: number, y2: number): void;
  Text(text: string, x: number, y: number, size: number, options: string): void;
}

declare var gl: Gl;
