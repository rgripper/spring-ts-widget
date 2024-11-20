type Position = [number, number, number];

declare class Spring {
  static GetViewGeometry(this: void): LuaMultiReturn<[number, number]>;
  static GetMouseState(this: void): LuaMultiReturn<[number, number, boolean]>;
  static GetSelectedUnits(this: void): number[];
  static GetGroundHeight(this: void, x: number, z: number): number;
  static GiveOrderToUnit(
    this: void,
    unitID: number,
    order: number,
    params: number[],
    options?: (
      | "shift"
      | "ctrl"
      | "alt"
      | "right"
      | "meta"
      | "caps"
      | "mode"
      | "queue"
      | "passive"
    )[]
  ): void;

  static TraceScreenRay(
    this: void,
    args: LuaMultiReturn<
      [screenX: number, screenY: number, checkUnits: boolean]
    >
  ): LuaMultiReturn<[unknown, Position | null]>;
  static TraceScreenRay(
    this: void,
    screenX: number,
    screenY: number,
    checkUnits: boolean
  ): LuaMultiReturn<[unknown, Position | null]>;
}

type UnitDef = {
  name: string;
  id: number;
  humanName: string;
  xsize: number;
  zsize: number;
  height: number;
  speed: number;
  buildSpeed: number;
  buildDistance: number;
  buildRange: number;
  losRadius: number;
  airLosRadius: number;
  sonarRadius: number;
  seismicRadius: number;
  maxWaterDepth: number;
  maxSlope: number;
  maxVelocity: number;
  acceleration: number;
  breakRate: number;
  turnRate: number;
  footprintX: number;
  footprintZ: number;
  maxHealth: number;
  regenRate: number;
  metalCost: number;
  energyCost: number;
  buildTime: number;
  canAssist: boolean;
  canMove: boolean;
  canPatrol: boolean;
  canFight: boolean;
  canGuard: boolean;
  canCapture: boolean;
  canLoad: boolean;
  canCloak: boolean;
  canStockpile: boolean;
  canSelfD: boolean;
  canRepair: boolean;
};

declare const UnitDefNames: Record<string, UnitDef>;
