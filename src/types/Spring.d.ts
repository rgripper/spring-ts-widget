type Position = [number, number, number];

declare class Spring {
  static GetViewGeometry(): LuaMultiReturn<[number, number]>;
  static GetMouseState(): LuaMultiReturn<[number, number, boolean]>;
  static GetSelectedUnits(): number[];
  static GetGroundHeight(x: number, z: number): number;
  static GiveOrderToUnit(
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
    args: LuaMultiReturn<
      [screenX: number, screenY: number, checkUnits: boolean]
    >
  ): LuaMultiReturn<[unknown, Position | null]>;
  static TraceScreenRay(
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
