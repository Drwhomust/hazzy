--[[ hazzy main script
        written by: Drwhomust
            The silly lizard :3
                (they won't infect ya)
]]

print("Loading........")

-- loads libaries
-- dev note. dispite me maining coding in snake-case. these libraires keep using camleCase and other stuff
-- please fix this
local SM = require("libs/scene-stuff/SceneMgr/lib/SceneMgr")


-- loads assets into game
function love.load()
    SM.setPath("scenes/") -- scene path. needed when loading maps
end

function love.draw()
    love.graphics.print("hi hi",50,59)
end

print("Finished loading!")