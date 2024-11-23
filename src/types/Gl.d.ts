type Color = [number, number, number, number];

interface GL {
  Color(this: null, ...channels: Color): null;
  Rect(this: null, x1: number, y1: number, x2: number, y2: number): null;
  Text(
    this: null,
    text: string,
    x: number,
    y: number,
    size: number,
    options: string
  ): null;

  GetSun(): LuaMultiReturn<[number, number, number]>;
  GetSun(param: "pos"): LuaMultiReturn<[number, number, number]>;
  GetSun(param: "shadowDensity", unit?: string): number;
  GetSun(
    param: "diffuse",
    unit?: string
  ): null | LuaMultiReturn<[number, number, number]>;
  GetSun(
    param: "ambient",
    unit?: string
  ): null | LuaMultiReturn<[number, number, number]>;
  GetSun(
    param: "specular",
    unit?: string
  ): null | LuaMultiReturn<[number, number, number]>;

  GetAtmosphere(name: string): [number, number, number];

  GetWaterRendering(
    name: string
  ): null | LuaMultiReturn<[number, number, number]> | string | boolean;

  GetMapRendering(
    name: string
  ): null | LuaMultiReturn<[number, number, number]> | boolean;

  ConfigScreen(screenWidth: number, screenDistance: number): null;

  DrawMiniMap(transform?: boolean): null;

  SlaveMiniMap(mode: boolean): null;

  ConfigMiniMap(
    intPX: number,
    intPY: number,
    intSX: number,
    intSY: number
  ): null;

  GetViewSizes(): [number, number];

  Viewport(x: number, y: number, w: number, h: number): null;

  PushMatrix(): null;

  PopMatrix(): null;

  Translate(x: number, y: number, z: number): null;

  Scale(x: number, y: number, z: number): null;
  Scale(angle: number, x: number, y: number, z: number): null;

  Billboard(): null;

  MatrixMode(mode: number): null;

  LoadIdentity(): null;

  LoadMatrix(...args: number[] | [string]): null;

  // MultMatrix(...args: unknown[]): unknown;

  Ortho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): null;

  Frustum(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): null;

  // PushPopMatrix(...args: unknown[]): unknown;

  ClipPlane(
    intPlane: number,
    enableOrA?: boolean | number,
    B?: number,
    C?: number,
    D?: number
  ): null;

  //   /**
  //    * Clears the specified buffer(s).
  //    * @param buffer The buffer to clear (e.g., GL.DEPTH_BUFFER_BIT).
  //    * @param args Additional parameters for clearing.
  //    */
  //   Clear(buffer: gl.DEPTH_BUFFER_BIT, cleardepth?: number): null;
  //   Clear(buffer: gl.STENCIL_BUFFER_BIT, intClearStencil?: number): null;
  //   Clear(
  //     buffer: gl.COLOR_BUFFER_BIT | gl.ACCUM_BUFFER_BIT,
  //     r?: number,
  //     g?: number,
  //     b?: number,
  //     a?: number
  //   ): null;
  // }

  // declare namespace gl {
  //   const DEPTH_BUFFER_BIT: number;
  //   const STENCIL_BUFFER_BIT: number;
  //   const COLOR_BUFFER_BIT: number;
  //   const ACCUM_BUFFER_BIT: number;
  // }

  BeginEnd(
    GLType: number,
    callback: (...args: any[]) => null,
    ...args: any[]
  ): null;

  Color(r: number, g: number, b: number, a?: number): null;
  Color(colors: { r: number; g: number; b: number; a?: number }): null;

  Vertex(vertex: { x: number; y: number; z?: number; w?: number }): null;
  Vertex(x: number, y: number): null;
  Vertex(x: number, y: number, z: number): null;
  Vertex(x: number, y: number, z: number, w: number): null;

  Normal(normal: { x: number; y: number; z: number }): null;
  Normal(x: number, y: number, z: number): null;

  EdgeFlag(enable: boolean): null;

  Rect(x1: number, y1: number, x2: number, y2: number): null;

  TexRect(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    flipOrCoords?: [boolean, boolean] | [number, number, number, number]
  ): null;

  Shape(
    GLType: number,
    elements: Array<{
      v?: { x: number; y: number; z: number };
      n?: { x: number; y: number; z: number };
      t?: { x: number; y: number };
      c?: { r: number; g: number; b: number; a: number };
    }>
  ): null;

  SecondaryColor(color: { r: number; g: number; b: number }): null;
  SecondaryColor(r: number, g: number, b: number): null;

  FogCoord(value: number): null;

  // Display Lists
  CreateList(callback: (...args: any[]) => null, ...args: any[]): number;

  CallList(listID: number): null;

  DeleteList(listID: number): null;

  CreateVertexArray(
    numElements: number,
    numIndices: number,
    persistentBuffer?: boolean
  ): number;

  UpdateVertexArray(
    bufferID: number,
    elementPos: number,
    indexPos: number,
    data: Record<string, number[]> | ((...args: any[]) => null)
  ): boolean;

  RenderVertexArray(
    bufferID: number,
    primType: number,
    firstIndex?: number,
    count?: number
  ): boolean;

  DeleteVertexArray(bufferID: number): boolean;

  Text(
    text: string,
    x: number,
    y: number,
    size: number,
    options?: string
  ): null;

  GetTextWidth(text: string): number;

  GetTextHeight(text: string): [number, number, number] | null;

  BeginText(): null;
  EndText(): null;

  Unit(unitID: number, rawdraw?: boolean, intLOD?: number): null;

  UnitRaw(unitID: number, rawdraw?: boolean, intLOD?: number): null;

  UnitShape(
    unitDefID: number,
    teamID: number,
    rawState: boolean,
    toScreen: boolean,
    opaque: boolean
  ): null;

  UnitMultMatrix(unitID: number): null;

  UnitPieceMultMatrix(unitID: number, intPiece: number): null;

  UnitPiece(unitID: number, intPiece: number): null;

  UnitPieceMatrix(unitID: number, intPiece: number): null;

  Feature(featureID: number): null;

  FeatureRaw(featureID: number, rawdraw?: boolean, intLOD?: number): null;

  FeatureShape(
    featureDefID: number,
    teamID: number,
    custom: boolean,
    drawScreen: boolean,
    opaque: boolean
  ): null;

  FeatureMultMatrix(featureID: number): null;

  FeaturePieceMultMatrix(featureID: number, intPiece: number): null;

  FeaturePiece(featureID: number, intPiece: number): null;

  FeaturePieceMatrix(featureID: number, intPiece: number): null;

  DrawListAtUnit(
    unitID: number,
    listID: number,
    midPos?: boolean,
    scaleX?: number,
    scaleY?: number,
    scaleZ?: number,
    degrees?: number,
    rotX?: number,
    rotY?: number,
    rotZ?: number
  ): null;

  DrawFuncAtUnit(
    unitID: number,
    midPos: boolean,
    callback: (...args: any[]) => null,
    ...args: any[]
  ): null;

  Blending(enable: boolean | [number, number]): null;
  Blending(mode: string): null;

  BlendEquation(mode: number): null;

  BlendFunc(srcmode: number, dstmode: number): null;

  BlendEquationSeparate(modeRGB: number, modeAlpha: number): null;

  BlendFuncSeparate(
    srcRGB: number,
    dstRGB: number,
    srcAlpha: number,
    dstAlpha: number
  ): null;

  AlphaTest(enable: boolean | [number, number]): null;

  DepthTest(enable: boolean | number): null;

  Culling(enable: boolean | number): null;

  DepthClamp(enable: boolean): null;

  DepthMask(enable: boolean): null;

  ColorMask(masked: boolean): null;
  ColorMask(r: boolean, g: boolean, b: boolean, a: boolean): null;

  LogicOp(enable: boolean | number): null;

  Fog(enable: boolean): null;

  Smoothing(
    enable: boolean | number,
    enableLine?: boolean,
    enablePolygon?: boolean
  ): null;

  Scissor(enable: boolean): null;
  Scissor(x: number, y: number, w: number, h: number): null;

  LineStipple(any: string | boolean | [number, number]): null;

  PolygonMode(face: number, mode: number): null;

  PolygonOffset(enable: boolean | [number, number]): null;

  PushAttrib(attrib?: number): null;
  PopAttrib(): null;

  StencilTest(enable: boolean): null;

  StencilMask(mask: number): null;

  StencilFunc(func: number, ref: number, mask: number): null;

  StencilOp(fail: number, zfail: number, zpass: number): null;

  StencilMaskSeparate(face: number, mask: number): null;

  StencilFuncSeparate(
    face: number,
    func: number,
    ref: number,
    mask: number
  ): null;

  StencilOpSeparate(
    face: number,
    fail: number,
    zfail: number,
    zpass: number
  ): null;

  LineWidth(width: number): null;

  PointSize(size: number): null;

  PointSprite(
    enable: boolean,
    coord_replace?: boolean,
    coord_origin_upper?: boolean
  ): null;

  PointParameter(
    v1: number,
    v2: number,
    v3: number,
    sizeMin?: number,
    sizeMax?: number,
    sizeFade?: number
  ): null;

  Texture(texNum: number, enable: boolean): null;
  Texture(enable: boolean): null;
  Texture(name: string): boolean | null;

  CreateTexture(
    intXSize: number,
    intYSize: number,
    texProps?: {
      target?: number;
      format?: number;
      min_filter?: number;
      mag_filter?: number;
      wrap_s?: number;
      wrap_t?: number;
      wrap_r?: number;
      aniso?: number;
      border?: boolean;
      fbo?: boolean;
      fboDepth?: boolean;
      samples?: number;
    }
  ): string;

  DeleteTexture(texture: string): boolean;
  DeleteTextureFBO(texture: string): boolean;

  TextureInfo(texture: string): {
    xsize: number;
    ysize: number;
    alpha?: boolean;
    type?: number;
  } | null;

  MultiTexCoord(x: number, y?: number, z?: number, w?: number): null;
  MultiTexCoord(texCoords: {
    x: number;
    y?: number;
    z?: number;
    w?: number;
  }): null;

  TexEnv(target: number, pname: number, value: number): null;
  TexEnv(
    target: number,
    pname: number,
    var1: number,
    var2: number,
    var3: number
  ): null;

  MultiTexEnv(
    texNum: number,
    target: number,
    pname: number,
    value: number
  ): null;
  MultiTexEnv(
    texNum: number,
    target: number,
    pname: number,
    var1: number,
    var2: number,
    var3: number
  ): null;

  TexGen(target: number, state: boolean): null;
  TexGen(target: number, pname: number, value: number): null;
  TexGen(
    target: number,
    pname: boolean,
    var1: number,
    var2: number,
    var3: number
  ): null;

  MultiTexGen(texNum: number, target: number, state: boolean): null;
  MultiTexGen(
    texNum: number,
    target: number,
    pname: number,
    value: number
  ): null;
  MultiTexGen(
    texNum: number,
    target: number,
    pname: number,
    var1: number,
    var2: number,
    var3: number
  ): null;

  CopyToTexture(
    texture: string,
    intXOff: number,
    intYOff: number,
    intX: number,
    intY: number,
    intW: number,
    intH: number,
    target?: number,
    level?: number
  ): null;

  RenderToTexture(fboTexture: string, luaFunc: Function): null;

  GenerateMipmap(texture: string): boolean;

  UnitTextures(unitID: number, enable: boolean): boolean;
  UnitShapeTextures(unitDefID: number, enable: boolean): boolean;
  FeatureTextures(featureID: number, enable: boolean): boolean;
  FeatureShapeTextures(featureDefID: number, enable: boolean): boolean;

  SaveImage(
    x: number,
    y: number,
    w: number,
    h: number,
    filename: string,
    imgProps?: {
      alpha?: boolean;
      yflip?: boolean;
      grayscale16bit?: boolean;
      readbuffer?: number;
    }
  ): boolean | null;

  ReadPixels(
    x: number,
    y: number,
    w: number,
    h: number,
    format?: number
  ): { r: number; g: number; b: number; a?: number }[][] | null;

  Lighting(enable: boolean): null;

  ShadeModel(mode: number): null;

  Light(light: number, enable: boolean): null;
  Light(light: number, pname: number, param: number): null;
  Light(
    light: number,
    pname: number,
    param1: number,
    param2: number,
    param3: number
  ): null;

  Material(material: {
    ambient?: [number, number, number, number?];
    diffuse?: [number, number, number, number?];
    ambidiff?: [number, number, number, number?];
    emission?: [number, number, number, number?];
    specular?: [number, number, number, number?];
    shininess?: number;
  }): null;

  HasExtension(extname: string): boolean;

  GetNumber(ext: number, count: number): number[];
  GetString(ext: number): string;

  DrawGroundCircle(
    x: number,
    y: number,
    z: number,
    radius: number,
    divs: number,
    slope?: number
  ): null;

  DrawGroundQuad(
    x1: number,
    z1: number,
    x2: number,
    z2: number,
    useNorm?: boolean,
    tu1?: number,
    tv1?: number,
    tu2?: number,
    tv2?: number
  ): null;

  CreateQuery(): null | object;
  DeleteQuery(query: object): null;

  RunQuery(query: object, func: Function, ...args: any[]): null;

  GetQuery(query: object): number | null;

  ActiveTexture(texNum: number, func: Function, ...args: any[]): null;

  GetGlobalTexNames(): string[];
  GetGlobalTexCoords(
    threeDTextureName: string
  ): LuaMultiReturn<[number, number, number, number]>;

  UnsafeState(
    state: number,
    disableState: boolean,
    func: Function,
    ...args: any[]
  ): null;

  GetShadowMapParams(): LuaMultiReturn<[number, number, number, number]>;

  GetMatrixData(
    target: string | number,
    index?: number
  ): number | number[] | null;

  Flush(): null;
  Finish(): null;
}

declare var gl: GL;
