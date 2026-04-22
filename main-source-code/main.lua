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
local SM = require("libs/scene-stuff/StackingSceneMgr/lib/StackingSceneMgr") -- scene manger. refer to it's docs for more info
local SSM = SM.newManager()
local fire = require("libs/hump/signal") -- this is for the singal libray from hump. it's called fire because it acts like the fire events from roblox.

-- loads assets into game
function love.load()
    SSM.setPath("scenes/") -- scene path. needed when loading maps
    SSM.add("start") -- the starting scene
end

function love.update(dt)
    SSM.update(dt)
end

function love.draw()
    SSM.draw()
end

print("Finished loading!")