widget.GetInfo = function () {
  return {
    name: "WindTurbineRowBuilder 2",
    desc: "Creates double rows of wind turbines in a defined area",
    author: "ChatGPT",
    date: "2024-08-31",
    license: "MIT",
    layer: 0,
    enabled: true,
  };
};

widget.MousePress = function (x: number, y: number, button: number): boolean {
  if (button === 1) {
    // Left mouse button
    if (IsMouseOverButton(x, y)) {
      isAreaSelectionActive = !isAreaSelectionActive;
      return true;
    } else if (isAreaSelectionActive) {
      const [_, pos] = Spring.TraceScreenRay(x, y, true);
      if (pos) {
        startX = pos[0];
        startZ = pos[2];
        return true;
      }
    }
  }
  return false;
};

widget.MouseRelease = function (x: number, y: number, button: number): boolean {
  if (
    button === 1 &&
    isAreaSelectionActive &&
    startX !== undefined &&
    startZ !== undefined
  ) {
    const [_, pos] = Spring.TraceScreenRay(x, y, true);
    if (pos) {
      endX = pos[0];
      endZ = pos[2];
      QueueWindTurbines();
      isAreaSelectionActive = false;
      return true;
    }
  }
  return false;
};

widget.DrawScreen = function (): void {
  DrawButton();
  if (isAreaSelectionActive && startX !== undefined && startZ !== undefined) {
    const [_, pos] = Spring.TraceScreenRay(Spring.GetMouseState());
    if (pos) {
      gl.Color([1, 1, 1, 0.3]);
      gl.Rect(startX, startZ, pos[0], pos[2]);
      gl.Color([1, 1, 1, 1]);
    }
  }
};

widget.Shutdown = function (): void {
  gl.Color([1, 1, 1, 1]); // Reset color on shutdown
};

const [screenX, screenY] = Spring.GetViewGeometry();
const buttonX = screenX * 0.4;
const buttonY = screenY * 0.1;
const buttonWidth = 100;
const buttonHeight = 50;
let isAreaSelectionActive = false;
let startX: number | undefined,
  startZ: number | undefined,
  endX: number | undefined,
  endZ: number | undefined;
const windTurbineDefID = UnitDefNames["armwin"].id; // Replace with appropriate unitDefID for wind turbines
const gapBetweenRows = 16; // Small gap between the rows

function DrawButton(): void {
  let buttonColor: Color = [0.5, 0.5, 0.5, 0.7]; // Default button color
  if (isAreaSelectionActive) {
    buttonColor = [0.7, 0.7, 0.7, 0.7]; // Pressed button color
  }

  gl.Color(buttonColor); // Set button color
  gl.Rect(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight);
  gl.Color([1, 1, 1, 1]); // Reset color to white
  gl.Text("Build Wind Rows", buttonX, buttonY, 16, "o");
}

function IsMouseOverButton(x: number, y: number): boolean {
  return (
    x > buttonX * screenX &&
    x < (buttonX + buttonWidth) * screenX &&
    y > buttonY * screenY &&
    y < (buttonY + buttonHeight) * screenY
  );
}

function QueueWindTurbines(): void {
  const selectedUnits = Spring.GetSelectedUnits();
  if (!selectedUnits || selectedUnits.length === 0) {
    return;
  }

  const dx = endX! - startX!;
  const dz = endZ! - startZ!;
  const length = Math.sqrt(dx * dx + dz * dz);
  const stepX = (dx / length) * 96; // 96 is the typical size of a wind turbine
  const stepZ = (dz / length) * 96;
  const numSteps = Math.floor(length / 96);

  for (let i = 0; i <= numSteps; i++) {
    const offsetX = i * stepX;
    const offsetZ = i * stepZ;
    const posX1 = startX! + offsetX;
    const posZ1 = startZ! + offsetZ;
    const posX2 = startX! + offsetX + gapBetweenRows;
    const posZ2 = startZ! + offsetZ + gapBetweenRows;

    for (const unitID of selectedUnits) {
      Spring.GiveOrderToUnit(
        unitID,
        -windTurbineDefID,
        [posX1, Spring.GetGroundHeight(posX1, posZ1), posZ1],
        ["shift"]
      );
      Spring.GiveOrderToUnit(
        unitID,
        -windTurbineDefID,
        [posX2, Spring.GetGroundHeight(posX2, posZ2), posZ2],
        ["shift"]
      );
    }
  }
}
