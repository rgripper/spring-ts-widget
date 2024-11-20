--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        local value = nil
        if (select("#", ...) > 0) then value = module(...) else value = module(file) end
        ____moduleCache[file] = { value = value }
        return value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["src.index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local DrawButton, IsMouseOverButton, QueueWindTurbines, screenX, screenY, buttonX, buttonY, buttonWidth, buttonHeight, isAreaSelectionActive, startX, startZ, endX, endZ, windTurbineDefID, gapBetweenRows
function DrawButton(self)
    local buttonColor = {0.5, 0.5, 0.5, 0.7}
    if isAreaSelectionActive then
        buttonColor = {0.7, 0.7, 0.7, 0.7}
    end
    gl.Color(unpack(buttonColor))
    gl.Rect(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight)
    gl.Color(1, 1, 1, 1)
    gl.Text(
        "Build Wind Rows",
        buttonX,
        buttonY,
        16,
        "o"
    )
end
function IsMouseOverButton(self, x, y)
    return x > buttonX * screenX and x < (buttonX + buttonWidth) * screenX and y > buttonY * screenY and y < (buttonY + buttonHeight) * screenY
end
function QueueWindTurbines(self)
    local selectedUnits = Spring.GetSelectedUnits()
    if not selectedUnits or #selectedUnits == 0 then
        return
    end
    local dx = endX - startX
    local dz = endZ - startZ
    local length = math.sqrt(dx * dx + dz * dz)
    local stepX = dx / length * 96
    local stepZ = dz / length * 96
    local numSteps = math.floor(length / 96)
    do
        local i = 0
        while i <= numSteps do
            local offsetX = i * stepX
            local offsetZ = i * stepZ
            local posX1 = startX + offsetX
            local posZ1 = startZ + offsetZ
            local posX2 = startX + offsetX + gapBetweenRows
            local posZ2 = startZ + offsetZ + gapBetweenRows
            for ____, unitID in ipairs(selectedUnits) do
                Spring.GiveOrderToUnit(
                    unitID,
                    -windTurbineDefID,
                    {
                        posX1,
                        Spring.GetGroundHeight(posX1, posZ1),
                        posZ1
                    },
                    {"shift"}
                )
                Spring.GiveOrderToUnit(
                    unitID,
                    -windTurbineDefID,
                    {
                        posX2,
                        Spring.GetGroundHeight(posX2, posZ2),
                        posZ2
                    },
                    {"shift"}
                )
            end
            i = i + 1
        end
    end
end
widget.GetInfo = function(self)
    return {
        name = "WindTurbineRowBuilder 2",
        desc = "Creates double rows of wind turbines in a defined area",
        author = "ChatGPT",
        date = "2024-08-31",
        license = "MIT",
        layer = 0,
        enabled = true
    }
end
widget.MousePress = function(self, x, y, button)
    if button == 1 then
        if IsMouseOverButton(nil, x, y) then
            isAreaSelectionActive = not isAreaSelectionActive
            return true
        elseif isAreaSelectionActive then
            local _, pos = Spring.TraceScreenRay(x, y, true)
            if pos then
                startX = pos[1]
                startZ = pos[3]
                return true
            end
        end
    end
    return false
end
widget.MouseRelease = function(self, x, y, button)
    if button == 1 and isAreaSelectionActive and startX ~= nil and startZ ~= nil then
        local _, pos = Spring.TraceScreenRay(x, y, true)
        if pos then
            endX = pos[1]
            endZ = pos[3]
            QueueWindTurbines(nil)
            isAreaSelectionActive = false
            return true
        end
    end
    return false
end
widget.DrawScreen = function(self)
    DrawButton(nil)
    if isAreaSelectionActive and startX ~= nil and startZ ~= nil then
        local x, y, checkUnits = Spring.GetMouseState()
        local _, pos = Spring.TraceScreenRay(x, y, checkUnits)
        if pos then
            gl.Color(1, 1, 1, 0.3)
            gl.Rect(startX, startZ, pos[1], pos[3])
            gl.Color(1, 1, 1, 1)
        end
    end
end
widget.Shutdown = function(self)
    gl.Color(1, 1, 1, 1)
end
screenX, screenY = Spring.GetViewGeometry()
buttonX = screenX * 0.4
buttonY = screenY * 0.1
buttonWidth = 100
buttonHeight = 50
isAreaSelectionActive = false
windTurbineDefID = UnitDefNames.armwin.id
gapBetweenRows = 16
 end,
}
return require("src.index", ...)
