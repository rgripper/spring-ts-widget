interface Widget {
  MousePress(x: number, y: number, button: number): boolean;
  MouseRelease(x: number, y: number, button: number): boolean;
  DrawScreen(): void;
  Shutdown(): void;

  /**
   *  function widget:GetInfo()
   *     return {
   *         name = "WindTurbineRowBuilder",
   *         desc = "Creates double rows of wind turbines in a defined area",
   *         author = "ChatGPT",
   *         date = "2024-08-31",
   *         license = "MIT",
   *         layer = 0,
   *         enabled = true
   *     }
   * end
   */
  GetInfo(): {
    name: string;
    desc: string;
    author: string;
    date: string;
    license: string;
    layer: number;
    enabled: boolean;
  };
}

declare var widget: Widget;
