--[[ hazzy main script
        written by: Drwhomust
            The silly lizard :3
                (they won't infect ya)
                    ... Probray

READ DOCS AND COMMENTS BEFORE GOING CRAZY WITH EDITS!!!
]]

print("Loading........")

-- loads libaries
-- dev note. dispite me maining coding in snake-case. these libraires keep using camleCase and other stuff
-- please fix this
local SM = require("libs/scene-stuff/SceneMgr/lib/SceneMgr") -- scene manger. refer to it's docs for more info
local fire = require("libs/hump/signal") -- this is for the singal libray from hump. it's called fire because it acts like the fire events from roblox.

-- loads assets into game
function love.load()
    SM.setPath("scenes/") -- scene path. needed when loading maps
    SM.add("start") -- the starting scene
end

function love.update(dt)

end

function love.draw()
    
end

print("Finished loading!")