-- used for battle system
-- ! note, please try to keep everything is this script local

function love.load()
    battle = false
    battleid = 1

    local soul = {}
    local soul.x = 400
    local soul.y = 300

    local sectle = 1

    local barhit = 1
    
    local boxtext = {}
    local boxtext.width = 500
    local boxtext.height = 400

    local eme = "String"
end

function love.update(dt)
    