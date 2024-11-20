function widget:GetInfo()
    return {
        name = "WindTurbineRowBuilder",
        desc = "Creates double rows of wind turbines in a defined area",
        author = "ChatGPT",
        date = "2024-08-31",
        license = "MIT",
        layer = 0,
        enabled = true
    }
end

local screenX, screenY = Spring.GetViewGeometry()
local buttonX, buttonY, buttonWidth, buttonHeight = screenX * 0.4, screenY * 0.1, 100, 50
local isAreaSelectionActive = false
local startX, startZ, endX, endZ
local windTurbineDefID = UnitDefNames["armwin"].id -- Replace with appropriate unitDefID for wind turbines
local gapBetweenRows = 16 -- Small gap between the rows

local function DrawButton()
    local buttonColor = {0.5, 0.5, 0.5, 0.7} -- Default button color
    if isAreaSelectionActive then
        buttonColor = {0.7, 0.7, 0.7, 0.7} -- Pressed button color
    end

    gl.Color(unpack(buttonColor)) -- Set button color
    gl.Rect(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight)
    gl.Color(1, 1, 1, 1) -- Reset color to white
    gl.Text("Build Wind Rows", buttonX, buttonY, 16, "o")
end

local function IsMouseOverButton(x, y)

    return (x > buttonX * screenX and x < (buttonX + buttonWidth) * screenX) and
               (y > buttonY * screenY and y < (buttonY + buttonHeight) * screenY)
end

function widget:MousePress(x, y, button)
    if button == 1 then -- Left mouse button
        if IsMouseOverButton(x, y) then
            isAreaSelectionActive = not isAreaSelectionActive
            return true
        elseif isAreaSelectionActive then
            local _, pos = Spring.TraceScreenRay(x, y, true)
            if pos then
                startX, startZ = pos[1], pos[3]
                return true
            end
        end
    end
    return false
end

function widget:MouseRelease(x, y, button)
    if button == 1 and isAreaSelectionActive and startX and startZ then
        local _, pos = Spring.TraceScreenRay(x, y, true)
        if pos then
            endX, endZ = pos[1], pos[3]
            QueueWindTurbines()
            isAreaSelectionActive = false
            return true
        end
    end
    return false
end

function widget:DrawScreen()
    DrawButton()
    if isAreaSelectionActive and startX and startZ then
        local _, pos = Spring.TraceScreenRay(Spring.GetMouseState())
        if pos then
            gl.Color(1, 1, 1, 0.3)
            gl.Rect(startX, startZ, pos[1], pos[3])
            gl.Color(1, 1, 1, 1)
        end
    end
end

function QueueWindTurbines()
    local selectedUnits = Spring.GetSelectedUnits()
    if not selectedUnits or #selectedUnits == 0 then
        return
    end

    local dx = endX - startX
    local dz = endZ - startZ
    local length = math.sqrt(dx * dx + dz * dz)
    local stepX = dx / length * 96 -- 96 is the typical size of a wind turbine
    local stepZ = dz / length * 96
    local numSteps = math.floor(length / 96)

    for i = 0, numSteps do
        local offsetX = i * stepX
        local offsetZ = i * stepZ
        local posX1 = startX + offsetX
        local posZ1 = startZ + offsetZ
        local posX2 = startX + offsetX + gapBetweenRows
        local posZ2 = startZ + offsetZ + gapBetweenRows

        for _, unitID in ipairs(selectedUnits) do
            Spring.GiveOrderToUnit(unitID, -windTurbineDefID, {posX1, Spring.GetGroundHeight(posX1, posZ1), posZ1},
                {"shift"})
            Spring.GiveOrderToUnit(unitID, -windTurbineDefID, {posX2, Spring.GetGroundHeight(posX2, posZ2), posZ2},
                {"shift"})
        end
    end
end

function widget:Shutdown()
    gl.Color(1, 1, 1, 1) -- Reset color on shutdown
end
